function consultarBalance(cbu) {
	var balance = 0;
	var entrada = 0;
	var salida = 0;
	// var cbu = 1;

	$.ajax({
		url: '/cuarentinistas/rest/movimientos/cbuSalida/'+cbu,
		async: false
	}).done(function(salidas) {
		$.each(salidas, function(i, movimiento) {
			salida = salida + movimiento["importe"];
		});
		// console.log("salida done "+salida);
	});

	$.ajax({
		url: '/cuarentinistas/rest/movimientos/cbuDestino/'+cbu,
		async: false
	}).done(function(entradas) {
		$.each(entradas, function(i, movimiento) {
			entrada = entrada + movimiento["importe"];
		});
		// console.log("entrada done "+entrada);
	});

	// console.log("entrada afuera "+entrada);
	// console.log("salida afuera "+salida);

	balance = (entrada - salida);
	// console.log("balance "+balance);
	return balance;
};

function verMovimientos(cbu) {

	function printDate(fecha) {
		var date = new Date(fecha);
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();


		if (month < 10) {

			if (day < 10) {
				return "0"+day+"-0"+month+"-"+year;
			} else {
				return day+"-0"+month+"-"+year;
			}

		} else {

			if (day < 10) {
				return "0"+day+"-"+month+"-"+year;
			} else {
				return day+"-"+month+"-"+year;
			}

		};
	};

	// Funcion para ordenar por fecha ascendente
	function byDate(a, b) {
		// Obtengo las fechas parseadas anteriormente para convertirlas
		// a formato YYYYMMDD y asi poder compararlas
		var fechaA = dateFrom(a.fecha);
		var fechaB = dateFrom(b.fecha);

		// console.log(fechaA);
		// console.log(fechaB);
		// console.log("comparison a<b", fechaA < fechaB);

		// No se por que esto funciona, pero (fechaA < fechaB) no
		// no deberia ser lo mismo?
		return -(fechaA > fechaB);

		function dateFrom(input) {
			input = new Date(input);
			year = input.getFullYear();
			if (input.getMonth() < 10) {
				month = '0'+(input.getMonth()+1);
			} else {
				month = (input.getMonth()+1);
			};
			if (input.getDate() < 10) {
				date = '0'+input.getDate();
			} else {
				date = input.getDate();
			};
			return year+month+date;
		};
	};

	var movimientos;
	var alias;

	$.ajax({
		url: '/cuarentinistas/rest/movimientos/cbuSalida/'+cbu,
		async: false
	}).done(function(salidas) {
		movimientos = salidas;
		console.log("salidas",salidas);
	});

	$.ajax({
		url: '/cuarentinistas/rest/movimientos/cbuDestino/'+cbu,
		async: false
	}).done(function(entradas) {
		movimientos = movimientos.concat(entradas);
		console.log("entradas",entradas);
	});

	// console.log("movimientos",movimientos);

	// Formateo fecha para poder trabajarla (problema de la base de datos)
	$.each(movimientos, function(i, item) {
		movimientos[i]['fecha'] = movimientos[i]['fecha'].substring(0, 20);
	});

	// Ordeno movimientos por fecha (mas reciente primero)
	console.log("antes",movimientos);
	movimientos = movimientos.sort(byDate);
	console.log("despues",movimientos);
	// console.log("sorting done!", movimientos);

	$.ajax({
		url: '/cuarentinistas/rest/cuentas/'+cbu,
		async: false
	}).done(function(cuenta) {
		alias = cuenta['alias'];
	});

	$('#container-header').text('');
	$('#container-header').append('<h2 class="title" style="margin-bottom: 1.7rem;">Ultimos movimientos</h2>');
	$('#container-header').append('<h3 class="subtitle" style="margin-bottom: 0;">Alias: '+alias+'</h3>');
	$('#container-header').append('<h3 class="subtitle" style="margin-bottom: 1rem;">CBU: '+cbu+'</h3>');

	// Preparo los headers de la tabla
	$('#data-headers').text('');
	$('#data-headers').append("<th>Fecha</th>");
	$('#data-headers').append("<th>CBU Origen</th>");
	$('#data-headers').append("<th>CBU Destino</th>");
	$('#data-headers').append("<th>Descripcion</th>");
	$('#data-headers').append("<th>Importe</th>");

	// Preparo el cuerpo de la tabla
	$('#data-rest').text('');

	// Imprimo los movimientos
	$.each(movimientos, function(i, movimiento) {
		// Determino si el movimiento es de salida o entrada
		// y seteo parametros para la impresion
		if (movimiento['cbuSalida'] == cbu) {
			var color = "#ffe5e5";
			var importe = "-"+movimiento['importe'];
		} else {
			var color = "#e5ffe7"
			var importe = movimiento['importe'];
		};

		$("#data-rest").append('<tr id="item'+i+'" style="background-color: '+color+';"></tr>');

		$("#item"+i).append("<td>"+printDate(movimiento['fecha'])+"</td>");
		$("#item"+i).append("<td>"+movimiento['cbuSalida']+"</td>");
		$("#item"+i).append("<td>"+movimiento['cbuDestino']+"</td>");
		$("#item"+i).append("<td>"+movimiento['descripcion']+"</td>");
		$("#item"+i).append("<td>"+importe+"</td>");
	});
};
