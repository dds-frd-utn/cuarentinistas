function realizarInversion() {
    $('#tabla').show();
    $('#container-header').text('');
    $('#container-header').append('<p class="title is-4">Realizar inversion</p>');
    $('#container-header').append('<p class="subtitle is-6 mb-2">Seleccione un bono, la cantidad que desee comprar del mismo y la cuenta con la cual realizar la operacion.</p>');
    
    $('#data-headers').text('');
    $('#data-headers').append("<th>Bono</th>");
    $('#data-headers').append("<th>Precio Pago</th>");
    $('#data-headers').append("<th>Precio Cobro</th>");
    $('#data-headers').append("<th>Vencimiento</th>");

    $('#data-rest').text('');

    var opciones_bonos = '';
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
            opciones_bonos = opciones_bonos+'<option value='+bono["id"]+'>'+bono["nombre"]+'</option>';
		});
    });

    var opciones_cuentas = '';
    $.ajax({
        url: '/cuarentinistas/rest/cuentas/cliente/' + clienteid,
        async: false
    }).done(function (cuentas) {
        $.each(cuentas, function(i, cuenta) {
            opciones_cuentas = opciones_cuentas+'<option value='+cuenta["cbu"]+'>'+cuenta["alias"]+'</option>';
        });
    });
    const form = `
	<form class="container" name="inversion" id="inversion">
        <div class="field">
            <label class="label" for="bonoId">Bono</label>
		    <div class="control">
                <div class="select is-primary">
                    <select name="bonoId" id="bono" required>`+opciones_bonos+`</select>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label" for="inversionistaCbu">Cuenta</label>
            <div class="control">
                <div class="select is-primary">
                    <select name="inversionistaCbu" id="cuenta" required>`+opciones_cuentas+`</select>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label" for="cantidad">Cantidad</label>
            <div class="control">
                <input class="input" type="number" name="cantidad" id="cantidad" value="0"></input>
            </div>
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
    
    const transactionForm = document.forms['inversion'];
	var jsonInversion;
    transactionForm.addEventListener('submit',function(e){
        e.preventDefault();
        bonoId = transactionForm.querySelector('select[name="bonoId"]').value;
        inversionistaCbu = transactionForm.querySelector('select[name="inversionistaCbu"]').value;
        cantidad = transactionForm.querySelector('input[name="cantidad"]').value;
		fecha = new Date();
		// A la base de datos del ort* no le gusta que no le manden un // IDEA:
		// y si le mandas uno se lo pasa por el cul*
		// asi que le mandamos este id para que nos acepte el request :)
        id = 1;

        var bono;
        $.ajax({
            url: '/cuarentinistas/rest/bonos/' + bonoId,
            async: false
        }).done(function (respuesta) {
            bono = respuesta;
        });
        var cuenta;
        $.ajax({
            url: '/cuarentinistas/rest/cuentas/' + inversionistaCbu,
            async: false
        }).done(function (respuesta) {
            cuenta = respuesta;
        });

        if (cantidad == 0) {
            const mensaje = `
            <article class="message is-danger is-fullwidth">
                <div class="message-body">
                    Debe comprar al menos un bono para que la inversion sea valida.
                </div>
            </article>
            `;
            $('#mensaje').html(mensaje);
        } else if (consultarBalance(cuenta['cbu']) > (bono['precioPago']*cantidad)) {
            formValues = {id,cantidad,fecha,inversionistaCbu,bonoId};
            jsonInversion = JSON.stringify(formValues);
            console.log("LOGGING", jsonInversion);

            $.ajax({
                url: '/cuarentinistas/rest/inversiones',
                method: 'POST',
                data: jsonInversion,
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
                        La inversion se realizo de forma exitosa.
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
        } else {
            const mensaje = `
            <article class="message is-danger is-fullwidth">
                <div class="message-body">
                    No dispone del dinero suficiente en la cuenta seleccionada para realizar esta inversion.
                </div>
            </article>
            `;
            $('#mensaje').html(mensaje);
        }
    });
}