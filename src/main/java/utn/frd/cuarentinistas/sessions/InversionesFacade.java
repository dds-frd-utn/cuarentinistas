/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utn.frd.cuarentinistas.sessions;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import utn.frd.cuarentinistas.entities.Inversiones;

/**
 *
 * @author Franco
 */
@Stateless
public class InversionesFacade extends AbstractFacade<Inversiones> {

    @PersistenceContext(unitName = "my_persistence_unit")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public InversionesFacade() {
        super(Inversiones.class);
    }
    
}
