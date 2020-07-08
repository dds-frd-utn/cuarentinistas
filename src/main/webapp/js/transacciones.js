$('#transferencia').on('click', function() {
    $('#container-header').text('');
	$('#container-header').append('<h2 class="title" style="margin-bottom: 1rem;">Transferencia</h2>');

	$('#data-headers').text('');
    $('#data-headers').append("<th>CBU Salida</th>");
	$('#data-headers').append("<th>CBU Destino</th>");
	$('#data-headers').append("<th>Importe</th>");
    $('#data-headers').append("<th>Descripcion</th>");
})