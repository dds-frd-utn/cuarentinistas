// import * from "transacciones";

const addForm = document.forms['login'];
addForm.addEventListener('submit',function(e){
  e.preventDefault();
  const value = addForm.querySelector('input[type="text"]').value;
  document.getElementById("user").innerHTML = "Bienvenido, " + value;
});
const clienteid = 1;
$(document).ready(function(){
    $('#submit').on('click', function(){
          $('#formulario').hide();
          const cajero = `
          <div class="container columns">
              <aside class="menu column is-one-quarter">
                  <p class="menu-label">
                      Consultas
                  </p>
                  <ul class="menu-list">
                      <li><a id="cuentas" onclick="mostrarCuentas();">Mis Cuentas</a></li>
                      <li><a id="inversiones">Mis Inversiones</a></li>
                  </ul>
                  <p class="menu-label">
                      Transacciones
                  </p>
                  <ul class="menu-list">
                      <li><a id="transacciones" onclick="realizarTransferencia();">Realizar Transferencia</a></li>
                      <li><a>Realizar Inversión</a></li>
                  </ul>
              </aside>

              <div class="column" id="columna-derecha">
				  <div id="container-header" class="container">
					  <h3 class="subtitle">
						  Por favor seleccione una opción del menu a la izquierda para continuar.
					  </h3>
				  </div>
                  <table class="table is-striped is-fullwidth">
                      <thead>
                          <tr id="data-headers">
                          </tr>
                      </thead>
                      <tbody id="data-rest">
                      </tbody>
                  </table>
              </div>
          </div>`;
          $('#cajero').append(cajero);

          //$('#cuentas').on('click', mostrarCuentas());

    });
});

function mostrarCuentas() {
               $.ajax({
                    url: '/cuarentinistas/rest/cuentas/cliente/'+clienteid
                }).done(function(data){

					$('#container-header').text('');
					$('#container-header').append('<h2 class="title is-4" style="margin-bottom: 1rem;">Mis Cuentas</h2>');

					$('#data-headers').text('');
					$('#data-headers').append("<th>Alias</th>");
					$('#data-headers').append("<th>CBU</th>");
					$('#data-headers').append("<th>Balance</th>");
					$('#data-headers').append("<th>Movimientos</th>");

                    $("#data-rest").text('');
                    $.each(data, function(i, item) {
                        $("#data-rest").append('<tr id="item'+i+'"></tr>');

                        $("#item"+i).append("<td>"+item['alias']+"</td>");
                        $("#item"+i).append("<td>"+item['cbu']+"</td>");
                        $("#item"+i).append("<td>"+consultarBalance(item['cbu'])+"</td>");
						$("#item"+i).append("<td><button class='button is-primary is-fullwidth is-small' onclick='verMovimientos(" + item['cbu'] + ")'>Ver</button></td>");
                    });
                });
            };
