package utn.frd.cuarentinistas.rest.services;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import utn.frd.cuarentinistas.entities.Movimientos;
import utn.frd.cuarentinistas.sessions.MovimientosFacade;


@Path("/movimientos")
public class MovimientosRest {
    @EJB
    private MovimientosFacade ejbMovimientosFacade;

    //obtener todas las entidades
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movimientos> findAll(){
        return ejbMovimientosFacade.findAll();
    }

    //crear entidades
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Movimientos movimiento){
        ejbMovimientosFacade.create(movimiento);
    }

    //actualizar entidades
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/{id}")
    public void edit(@PathParam("id")long id, Movimientos movimiento){
        ejbMovimientosFacade.edit(movimiento);
    }

    //eliminar entidades
    @DELETE
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    @Path("/{id}")
    public void remove(@PathParam("id")long id){
        ejbMovimientosFacade.remove( ejbMovimientosFacade.find(id) );
    }

    //obtener una entidad por id

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Movimientos findById(@PathParam("id")int id){
        return ejbMovimientosFacade.find(id);
    }
    
    @GET
    @Path("/cbuSalida/{cbuSalida}")
    @Produces({MediaType.APPLICATION_JSON})
    public Movimientos findByCbuSalida(@PathParam("cbuSalida")int cbuSalida){
        return ejbMovimientosFacade.find(cbuSalida);
    }
    
    @GET
    @Path("/cbuDestino/{cbuDestino}")
    @Produces({MediaType.APPLICATION_JSON})
    public Movimientos findByCbuDestino(@PathParam("cbuDestino")int cbuDestino){
        return ejbMovimientosFacade.find(cbuDestino);
    }
}