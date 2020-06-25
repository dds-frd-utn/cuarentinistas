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
            var resultado = this.responseText;
            mostrarDatos(resultado);
        };
    };
}

function mostrarDatos(resultado) {
    var pantalla = document.getElementById("pantalla");
    pantalla.innerHTML = "<ul>" + resultado + "</p>";
    console.log("It Works!");
}