package br.com.voluntier.apivoluntier.Models;

import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;

@Entity
public class Publicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_publicacao")
    private Integer id;

    @Column(name = "titulo_publicacao")
    private String titulo;
    private String descricao;

    private String dataPostagem;

    @Column(name = "imagem")
    private String pathImagem;

    @ManyToOne()
    @JoinColumn(name = "fk_usuario")
    private Usuario usuario;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_evento")
    private Evento evento;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "publicacao_pai")
    private Publicacao publicacaoPai;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataPostagem() {
        return dataPostagem;
    }

    public void setDataPostagem(String dataPostagem) {
        this.dataPostagem = dataPostagem;
    }

    public String getPathImagem() {
        return pathImagem;
    }

    public void setPathImagem(String pathImagem) {
        this.pathImagem = pathImagem;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Publicacao getPublicacaoPai() {
        return publicacaoPai;
    }

    public void setPublicacaoPai(Publicacao publicacaoPai) {
        this.publicacaoPai = publicacaoPai;
    }
}
