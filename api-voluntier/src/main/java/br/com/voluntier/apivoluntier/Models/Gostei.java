package br.com.voluntier.apivoluntier.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Gostei {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer idGostei = null;

    @ManyToOne
    @JoinColumn(name = "fk_publicacao")
    private Publicacao fkPublicacao;

    @ManyToOne
    @JoinColumn(name = "fk_usuario")
    private Usuario fkUsuario;

    public Integer getIdGostei() {
        return idGostei;
    }

    public void setIdGostei(Integer idGostei) {
        this.idGostei = idGostei;
    }

    public Publicacao getFkPublicacao() {
        return fkPublicacao;
    }

    public void setFkPublicacao(Publicacao fkPublicacao) {
        this.fkPublicacao = fkPublicacao;
    }

    public Usuario getFkUsuario() {
        return fkUsuario;
    }

    public void setFkUsuario(Usuario fkUsuario) {
        this.fkUsuario = fkUsuario;
    }
}
