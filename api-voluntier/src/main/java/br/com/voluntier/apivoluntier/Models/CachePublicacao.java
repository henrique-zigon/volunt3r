package br.com.voluntier.apivoluntier.Models;

public class CachePublicacao {

    private Integer id;
    private String titulo;
    private Integer quantidadeGostei;

    public CachePublicacao(Integer id, String titulo, Integer quantidadeGostei) {
        this.id = id;
        this.titulo = titulo;
        this.quantidadeGostei = quantidadeGostei;
    }

    public Integer getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Integer getQuantidadeGostei() {
        return quantidadeGostei;
    }
}
