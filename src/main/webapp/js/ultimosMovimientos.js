var idCliente = 1;

$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:8080/cuarentinistas/rest/cuentas/clienteID/'+idCliente
    }).done(function(data){
        
    })
    $.ajax({
        url: 'http://localhost:8080/cuarentinistas/rest/movimientos'
    }).done(function(data){
        $.each(data, function(i, item) {
            $("#pantalla").append('<li>'+item['nombre']+'<button onclick="mostrar('+item['id']+')">Ver</button></li>');
        });
    });
});

function mostrar(idCliente){
    $.ajax({
        url: 'rest/cliente/'+idCliente
    }).done(function(data){
        $("#id").text(data['id']);
        $("#nombre").text(data['nombre']);
        $("#direccion").text(data['direccion']);
    });
}