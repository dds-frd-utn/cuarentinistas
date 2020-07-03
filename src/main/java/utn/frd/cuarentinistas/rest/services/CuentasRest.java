package utn.frd.cuarentinistas.rest.services;

import java.util.List;
import javax.ejb.EJB;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import utn.frd.cuarentinistas.entities.Cuentas;
import utn.frd.cuarentinistas.sessions.CuentasFacade;


@Path("/cuentas")
public class CuentasRest {
    EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "my_persistence_unit" );
    EntityManager em = emfactory.createEntityManager( );

    @EJB
    private CuentasFacade ejbCuentasFacade;

    //obtener todas las entidades
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Cuentas> findAll(){
        return ejbCuentasFacade.findAll();
    }

    //crear entidades
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Cuentas cuenta){
        ejbCuentasFacade.create(cuenta);
    }

    //actualizar entidades
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/{id}")
    public void edit(@PathParam("id")long id, Cuentas cuenta){
        ejbCuentasFacade.edit(cuenta);
    }

    //eliminar entidades
    @DELETE
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    @Path("/{id}")
    public void remove(@PathParam("id")long id){
        ejbCuentasFacade.remove( ejbCuentasFacade.find(id) );
    }

    //obtener una entidad por id
    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Cuentas findById(@PathParam("id")int id){
        return ejbCuentasFacade.find(id);
    }

    @GET
    @Path("/cliente/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Cuentas> findByClienteId(@PathParam("id")int id){
        TypedQuery<Cuentas> q = em.createNamedQuery("Cuentas.findByClienteId", Cuentas.class);
        q.setParameter("clienteId", id);
        return q.getResultList();
    }
}