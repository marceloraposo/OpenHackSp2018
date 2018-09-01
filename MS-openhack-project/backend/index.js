const kubernetes = require('./kubernetes');
const core = kubernetes.core;
const extensions = kubernetes.extensions;
const express = require('express')
const app = express()
const bodyParser = require('body-parser');


app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
    next();
});

app.get('/', async (req, res) => {
    const { exec } = require('child_process');

    var ns = await core.namespaces.get();
    var tenantNames = ns.items.filter((item) => item.metadata.name.startsWith('mine')).map(item => item.metadata.name);
   
    let data = "";
    exec('kubectl get --raw "/apis/metrics.k8s.io/v1beta1/pods"', (error, stdout, stderr) => {
        if (error) {
            return;
        }
        data = stdout;
    });
    setTimeout(() => { 
    }, 2500);

    var tenants = await Promise.all(tenantNames.map(async name => {
        var service = await core.namespaces(name).services.get('svc-minecraft');
        var pod = await core.namespaces(name).pods.get({ qs: { labelSelector: 'app=minecraft' }});
        var ip = service.status.loadBalancer.ingress ? service.status.loadBalancer.ingress[0].ip : 'n/a';

        let memoryKb = "";
        let cpuKb = "";

        try {

            var jsonObject = JSON.parse(data);
            var items = jsonObject.items;

            for (i in items) {
                if (items[i].metadata.namespace === name) {
                    memoryKb = items[i].containers[0].usage.memory;
                    cpuKb = items[i].containers[0].usage.cpu;
                }
            }
        } catch(err) {
            console.log("error: " + err);
        }

        return {
            name: name,
            endpoints: {
                minecraft: `${ip}:25565`,
                rcon: `${ip}:25575`
            },
            telemetry: {
                memory: `${memoryKb}`,
                cpu: `${cpuKb}`,
                node: `1`
            }
        };
    }));
    res.send(JSON.stringify(tenants));
})

app.post('/', async (req, res) => {
    var name = "mine-" + req.body.name;
    // Create namespace
    var ns = await core.namespaces.post({ body: {
        metadata: {  name: name }
    } });
    // Create pvc persistentvolumeclaims
    /*var pvc = await core.namespaces(ns.metadata.name).persistentvolumeclaims.post({ body: {
        metadata: { name: 'minecraft-data', labels: { app: 'minecraft' } },
        spec: {
            accessModes: ['ReadWriteOnce'],
            resources: { requests: { storage: '5Gi' } }
        }
    }});*/
    // Create service
    var service = await core.namespaces(ns.metadata.name).services.post({ body: {
        metadata: { name: 'svc-minecraft', labels: { app: 'minecraft' } },
        spec: {
            type: 'LoadBalancer',
            ports: [
                { port: 25565, name: 'game' },
                { port: 25575, name: 'rcon' }
            ],
            selector: { app: 'minecraft' }
        }
    }});
    // Create deployment
    var deployment = await extensions.namespaces(ns.metadata.name).deployments.post({ body: {
        metadata: { name: 'minecraft', labels: { app: 'minecraft' } },
        spec: {
            replicas: 1,
            selector: { matchLabels: { app: 'minecraft' } },
            template: {
                metadata: { name: 'minecraft', labels: { app: 'minecraft' } },
                spec: {
                    //volumes: [ { name: 'data', persistentVolumeClaim: { claimName: 'minecraft-data' } } ],
                    containers: [
                        {
                            image: 'openhack/minecraft-server:2.0',
                            name: 'minecraft',
                            //volumeMounts: [ { mountPath: '/data', name: 'data' } ],
                            env: [ { name: 'EULA', value: 'TRUE' } ],
                            ports: [
                                { containerPort: 25565 },
                                { containerPort: 25575 },
                            ]
                        }
                    ]
                }
            },
            
        }
    }});
    res.status(201);
    res.send( { name: name });
})

app.delete('/:name', async (req, res) => {
    const name = req.params.name;
    
    try {
        const ns = await core.namespaces.delete(name);
    } catch(err) {
        console.log("error: " + err);

        res.status(500);
        res.send(err);
    }
    res.status(200);
    res.send();
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
