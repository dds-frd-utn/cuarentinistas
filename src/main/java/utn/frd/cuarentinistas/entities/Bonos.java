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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Franco
 */
@Entity
@Table(name = "bonos")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bonos.findAll", query = "SELECT b FROM Bonos b"),
    @NamedQuery(name = "Bonos.findById", query = "SELECT b FROM Bonos b WHERE b.id = :id"),
    @NamedQuery(name = "Bonos.findByNombre", query = "SELECT b FROM Bonos b WHERE b.nombre = :nombre"),
    @NamedQuery(name = "Bonos.findByVencimiento", query = "SELECT b FROM Bonos b WHERE b.vencimiento = :vencimiento"),
    @NamedQuery(name = "Bonos.findByPrecioPago", query = "SELECT b FROM Bonos b WHERE b.precioPago = :precioPago"),
    @NamedQuery(name = "Bonos.findByPrecioCobro", query = "SELECT b FROM Bonos b WHERE b.precioCobro = :precioCobro")})
public class Bonos implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre")
    private String nombre;
    @Basic(optional = false)
    @NotNull
    @Column(name = "vencimiento")
    @Temporal(TemporalType.DATE)
    private Date vencimiento;
    @Basic(optional = false)
    @NotNull
    @Column(name = "precio_pago")
    private int precioPago;
    @Basic(optional = false)
    @NotNull
    @Column(name = "precio_cobro")
    private int precioCobro;

    public Bonos() {
    }

    public Bonos(Integer id) {
        this.id = id;
    }

    public Bonos(Integer id, String nombre, Date vencimiento, int precioPago, int precioCobro) {
        this.id = id;
        this.nombre = nombre;
        this.vencimiento = vencimiento;
        this.precioPago = precioPago;
        this.precioCobro = precioCobro;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getVencimiento() {
        return vencimiento;
    }

    public void setVencimiento(Date vencimiento) {
        this.vencimiento = vencimiento;
    }

    public int getPrecioPago() {
        return precioPago;
    }

    public void setPrecioPago(int precioPago) {
        this.precioPago = precioPago;
    }

    public int getPrecioCobro() {
        return precioCobro;
    }

    public void setPrecioCobro(int precioCobro) {
        this.precioCobro = precioCobro;
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
        if (!(object instanceof Bonos)) {
            return false;
        }
        Bonos other = (Bonos) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "utn.frd.cuarentinistas.entities.Bonos[ id=" + id + " ]";
    }
    
}
