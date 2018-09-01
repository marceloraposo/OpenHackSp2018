//adicionar novo
function NovoCluster() {
    clearClusterTextBox();

    exibirFull(false);

    $('#modalCluster').modal('show');
}

//carregar lista
function loadDataCluster() {
    // const _host = process.env.BACKEND_HOST || "localhost";
    const _host = "40.121.10.126";
    $('#telaCluster').html("");
    $.ajax({
        url: "http://" + _host + ":3000/",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        success: function (result) {
            var htmlCorpo = '';
            var htmlTabela = '';
            $.each(result, function (key, item) {
                htmlCorpo += '<tr>';
                htmlCorpo += '<td>' + item.name + '</td>';
                htmlCorpo += '<td>' + item.endpoints.minecraft + '</td>';
                htmlCorpo += '<td>' + item.endpoints.rcon + '</td>';
                htmlCorpo += '<td>';
                htmlCorpo += '<button class="btn btn-outline-danger btn--icon waves-effect action-delete" onclick="DeleteCluster(\'' + item.name + '\')"><i class="zmdi zmdi-delete" data-toggle="tooltip" data-animation="false" data-placement="top" data-original-title="Deletar"></i></button>';
                htmlCorpo += '<button onclick="return getClusterbyID( \'' + item.name + '\',\'' + item.telemetry.cpu + '\',\'' + item.telemetry.memory + '\',\'' + item.telemetry.node + '\',\'' + item.endpoints.minecraft + '\',\'' + item.endpoints.rcon + '\')" class="btn btn-outline-info btn--icon waves-effect action-view" data-toggle="modal" data-target="#crud-cluster"><i class="zmdi zmdi-eye" data-toggle="tooltip" data-animation="false" data-placement="top" data-original-title="Detalhe"></i></button>';
                htmlCorpo += '</td>';
                htmlCorpo += '</tr>';
            });

            htmlTabela += '<table id="tbCluster" class="table table-bordered data-table">';
            htmlTabela += '<thead>';
            htmlTabela += '<tr>';
            htmlTabela += '<th>Name</th>';
            htmlTabela += '<th>minecraft</th>';
            htmlTabela += '<th>rcon</th>';
            htmlTabela += '<th class="no-order bt-action">Actions</th>';
            htmlTabela += '</tr>';
            htmlTabela += '</thead>';
            htmlTabela += '<tbody id="dadosCluster">' + htmlCorpo + '</tbody>';
            htmlTabela += '</table>';

            $('#telaCluster').html(htmlTabela);
            carregaDataTableCluster();
            clearClusterTextBox();
        },
        error: function (errormessage) {
            swal('Erro', errormessage.responseText, 'error');
        }
    });
}

//inserir
function AddCluster() {
    // const _host = process.env.BACKEND_HOST || "localhost";
    const _host = "40.121.10.126";
    var res = validateCluster();
    if (res == false) {
        return false;
    }

    var ClusterObj = {
        name: $('#Nome').val()
    };

    $.ajax({
        url: "http://" + _host + ":3000/",
        data: JSON.stringify(ClusterObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        complete: function (result) {
			swal('Success', 'Success', 'success');
			$('#modalCluster').modal('hide');
			clearClusterTextBox();
			loadDataCluster();
        },
        error: function (errormessage) {
            swal('Error', errormessage.responseText, 'error');
        }
    });
}

//pegar por id
function getClusterbyID(name, cpu, memory, node, minecraft, rcon) {

    $('#Nome').css('border-color', 'lightgrey');
    $('#Cpu').css('border-color', 'lightgrey');
    $('#Memory').css('border-color', 'lightgrey');
    $('#Node').css('border-color', 'lightgrey');

    exibirFull(true);

    if (name != null) {
        $('#Id').val(name);
        $('#Nome').val(name);
        $('#Cpu').val(cpu);
        $('#Memory').val(memory);
        $('#Minecraft').val(minecraft);
        $('#Rcon').val(rcon);
        $('#Node').val(node);

        $('#modalCluster').modal('show');
        $('#btnUpdate').hide();
        $('#btnAdd').hide();
    }
    return false;
}

//campos para exibicao
function exibirFull(exibir) {
    if (exibir) {
        $('#Nome').attr("disabled", "disabled");

        $('#Cpu').show();
        $('#Memory').show();
        $('#Minecraft').show();
        $('#Rcon').show();
        $('#Node').show();

        $('#Cpu').attr("disabled", "disabled");
        $('#Memory').attr("disabled", "disabled");
        $('#Minecraft').attr("disabled", "disabled");
        $('#Rcon').attr("disabled", "disabled");
        $('#Node').attr("disabled", "disabled");

        $('#lblCpu').show();
        $('#lblMemory').show();
        $('#lblMinecraft').show();
        $('#lblRcon').show();
        $('#lblNode').show();
    } else {
        $('#Nome').removeAttr("disabled");

        $('#Cpu').hide();
        $('#Memory').hide();
        $('#Minecraft').hide();
        $('#Rcon').hide();
        $('#Node').hide();

        $('#lblCpu').hide();
        $('#lblMemory').hide();
        $('#lblMinecraft').hide();
        $('#lblRcon').hide();
        $('#lblNode').hide();
    }
}

//remover
function DeleteCluster(name) {
    // const _host = process.env.BACKEND_HOST || "localhost";
    const _host = "40.121.10.126";
    swal({
        title: 'Confirm?',
        text: 'Confirm Delete?',
        type: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-secondary',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Nao',
        closeOnConfirm: false,
        closeOnCancel: false
    }).then((result) => {

        $.ajax({
            url: "http://" + _host + ":3000/" + name,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            complete: function (result) {
				swal('Success', 'ExcluidoComSucesso', 'success');
				$('#modalCluster').modal('dispose');
				loadDataCluster();
            },
            error: function (errormessage) {
                swal('Error', errormessage.responseText, 'error');
            }
        });
    });

}

//lmpando o form
function clearClusterTextBox() {
    $('#Id').val("");
    $('#Nome').val("");
    $('#Cpu').val("");
    $('#Memory').val("");
    $('#Node').val("");
    $('#Rcon').val("");
    $('#Minecraft').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nome').css('border-color', 'lightgrey');
    $('#Cpu').css('border-color', 'lightgrey');
    $('#Memory').css('border-color', 'lightgrey');
    $('#Node').css('border-color', 'lightgrey');
    $('#Rcon').css('border-color', 'lightgrey');
    $('#Minecraft').css('border-color', 'lightgrey');
}

//validações
function validateCluster() {

    var isValid = true;
    if ($('#Nome').val().trim() == "") {
        $('#Nome').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nome').css('border-color', 'lightgrey');
    }


    return isValid;
}

//customizar tabela
function carregaDataTableCluster() {

    $('#tbCluster').DataTable({
        dom: 'Blfrtip',
        buttons:[],
        colReorder: true,
        select: true,
        autoWidth: false,
        responsive: true
    });
}
