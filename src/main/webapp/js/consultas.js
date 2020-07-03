function consultarSaldo(cbu) {
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
		console.log("salida done "+salida);
	});

	$.ajax({
		url: '/cuarentinistas/rest/movimientos/cbuDestino/'+cbu,
		async: false
	}).done(function(entradas) {
		$.each(entradas, function(i, movimiento) {
			entrada = entrada + movimiento["importe"];
		});
		console.log("entrada done "+entrada);
	});

	console.log("entrada afuera "+entrada);
	console.log("salida afuera "+salida);

	balance = (entrada - salida);
	console.log("balance "+balance);

	return balance;
};
