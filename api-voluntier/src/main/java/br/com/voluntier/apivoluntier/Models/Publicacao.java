package br.com.voluntier.apivoluntier.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Publicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String titulo;
    private String descricao;
    private String dataPostada;
    private String pathImagem;
    private int idUsuario;
    private int idEvento;

    @OneToOne
    private Publicacao fkPublicacao;

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

    public String getDataPostada() {
        return dataPostada;
    }

    public void setDataPostada(String dataPostada) {
        this.dataPostada = dataPostada;
    }

    public String getPathImagem() {
        return pathImagem;
    }

    public void setPathImagem(String pathImagem) {
        this.pathImagem = pathImagem;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public int getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(int idEvento) {
        this.idEvento = idEvento;
    }

    public Publicacao getFkPublicacao() {
        return fkPublicacao;
    }

    public void setFkPublicacao(Publicacao fkPublicacao) {
        this.fkPublicacao = fkPublicacao;
    }
}
