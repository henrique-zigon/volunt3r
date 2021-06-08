package br.com.voluntier.apivoluntier.Models;

import br.com.voluntier.apivoluntier.Responses.ComentarioResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    //@ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne
    @JoinColumn(name = "fk_evento")
    private Evento evento;
    //Porque a utilização do cascade? Ta bloquenado um treco aqui
    //@ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne
    @JoinColumn(name = "publicacao_pai")
    private Publicacao publicacaoPai;

    @OneToMany(mappedBy="fkPublicacao")
    @JsonIgnore
    private List<Gostei> likes;

    @OneToMany(mappedBy="publicacaoPai")
    @JsonIgnore
    private List<Publicacao> comentarios;

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

    public List<Gostei> getLikes() {
        return likes;
    }

    public void setLikes(List<Gostei> likes) {
        this.likes = likes;
    }

    public List<Publicacao> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Publicacao> comentarios) {
        this.comentarios = comentarios;
    }

    public boolean isPublicacaoEvento() {
        return this.getPublicacaoPai() == null;
    }

    public boolean isComentario() {
        if(publicacaoPai == null) {
            return false;
        }
        return !this.getPublicacaoPai().isPublicacaoEvento();
    }

    public Integer getNumeroLikes() {
        return this.getLikes().size();
    }

    public Integer getNumeroComentarios() {
        return this.getComentarios().size();
    }
}
