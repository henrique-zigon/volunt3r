package br.com.voluntier.apivoluntier.Models;

public class CachePublicacao {

    private Integer id;
    private String titulo;
    private String pathImage;


    public CachePublicacao(Integer id, String titulo, Integer quantidadeGostei, String pathImage) {
        this.id = id;
        this.titulo = titulo;
        this.pathImage = pathImage;
    }

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

    public String getPathImage() {
        return pathImage;
    }

    public void setPathImage(String pathImage) {
        this.pathImage = pathImage;
    }
}
