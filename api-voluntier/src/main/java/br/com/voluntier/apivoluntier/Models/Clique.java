package br.com.voluntier.apivoluntier.Models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Clique {

    private Integer id = null;
    private int fkPublicacao;
    private int fkUsuario;

    public int getFkPublicacao() {
        return fkPublicacao;
    }

    public void setFkPublicacao(int fkPublicacao) {
        this.fkPublicacao = fkPublicacao;
    }

    public int getFkUsuario() {
        return fkUsuario;
    }

    public void setFkUsuario(int fkUsuario) {
        this.fkUsuario = fkUsuario;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    public Integer getId() {
        return id;
    }
}
