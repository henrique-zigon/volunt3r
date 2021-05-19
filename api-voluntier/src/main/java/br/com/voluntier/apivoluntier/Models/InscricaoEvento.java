package br.com.voluntier.apivoluntier.Models;

import javax.persistence.*;

@Entity
public class InscricaoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inscricao_evento")
    private Integer id;
    private Integer fkEvento;
    private Integer fkUsuario;
    @Column(name = "status_UE")
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
