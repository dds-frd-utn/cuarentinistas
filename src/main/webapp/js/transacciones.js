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

	$('#container-header').text('');
 	$('#container-header').append('<p class="title is-4">Realizar transacción</p>');
 	$('#container-header').append('<p class="subtitle is-6 mb-2">Seleccione una de sus cuentas a continuacion e ingrese el destino y el importe.</p>');
	// $('#data-headers').text('');
	// $('#data-rest').text('');
	$('#tabla').hide();
	// $('#columna-derecha').text('');
	const form = `
	<form class="container" name="transaccion" id="transaccion">
                <div class="field">
                <label class="label" for="cbuSalida">Cuenta Propia</label>
		<div class="control">
                <div class="select is-primary">
                <select name="cbuSalida" id="cuenta" required>
			`+opciones+`
		</select></div></div></div>
                <div class="field">
                <label class="label" for="cbuDestino">CBU Destino</label>
		<div class="control"><input class="input" type="number" name="cbuDestino" id="cbuDestino" placeholder="400720010" required></input></div>
                </div>
            <div class="field">
            <label class="label" for="descripcion">Descripcion</label>
		<div class="control"><input class="input" type="text" name="descripcion" id="descripcion" placeholder="Transaccion super exitosa"></input></div>
                </div>
            <div class="field">
            <label class="label" for="importe">Importe</label>
		<div class="control"><input class="input" type="number" name="importe" id="importe"></input></div>
		</div>

		<div class="level mt-4 pt-1">
			<div class="control mr-4" style="width: 25%;">
				<input class="button is-primary is-size-4 is-fullwidth" type="submit" value="Enviar">
			</div>
			<div id="mensaje" style="width: 75%;">
			</div>
		</div>
	</form>
	`;
	$('#transaction-container').show();
	$('#transaction-container').html(form);
    const transactionForm = document.forms['transaccion'];
	var jsonMovimiento;
    transactionForm.addEventListener('submit',function(e){
        e.preventDefault();
        cbuSalida = transactionForm.querySelector('select[name="cbuSalida"]').value;
        cbuDestino = transactionForm.querySelector('input[name="cbuDestino"]').value;
        descripcion = transactionForm.querySelector('input[name="descripcion"]').value;
        importe = transactionForm.querySelector('input[name="importe"]').value;
		fecha = new Date();
		// A la base de datos del ort* no le gusta que no le manden un // IDEA:
		// y si le mandas uno se lo pasa por el cul*
		// asi que le mandamos este id para que nos acepte el request :)
		id = 1;
        formValues = {cbuSalida,cbuDestino,descripcion,importe,fecha,id};
        jsonMovimiento = JSON.stringify(formValues);
        console.log("LOGGING", jsonMovimiento);


		$.ajax({
			url: '/cuarentinistas/rest/movimientos',
			method: 'POST',
			data: jsonMovimiento,
			contentType: 'application/json',
			dataType: 'text/html',
			// async: false,
			success: function (data, status, XHRresponse) {
				// console.log(data);
				// console.log(status);
				// console.log(XHRresponse);
				const mensaje = `
				<article class="message is-success is-fullwidth">
				  <div class="message-body">
				    La transacción fue exitosa.
				  </div>
				</article>
				`;
				$('#mensaje').html(mensaje);
				// alert("Hey, success. ", status);
			},
			error: function (data, status, XHRresponse) {
				console.log(data);
				console.log(status);
				console.log(XHRresponse);
				const mensaje = `
				<article class="message is-danger is-fullwidth">
					<div class="message-body">
						Hubo un problema procesando la transaccion (Error `+data.status+`: `+data.statusText+`)
					</div>
				</article>
				`;
				$('#mensaje').html(mensaje);
				// alert("Hey, error. ", status);
			},
			// complete: function (data, status, XHRresponse) {
			// 	console.log(data);
			// 	console.log(status);
			// 	console.log(XHRresponse);
			// 	alert("Hey, complete. ", status);1
			// },
		});
    });


};
