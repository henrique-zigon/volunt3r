package br.com.voluntier.apivoluntier.Models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Voluntario {

    @Id
    private Integer idUsuario;

    private String nomeUsuario;

    private String cargo;

    private String ano2019;
    private String ano2020;
    private String ano2021;

    private Integer totalMinutosN1;
    private Integer TotalMinutosN2;
    private Integer totalMinutosN3;
    private Integer TotalMinutosN4;
    private Integer totalMinutos;

    private Integer totalParticipacoesN1;
    private Integer totalParticipacoesN2;
    private Integer totalParticipacoesN3;
    private Integer totalParticipacoesN4;
    private Integer totalParticipacoes;

    private Integer score;

    private Double tempoCasa;

    private Double aderencia;


    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getAno2019() {
        return ano2019;
    }

    public void setAno2019(String ano2019) {
        this.ano2019 = ano2019;
    }

    public String getAno2020() {
        return ano2020;
    }

    public void setAno2020(String ano2020) {
        this.ano2020 = ano2020;
    }

    public String getAno2021() {
        return ano2021;
    }

    public void setAno2021(String ano2021) {
        this.ano2021 = ano2021;
    }

    public Integer getTotalMinutosN1() {
        return totalMinutosN1;
    }

    public void setTotalMinutosN1(Integer totalMinutosN1) {
        this.totalMinutosN1 = totalMinutosN1;
    }

    public Integer getTotalMinutosN2() {
        return TotalMinutosN2;
    }

    public void setTotalMinutosN2(Integer totalMinutosN2) {
        TotalMinutosN2 = totalMinutosN2;
    }

    public Integer getTotalMinutosN3() {
        return totalMinutosN3;
    }

    public void setTotalMinutosN3(Integer totalMinutosN3) {
        this.totalMinutosN3 = totalMinutosN3;
    }

    public Integer getTotalMinutosN4() {
        return TotalMinutosN4;
    }

    public void setTotalMinutosN4(Integer totalMinutosN4) {
        TotalMinutosN4 = totalMinutosN4;
    }

    public Integer getTotalMinutos() {
        return totalMinutos;
    }

    public void setTotalMinutos(Integer totalMinutos) {
        this.totalMinutos = totalMinutos;
    }

    public Integer getTotalParticipacoesN1() {
        return totalParticipacoesN1;
    }

    public void setTotalParticipacoesN1(Integer totalParticipacoesN1) {
        this.totalParticipacoesN1 = totalParticipacoesN1;
    }

    public Integer getTotalParticipacoesN2() {
        return totalParticipacoesN2;
    }

    public void setTotalParticipacoesN2(Integer totalParticipacoesN2) {
        this.totalParticipacoesN2 = totalParticipacoesN2;
    }

    public Integer getTotalParticipacoesN3() {
        return totalParticipacoesN3;
    }

    public void setTotalParticipacoesN3(Integer totalParticipacoesN3) {
        this.totalParticipacoesN3 = totalParticipacoesN3;
    }

    public Integer getTotalParticipacoesN4() {
        return totalParticipacoesN4;
    }

    public void setTotalParticipacoesN4(Integer totalParticipacoesN4) {
        this.totalParticipacoesN4 = totalParticipacoesN4;
    }

    public Integer getTotalParticipacoes() {
        return totalParticipacoes;
    }

    public void setTotalParticipacoes(Integer totalParticipacoes) {
        this.totalParticipacoes = totalParticipacoes;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Double getTempoCasa() {
        return tempoCasa;
    }

    public void setTempoCasa(Double tempoCasa) {
        this.tempoCasa = tempoCasa;
    }

    public Double getAderencia() {
        return aderencia;
    }

    public void setAderencia(Double aderencia) {
        this.aderencia = aderencia;
    }
}
