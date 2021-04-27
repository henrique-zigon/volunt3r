package br.com.voluntier.apivoluntier.Models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class UsuarioEvento {

    @Id
    private Integer id;
    private Integer fkEvento;
    private Integer fkUsuario;
    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFkEvento() {
        return fkEvento;
    }

    public void setFkEvento(Integer fkEvento) {
        this.fkEvento = fkEvento;
    }

    public Integer getFkUsuario() {
        return fkUsuario;
    }

    public void setFkUsuario(Integer fkUsuario) {
        this.fkUsuario = fkUsuario;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
