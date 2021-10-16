package br.com.voluntier.apivoluntier.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCategoria;

    private String nomeCategoria;
    private int nivel;

    private int limiteBronze;
    private int limitePrata;
    private int limiteOuro;
    private int milhasPromocao;

    public int getLimiteBronze() {
        return limiteBronze;
    }

    public void setLimiteBronze(int limiteBronze) {
        this.limiteBronze = limiteBronze;
    }

    public int getLimitePrata() {
        return limitePrata;
    }

    public void setLimitePrata(int limitePrata) {
        this.limitePrata = limitePrata;
    }

    public int getLimiteOuro() {
        return limiteOuro;
    }

    public void setLimiteOuro(int limiteOuro) {
        this.limiteOuro = limiteOuro;
    }

    public int getMilhasPromocao() {
        return milhasPromocao;
    }

    public void setMilhasPromocao(int milhasPromocao) {
        this.milhasPromocao = milhasPromocao;
    }

    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNomeCategoria() {
        return nomeCategoria;
    }

    public void setNomeCategoria(String nomeCategoria) {
        this.nomeCategoria = nomeCategoria;
    }

    public int getNivel() {
        return nivel;
    }

    public void setNivel(int nivel) {
        this.nivel = nivel;
    }

}
