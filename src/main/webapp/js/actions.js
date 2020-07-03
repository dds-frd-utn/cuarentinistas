const addForm = document.forms['login'];
addForm.addEventListener('submit',function(e){
  e.preventDefault();
  const value = addForm.querySelector('input[type="text"]').value;
  document.getElementById("user").innerHTML = "Bienvenido, " + value;
});

$(document).ready(function(){
    $('#submit').on('click', function(){
          $('#formulario').hide();
		  const clienteid = 1;
          const cajero = `
          <div class="container columns">
              <aside class="menu column is-one-quarter">
                  <p class="menu-label">
                      Consultas
                  </p>
                  <ul class="menu-list">
                      <li><a id="cuentas">Mis Cuentas</a></li>
                      <li><a id="inversiones">Mis Inversiones</a></li>
                  </ul>
                  <p class="menu-label">
                      Transacciones
                  </p>
                  <ul class="menu-list">
                      <li><a>Realizar Transferencia</a></li>
                      <li><a>Realizar Inversión</a></li>
                  </ul>
              </aside>
              <div class="column">
                  <table class="table is-striped is-fullwidth">
                      <thead>
                          <tr>
                              <th>Alias</th>
                              <th>CBU</th>
                              <th>Saldo</th>
                              <th>Movimientos</th>
                          </tr>
                      </thead>
                      <tbody id="data-rest">
                      </tbody>
                  </table>
              </div>
          </div>`;
          $('#cajero').append(cajero);
          $('#cuentas').on('click', function () {
               $.ajax({
                    url: '/cuarentinistas/rest/cuentas/cliente/'+clienteid
                }).done(function(data){
                    $("#data-rest").text('');
                    $.each(data, function(i, item) {
                        $("#data-rest").append('<tr id="item'+i+'""></tr>');
                        $("#item"+i).append("<td>"+item['alias']+"</td>");
                        $("#item"+i).append("<td>"+item['cbu']+"</td>");
                        $("#item"+i).append("<td>"+consultarSaldo(item['cbu'])+"</td>");
						$("#item"+i).append("<td><button>Ver</button></td>");
                    });
                });
            });

    });
});
