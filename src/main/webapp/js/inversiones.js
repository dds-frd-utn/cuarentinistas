function realizarInversion() {
    $('#container-header').text('');
    $('#container-header').append('<p class="title is-4">Realizar inversion</p>');
    $('#container-header').append('<p class="subtitle is-6 mb-2">Seleccione la cantidad de un bono que desee comprar y la cuenta con la cual realizar la operacion.</p>');
    
    $('#data-headers').text('');
    $('#data-headers').append("<th>Bono</th>");
    $('#data-headers').append("<th>Precio Pago</th>");
    $('#data-headers').append("<th>Precio Cobro</th>");
    $('#data-headers').append("<th>Vencimiento</th>");

    $('#data-rest').text('');

    $.ajax({
		url: '/cuarentinistas/rest/bonos',
		async: false
	}).done(function (bonos) {
		$.each(bonos, function(i, bono) {
            $('#data-rest').append('<tr id="item_'+i+'"></tr>');
            $('#item_'+i).append("<td>"+bono['nombre']+"</td>");
            $('#item_'+i).append("<td>"+bono['precioPago']+"</td>");
            $('#item_'+i).append("<td>"+bono['precioCobro']+"</td>");
            $('#item_'+i).append("<td>"+printDate(bono['vencimiento'])+"</td>");
		});
    });

    
}