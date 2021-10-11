package br.com.voluntier.apivoluntier.Responses;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity                             //Não é uma entidade mas só funciona se for
public class Classificacao {
    @Id
    private Integer idCategoria;

    private String nomeCategoria;
    private int nivel;
    private int limiteBronze;
    private int limitePrata;
    private int limiteOuro;
    private int milhasPromocao;
    private int contagem;
    private String ranque;

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

    public int getcontagem() {
        return contagem;
    }

    public void setcontagem(int contagem) {
        this.contagem = contagem;
    }

    public String getRanque() {
        return ranque;
    }

    public void setRanque(String ranque) {
        this.ranque = ranque;
    }

    public String getProximoNivel(){
        if (contagem<limiteBronze){
            return "BRONZE";
        }
        else if (contagem<limitePrata){
            return "PRATA";
        }
        else if (contagem<limiteOuro){
            return "OURO";
        }
        return null;
    }

    public Integer getQtdDoProximoNivel(){
        if (contagem<limiteBronze){
            return limiteBronze;
        }
        else if (contagem<limitePrata){
            return limitePrata;
        }
        else if (contagem<limiteOuro){
            return limiteOuro;
        }
        return null;
    }
}
