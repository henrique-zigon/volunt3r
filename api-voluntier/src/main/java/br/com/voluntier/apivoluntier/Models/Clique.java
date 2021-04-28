package br.com.voluntier.apivoluntier.Models;

import javax.persistence.*;

@Entity
public class Clique {

    @Id
    @Column(name = "id_categoria")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "fk_publicacao")
    private Publicacao publicacao;

    @ManyToOne
    @JoinColumn(name = "fk_usuario")
    private Usuario usuario;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Publicacao getPublicacao() {
        return publicacao;
    }

    public void setPublicacao(Publicacao publicacao) {
        this.publicacao = publicacao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
