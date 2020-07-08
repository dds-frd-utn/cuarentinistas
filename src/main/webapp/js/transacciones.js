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
	<form class="container" name="transaccion" id="transaccion">
                <div class="field">
                <label class="label" for="cbu_salida">Cuenta Propia</label>
		<div class="control">
                <div class="select is-primary">
                <select name="cbu_salida" id="cuenta">
			`+opciones+`
		</select></div></div></div>
                <div class="field">
                <label class="label" for="cbu_destino">Cuenta Destino</label>
		<div class="control"><input class="input" type="number" name="cbu_destino" id="cbu_destino"></input></div>
                </div>
            <div class="field">
            <label class="label" for="descripcion">Descripcion</label>
		<div class="control"><input class="input" type="text" name="descripcion" id="descripcion" value="Lorem ipsum"></input></div>
                </div>
            <div class="field">
            <label class="label" for="importe">Importe</label>
		<div class="control"><input class="input" type="number" name="importe" id="importe"></input></div>
		</div>
            <div class="control"><input class="button is-primary" type="submit" value="Enviar"></input></div>
	</form>
	`;

	$('#columna-derecha').append(form);
        const transactionForm = document.forms['transaccion'];
        transactionForm.addEventListener('submit',function(e){
            e.preventDefault();
            cbuSalida = transactionForm.querySelector('select[name="cbu_salida"]').value;
            cbuDestino = transactionForm.querySelector('input[name="cbu_destino"]').value;
            descripcion = transactionForm.querySelector('input[name="descripcion"]').value;
            importe = transactionForm.querySelector('input[name="importe"]').value;
            formValues = {cbuSalida,cbuDestino,descripcion,importe};
            json = JSON.stringify(formValues);
            console.log(json);
        });
    
};
