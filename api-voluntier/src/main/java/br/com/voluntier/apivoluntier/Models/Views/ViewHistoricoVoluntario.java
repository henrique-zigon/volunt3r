package br.com.voluntier.apivoluntier.Models.Views;

import com.amazonaws.annotation.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "view_historico_voluntario")
public class ViewHistoricoVoluntario {
    @Id
    private Integer fk_usuario;
    @Column(name="2019")
    private Integer ano2019;
    @Column(name="2020")
    private Integer ano2020;
    @Column(name="2021")
    private Integer ano2021;
    private Double score2019;
    private Double score2020;
    private Double score2021;
    private String perfilComparativo;
    private String perfilAno;
    private String perfilCompleto;

    public Integer getFk_usuario() {
        return fk_usuario;
    }

    public void setFk_usuario(Integer fk_usuario) {
        this.fk_usuario = fk_usuario;
    }

    public Integer getAno2019() {
        return ano2019;
    }

    public void setAno2019(Integer ano2019) {
        this.ano2019 = ano2019;
    }

    public Integer getAno2020() {
        return ano2020;
    }

    public void setAno2020(Integer ano2020) {
        this.ano2020 = ano2020;
    }

    public Integer getAno2021() {
        return ano2021;
    }

    public void setAno2021(Integer ano2021) {
        this.ano2021 = ano2021;
    }

    public Double getScore2019() {
        return score2019;
    }

    public void setScore2019(Double score2019) {
        this.score2019 = score2019;
    }

    public Double getScore2020() {
        return score2020;
    }

    public void setScore2020(Double score2020) {
        this.score2020 = score2020;
    }

    public Double getScore2021() {
        return score2021;
    }

    public void setScore2021(Double score2021) {
        this.score2021 = score2021;
    }

    public String getPerfilComparativo() {
        return perfilComparativo;
    }

    public void setPerfilComparativo(String perfilComparativo) {
        this.perfilComparativo = perfilComparativo;
    }

    public String getPerfilAno() {
        return perfilAno;
    }

    public void setPerfilAno(String perfilAno) {
        this.perfilAno = perfilAno;
    }

    public String getPerfilCompleto() {
        return perfilCompleto;
    }

    public void setPerfilCompleto(String perfilCompleto) {
        this.perfilCompleto = perfilCompleto;
    }
}
