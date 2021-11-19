package br.com.voluntier.apivoluntier.Models.Views;

import com.amazonaws.annotation.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "view_cache_publicacao")
public class ViewCachePublicacao {

    @Id
    private Integer idPublicacao;

    private String titulo;

    private String tipo;

    @Column(name = "imagem")
    private String pathImage;

    
    private Integer nivel;

    public Integer getIdPublicacao() {
        return idPublicacao;
    }

    public void setIdPublicacao(Integer idPublicacao) {
        this.idPublicacao = idPublicacao;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPathImage() {
        return pathImage;
    }

    public void setPathImage(String pathImage) {
        this.pathImage = pathImage;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getnivel() {
        return nivel;
    }

    public void setnivel(Integer nivel) {
        this.nivel = nivel;
    }
}
