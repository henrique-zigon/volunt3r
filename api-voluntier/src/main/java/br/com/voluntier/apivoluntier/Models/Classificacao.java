package br.com.voluntier.apivoluntier.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity                             //Não é uma entidade mas só funciona se for
public class Classificacao {
    @Id
    @Column(name = "nome_categoria")
    private String nomeCategoria;

    @Column(name="quantidade")
    Integer quantidade;


    public String getNomeCategoria() {
        return nomeCategoria;
    }

    public void setNomeCategoria(String nomeCategoria) {
        this.nomeCategoria = nomeCategoria;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

}
