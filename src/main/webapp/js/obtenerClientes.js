window.onload=function(){
    var clientes = document.getElementById("clientes");
    clientes.addEventListener("click", buscarDatos);  
};

function buscarDatos(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"http://localhost:8080/cuarentinistas/rest/clientes",true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            var resultado = JSON.parse(this.responseText);
            mostrarDatos(resultado);
        };
    };
}

function mostrarDatos(resultado) {
    var pantalla = document.getElementById("pantalla");
    var i, j;
    var datos = "";
    for (i = 0; i < resultado.length; i++){
        datos += "<li>" + resultado[i].nombre + "</li>";
        datos += "<li>" + resultado[i].apellido + "</li>";
        datos += "<li>" + resultado[i].documento + "</li>";
        datos += "<li>" + resultado[i].fecha_nac + "</li>";
        datos += "<li>" + resultado[i].direccion + "</li>";
    }
    pantalla.innerHTML = "<ul>" + datos + "</ul>";
    console.log("It Works!");
}