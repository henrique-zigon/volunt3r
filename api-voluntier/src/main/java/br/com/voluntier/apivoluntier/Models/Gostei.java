package br.com.voluntier.apivoluntier.Models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Gostei {

    @Id
    private Integer idGostei = null;
    private Integer fkPublicacao;
    private Integer fkUsuario;

    public Integer getIdGostei() {
        return idGostei;
    }

    public void setIdGostei(Integer idGostei) {
        this.idGostei = idGostei;
    }

    public Integer getFkPublicacao() {
        return fkPublicacao;
    }

    public void setFkPublicacao(Integer fkPublicacao) {
        this.fkPublicacao = fkPublicacao;
    }

    public Integer getFkUsuario() {
        return fkUsuario;
    }

    public void setFkUsuario(Integer fkUsuario) {
        this.fkUsuario = fkUsuario;
    }
}
