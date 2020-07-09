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

// Recibe un elemento que tenga una propiedad 'fecha'
// Entrega el mismo elemento con la fecha formateada
// En caso de ya estar formateado, lo devuelve intacto
function formatElementDate(element) {
	element['fecha'] = formatDate(element['fecha']);
	return element;
};

// Recibe una fecha como string, si no tiene el formato correcto lo corrige
// de otra manera no hace nada
function formatDate(fecha) {
	// Safeguard por si intentan formatear un fecha ya formateada
	if ((fecha.charAt(fecha.length-1)) != ']') {
		return fecha;
	} else {
		return fecha.substring(0, 20);
	}
}

// Aplica formatElementDate sobre todo un array automáticamente
// Recibe un array y devuelve el mismo array convertido
// Asegurate que los elementos del array tengan una propiedad 'fecha'!
function formatDateArray(array) {
	$.each(array, function(i, item) {
		item = formatElementDate(item);
	});

	return array;
};

// Funcion que recibe la fecha de un objeto
// Devuelve string con la fecha en formato DD-MM-YYYY
function printDate(fecha) {
	fecha = formatDate(fecha);
	var date = new Date(fecha);
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	// Retorno de fecha formateada agregando ceros segun sea necesario
	if (month < 10) {
		// Mes necesita agregar 0 a la izquierda
		if (day < 10) {
			// Dia necesita un 0 a la izquierda
			return "0"+day+"-0"+month+"-"+year;
		} else {
			// Dia no necesita agregar nada
			return day+"-0"+month+"-"+year;
		}
	} else {
		// Mes NO necesita agregar nada
		if (day < 10) {
			// Dia necesita un 0 a la izquierda
			return "0"+day+"-"+month+"-"+year;
		} else {
			// Dia no necesita agregar nada
			return day+"-"+month+"-"+year;
		}
	};
};

// Recibe un array de elementos que posean una propiedad 'fecha'
// y lo devuelve ordenado con los mas recientes primero
function sortByDate(array) {

	// Formateo la fecha de cada elemento para poder trabajarla
	// (problema de la base de datos)
	array = formatDateArray(array);

	// Ordeno movimientos por fecha (mas reciente primero)
	return array = array.sort(byDate);

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
		return -(fechaA >= fechaB);

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
}

function verMovimientos(cbu) {
	var movimientos;
	var alias;

	// Busco los movimientos de salida de la cuenta
	$.ajax({
		url: '/cuarentinistas/rest/movimientos/cbuSalida/'+cbu,
		async: false
	}).done(function(salidas) {
		movimientos = salidas;
		// console.log("salidas",salidas);
	});

	// Agrego los movimientos de entrada
	// para asi tener todos los movimientos de la cuenta
	$.ajax({
		url: '/cuarentinistas/rest/movimientos/cbuDestino/'+cbu,
		async: false
	}).done(function(entradas) {
		movimientos = movimientos.concat(entradas);
		// console.log("entradas",entradas);
	});

	// console.log("movimientos b4 sorting",movimientos);
	movimientos = sortByDate(movimientos);
	// console.log("sorting done!", movimientos);

	// Busco el alias de la cuenta
	$.ajax({
		url: '/cuarentinistas/rest/cuentas/'+cbu,
		async: false
	}).done(function(cuenta) {
		alias = cuenta['alias'];
	});

	// Encabezado de seccion Ultimos movimientos
	$('#container-header').text('');
	$('#container-header').append('<div class="level mb-0"><div class="level-left"><p class="title is-4">Ultimos Movimientos</p></div><div class="level-right"><button onclick="mostrarCuentas();" class="button is-small"><span class="icon is-small"><i class="fa fa-long-arrow-left"></i></span></button></div></div>');
	$('#container-header').append('<p class="subtitle header-info my-2">Alias: '+alias+'</p>');
	$('#container-header').append('<p class="subtitle header-info">CBU: '+cbu+'</p>');


	// Preparo los contenedores
	$('#transaction-container').hide();
	$('#tabla').show();

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
			var vclass = "is-red";
			var importe = "-"+movimiento['importe'];
		} else {
			var vclass = "is-green";
			var importe = movimiento['importe'];
		};

		$("#data-rest").append('<tr id="item'+i+'" class="'+vclass+'"></tr>');

		$("#item"+i).append("<td>"+printDate(movimiento['fecha'])+"</td>");
		$("#item"+i).append("<td>"+movimiento['cbuSalida']+"</td>");
		$("#item"+i).append("<td>"+movimiento['cbuDestino']+"</td>");
		$("#item"+i).append("<td>"+movimiento['descripcion']+"</td>");
		$("#item"+i).append("<td>"+importe+"</td>");
	});
};
