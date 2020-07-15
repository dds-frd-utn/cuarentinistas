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
import utn.frd.cuarentinistas.entities.Bonos;
import utn.frd.cuarentinistas.sessions.BonosFacade;


@Path("/bonos")
public class BonosRest {
    @EJB
    private BonosFacade ejbBonosFacade;

    //obtener todas las entidades
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Bonos> findAll(){
        return ejbBonosFacade.findAll();
    }

    //crear entidades
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Bonos bono){
        ejbBonosFacade.create(bono);
    }

    //actualizar entidades
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/{id}")
    public void edit(@PathParam("id")long id, Bonos bono){
        ejbBonosFacade.edit(bono);
    }

    //eliminar entidades
    @DELETE
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    @Path("/{id}")
    public void remove(@PathParam("id")long id){
        ejbBonosFacade.remove( ejbBonosFacade.find(id) );
    }

    //obtener una entidad por id
    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Bonos findById(@PathParam("id")int id){
        return ejbBonosFacade.find(id);
    }
}