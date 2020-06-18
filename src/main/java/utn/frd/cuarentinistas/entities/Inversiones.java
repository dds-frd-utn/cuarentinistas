/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utn.frd.cuarentinistas.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Franco
 */
@Entity
@Table(name = "inversiones")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Inversiones.findAll", query = "SELECT i FROM Inversiones i"),
    @NamedQuery(name = "Inversiones.findById", query = "SELECT i FROM Inversiones i WHERE i.id = :id"),
    @NamedQuery(name = "Inversiones.findByCantidad", query = "SELECT i FROM Inversiones i WHERE i.cantidad = :cantidad"),
    @NamedQuery(name = "Inversiones.findByFecha", query = "SELECT i FROM Inversiones i WHERE i.fecha = :fecha"),
    @NamedQuery(name = "Inversiones.findByInversionistaCbu", query = "SELECT i FROM Inversiones i WHERE i.inversionistaCbu = :inversionistaCbu"),
    @NamedQuery(name = "Inversiones.findByBonoId", query = "SELECT i FROM Inversiones i WHERE i.bonoId = :bonoId")})
public class Inversiones implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "cantidad")
    private int cantidad;
    @Basic(optional = false)
    @NotNull
    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    private Date fecha;
    @Basic(optional = false)
    @NotNull
    @Column(name = "inversionista_cbu")
    private int inversionistaCbu;
    @Basic(optional = false)
    @NotNull
    @Column(name = "bono_id")
    private int bonoId;

    public Inversiones() {
    }

    public Inversiones(Integer id) {
        this.id = id;
    }

    public Inversiones(Integer id, int cantidad, Date fecha, int inversionistaCbu, int bonoId) {
        this.id = id;
        this.cantidad = cantidad;
        this.fecha = fecha;
        this.inversionistaCbu = inversionistaCbu;
        this.bonoId = bonoId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public int getInversionistaCbu() {
        return inversionistaCbu;
    }

    public void setInversionistaCbu(int inversionistaCbu) {
        this.inversionistaCbu = inversionistaCbu;
    }

    public int getBonoId() {
        return bonoId;
    }

    public void setBonoId(int bonoId) {
        this.bonoId = bonoId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Inversiones)) {
            return false;
        }
        Inversiones other = (Inversiones) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "utn.frd.cuarentinistas.entity.Inversiones[ id=" + id + " ]";
    }
    
}
