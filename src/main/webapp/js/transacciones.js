function  realizarTransferencia() {
    // $('#container-header').text('');
	// $('#container-header').append('<h2 class="title" style="margin-bottom: 1rem;">Transferencia</h2>');
	opciones = '';

	$.ajax({
		 url: '/cuarentinistas/rest/cuentas/cliente/'+clienteid,
		 async: false
	 }).done(function (cuentas) {
		 $.each(cuentas, function(i, cuenta) {
			 opciones = opciones+'<option value="'+cuenta['cbu']+'">'+cuenta['alias']+' ('+cuenta['cbu']+')</option>';
		 });
	 });

	$('#columna-derecha').text('');
	const form = `
	<form name ="transaccion" id="transaccion">
		<select name="cbu_salida" id="cuenta">
			`+opciones+`
		</select>
		<input type="number" name="cbu_destino" id="cbu_destino"></input>
		<input type="text" name="descripcion" id="descripcion"></input>
		<input type="number" name="importe" id="importe"></input>
		<input type="submit" value="Enviar"></input>
	</form>
	`;

	$('#columna-derecha').append(form);
};

// const pepito = document.forms['transaccion'];

// pepito.addEventListener('submit',function(e){
//   e.preventDefault();
//   const descripcion = pepito.querySelector('input[name="cbu_salida"]').value;
//   const cbu_destino = pepito.querySelector('input[name="cbu_destino"]').value;
//   const descripcion = pepito.querySelector('input[name="descripcion"]').value;
//   const importe = pepito.querySelector('input[name="importe"]').value;
//
//   console.log(descripcion, cbu_destino, descripcion, importe);
//
//   // document.getElementById("user").value
// });
