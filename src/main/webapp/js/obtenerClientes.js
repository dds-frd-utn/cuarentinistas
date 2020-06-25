window.onload=function(){
    var clientes = document.getElementById("clientes");
    clientes.addEventListener("click", traerDatos);
};

function traerDatos(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"http://localhost:8080/cuarentinistas/rest/clientes",true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
        };
    };
}