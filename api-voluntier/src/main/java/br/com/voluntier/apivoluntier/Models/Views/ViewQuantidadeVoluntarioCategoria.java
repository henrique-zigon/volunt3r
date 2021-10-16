package br.com.voluntier.apivoluntier.Models.Views;

import com.amazonaws.annotation.Immutable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "view_quantidade_voluntario_categoria")
public class ViewQuantidadeVoluntarioCategoria {
    @Id
    private String categoria;
    private int quantidadeVoluntarios;


    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getQuantidadeVoluntarios() {
        return quantidadeVoluntarios;
    }

    public void setQuantidadeVoluntarios(int quantidadeVoluntarios) {
        this.quantidadeVoluntarios = quantidadeVoluntarios;
    }

}
