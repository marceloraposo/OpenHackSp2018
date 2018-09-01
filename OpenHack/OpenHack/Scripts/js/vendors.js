'use strict';


$(document).ready(function () {
    /*------------------------------------------------
        Ripple effect buttons (Waves)
    -------------------------------------------------*/
    if($('.btn')[0]) {
        Waves.init();
        Waves.attach('.btn');
    }


    /*------------------------------------------------
        Data Table (DataTables)
    ------------------------------------------------*/
    if($('table.data-table')[0]) {

        // Add custom buttons
        var dataTableButtons =  '<div class="dataTables_buttons hidden-sm-down actions">' +
                                    '<span class="actions__item zmdi zmdi-print" data-table-action="print" data-toggle="tooltip" data-animation="false" data-placement="top" data-original-title="Imprimir" />' +
                                    '<span class="actions__item zmdi zmdi-fullscreen" data-table-action="fullscreen" data-toggle="tooltip" data-animation="false" data-placement="top" data-original-title="Tela cheia" />' +
                                    '<div class="dropdown actions__item" data-toggle="tooltip" data-animation="false" data-placement="top" data-original-title="Download">' +
                                        '<i data-toggle="dropdown" class="zmdi zmdi-download" />' +
                                        '<ul class="dropdown-menu dropdown-menu-right">' +
                                            '<a href="" class="dropdown-item" data-table-action="excel">Excel (.xlsx)</a>' +
                                            '<a href="" class="dropdown-item" data-table-action="csv">CSV (.csv)</a>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>';

        // Initiate data-table
        $('table.data-table').DataTable({
            columnDefs: [ 
                {
                    className: 'select-checkbox',
                    targets:   0
                },
                {
                    orderable: false,
                    targets:   'no-order'
                },
                {
                    targets:  'bt-action',
                    width: '191px'
                }
            ],            
            select:{
                style: 'multi',
                selector: 'td:not(:last-child)'
            },
            order: [[ 1, 'asc' ]],
            autoWidth: false,
            responsive: true,
            lengthMenu: [[15, 30, 45, -1], ['15 Linhas', '30 Linhas', '45 Linhas', 'Tudo']],
            language: {
                searchPlaceholder: "Faça sua pesquisa...",
                sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
                sInfoFiltered: "(Filtrados de _MAX_ registros)",
                sInfoPostFix: "",
                sInfoThousands: ".",
                sLengthMenu: "_MENU_ resultados por página",
                sLoadingRecords: "Carregando...",
                sProcessing: "Processando...",
                sZeroRecords: "Nenhum registro encontrado",
                sSearch: "Pesquisar",
                select: {
                    rows: {
                        _: " | Você selecionou %d linhas",
                        0: " | Clique em uma linha para selecioná-la",
                        1: " | Somente 1 linha selecionada"
                    }
                }
            },
            dom: 'Blfrtip',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Exportar Dados'
                },
                {
                    extend: 'csvHtml5',
                    title: 'Exportar Dados'
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Exportar Dados'
                },
                {
                    extend: 'print',
                    title: 'SIBEN'
                }
            ],
            "initComplete": function(settings, json) {
                $(this).closest('.dataTables_wrapper').prepend(dataTableButtons);
            }
        });

        $(".selectAll").click(function(e) {     
            if($(this).is(':checked'))       
                $('.odd, .even').addClass('selected'); 
 
            else       
                $('.odd, .even').removeClass('selected');   
        });

        // Add line when search is active
        $('.dataTables_filter input[type=search]').focus(function () {
            $(this).closest('.dataTables_filter').addClass('dataTables_filter--toggled');
        });

        $('.dataTables_filter input[type=search]').blur(function () {
            $(this).closest('.dataTables_filter').removeClass('dataTables_filter--toggled');
        });


        // Data table buttons
        $('body').on('click', '[data-table-action]', function (e) {
            e.preventDefault();

            var exportFormat = $(this).data('table-action');

            if(exportFormat === 'excel') {
                $(this).closest('.dataTables_wrapper').find('.buttons-excel').trigger('click');
            }
            if(exportFormat === 'csv') {
                $(this).closest('.dataTables_wrapper').find('.buttons-csv').trigger('click');
            }
            if(exportFormat === 'print') {
                $(this).closest('.dataTables_wrapper').find('.buttons-print').trigger('click');
            }
            if(exportFormat === 'fullscreen') {
                var parentCard = $(this).closest('.card');

                if(parentCard.hasClass('card--fullscreen')) {
                    parentCard.removeClass('card--fullscreen');
                    $('body').removeClass('data-table-toggled');
                }
                else {
                    parentCard.addClass('card--fullscreen')
                    $('body').addClass('data-table-toggled');
                }
            }
        });
    }

     /*------------------------------------------------
        Data Table Modal (DataTables)
    ------------------------------------------------*/
    if($('table.data-table-modal')[0]) {

        // Add custom buttons
        var dataTableButtons =  '<div class="dataTables_buttons hidden-sm-down actions">' +
                                    '<span class="actions__item zmdi zmdi-print" data-table-action="print" data-toggle="tooltip" data-animation="false" data-placement="top" data-original-title="Imprimir" />' +
                                    '<div class="dropdown actions__item" data-toggle="tooltip" data-animation="false" data-placement="top" data-original-title="Download">' +
                                        '<i data-toggle="dropdown" class="zmdi zmdi-download" />' +
                                        '<ul class="dropdown-menu dropdown-menu-right">' +
                                            '<a href="" class="dropdown-item" data-table-action="excel">Excel (.xlsx)</a>' +
                                            '<a href="" class="dropdown-item" data-table-action="csv">CSV (.csv)</a>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>';

        // Initiate data-table
        $('table.data-table-modal').DataTable({
            columnDefs: [ 
                {
                    className: 'select-checkbox',
                    targets:   0
                },
                {
                    orderable: false,
                    targets:   'no-order'
                },
                {
                    targets:  'bt-action',
                    width: '191px'
                }
            ],            
            select:{
                style: 'multi',
                selector: 'td:not(:last-child)'
            },
            order: [[ 1, 'asc' ]],
            autoWidth: false,
            responsive: true,
            lengthMenu: [[15, 30, 45, -1], ['15 Linhas', '30 Linhas', '45 Linhas', 'Tudo']],
            language: {
                searchPlaceholder: "Faça sua pesquisa...",
                sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
                sInfoFiltered: "(Filtrados de _MAX_ registros)",
                sInfoPostFix: "",
                sInfoThousands: ".",
                sLengthMenu: "_MENU_ resultados por página",
                sLoadingRecords: "Carregando...",
                sProcessing: "Processando...",
                sZeroRecords: "Nenhum registro encontrado",
                sSearch: "Pesquisar",
                select: {
                    rows: {
                        _: " | Você selecionou %d linhas",
                        0: " | Clique em uma linha para selecioná-la",
                        1: " | Somente 1 linha selecionada"
                    }
                }
            },
            dom: 'Blfrtip',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Exportar Dados'
                },
                {
                    extend: 'csvHtml5',
                    title: 'Exportar Dados'
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Exportar Dados'
                },
                {
                    extend: 'print',
                    title: 'SIBEN'
                }
            ],
            "initComplete": function(settings, json) {
                $(this).closest('.dataTables_wrapper').prepend(dataTableButtons);
            }
        });

        $(".selectAllModal").click(function(e) {     
            if($(this).is(':checked'))       
                $('.odd, .even').addClass('selected'); 
 
            else       
                $('.odd, .even').removeClass('selected');   
        });

        // Add line when search is active
        $('.dataTables_filter input[type=search]').focus(function () {
            $(this).closest('.dataTables_filter').addClass('dataTables_filter--toggled');
        });

        $('.dataTables_filter input[type=search]').blur(function () {
            $(this).closest('.dataTables_filter').removeClass('dataTables_filter--toggled');
        });


        // Data table buttons
        $('body').on('click', '[data-table-action]', function (e) {
            e.preventDefault();

            var exportFormat = $(this).data('table-action');

            if(exportFormat === 'excel') {
                $(this).closest('.dataTables_wrapper').find('.buttons-excel').trigger('click');
            }
            if(exportFormat === 'csv') {
                $(this).closest('.dataTables_wrapper').find('.buttons-csv').trigger('click');
            }
            if(exportFormat === 'print') {
                $(this).closest('.dataTables_wrapper').find('.buttons-print').trigger('click');
            }
            
        });
    }

    /*------------------------------------------------
        Tooltip (Bootstrap)
    -------------------------------------------------*/
    if($('[data-toggle="tooltip"]')[0]) {
        $('[data-toggle="tooltip"]').tooltip();
    }


    /*----------------------------------------------------------
        Custom Scrollbars (jQuery.scrollbar and ScrollLock)
    -----------------------------------------------------------*/
    if($('.scrollbar-inner')[0]) {
        $('.scrollbar-inner').scrollbar().scrollLock();
    }
});