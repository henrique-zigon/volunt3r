package br.com.voluntier.apivoluntier.Models.Views;

import com.amazonaws.annotation.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "view_voluntariados")
public class Voluntario {

    @Id
    @Column(name="fkUsuario")
    private Integer idUsuario;

    private String dataDefinitiva;

    private String nomeUsuario;

    private String genero;
    private String tipo_usuario;
    private String cargo;
    private String area;
    private Integer status_usuario;
    private Integer nivel;
    @Column(name="total_horas_N1")
    private Double totalHorasN1;
    @Column(name="total_horas_N2")
    private Double totalHorasN2;
    @Column(name="total_horas_N3")
    private Double totalHorasN3;
    @Column(name="total_horas_N4")
    private Double totalHorasN4;
    private Double totalHoras;
    @Column(name="total_participacoes_n1")
    private Double totalParticipacoesN1;
    @Column(name="total_participacoes_n2")
    private Double totalParticipacoesN2;
    @Column(name="total_participacoes_n3")
    private Double totalParticipacoesN3;
    @Column(name="total_participacoes_n4")
    private Double totalParticipacoesN4;
    private Double totalParticipacoes;
    private Double score;
    private Double aderencia;

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDataDefinitiva() {
        return dataDefinitiva;
    }

    public void setDataDefinitiva(String dataDefinitiva) {
        this.dataDefinitiva = dataDefinitiva;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getTipo_usuario() {
        return tipo_usuario;
    }

    public void setTipo_usuario(String tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Integer getStatus_usuario() {
        return status_usuario;
    }

    public void setStatus_usuario(Integer status_usuario) {
        this.status_usuario = status_usuario;
    }

    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }

    public Double getTotalHorasN1() {
        return totalHorasN1;
    }

    public void setTotalHorasN1(Double totalHorasN1) {
        this.totalHorasN1 = totalHorasN1;
    }

    public Double getTotalHorasN2() {
        return totalHorasN2;
    }

    public void setTotalHorasN2(Double totalHorasN2) {
        this.totalHorasN2 = totalHorasN2;
    }

    public Double getTotalHorasN3() {
        return totalHorasN3;
    }

    public void setTotalHorasN3(Double totalHorasN3) {
        this.totalHorasN3 = totalHorasN3;
    }

    public Double getTotalHorasN4() {
        return totalHorasN4;
    }

    public void setTotalHorasN4(Double totalHorasN4) {
        this.totalHorasN4 = totalHorasN4;
    }

    public Double getTotalHoras() {
        return totalHoras;
    }

    public void setTotalHoras(Double totalHoras) {
        this.totalHoras = totalHoras;
    }

    public Double getTotalParticipacoesN1() {
        return totalParticipacoesN1;
    }

    public void setTotalParticipacoesN1(Double totalParticipacoesN1) {
        this.totalParticipacoesN1 = totalParticipacoesN1;
    }

    public Double getTotalParticipacoesN2() {
        return totalParticipacoesN2;
    }

    public void setTotalParticipacoesN2(Double totalParticipacoesN2) {
        this.totalParticipacoesN2 = totalParticipacoesN2;
    }

    public Double getTotalParticipacoesN3() {
        return totalParticipacoesN3;
    }

    public void setTotalParticipacoesN3(Double totalParticipacoesN3) {
        this.totalParticipacoesN3 = totalParticipacoesN3;
    }

    public Double getTotalParticipacoesN4() {
        return totalParticipacoesN4;
    }

    public void setTotalParticipacoesN4(Double totalParticipacoesN4) {
        this.totalParticipacoesN4 = totalParticipacoesN4;
    }

    public Double getTotalParticipacoes() {
        return totalParticipacoes;
    }

    public void setTotalParticipacoes(Double totalParticipacoes) {
        this.totalParticipacoes = totalParticipacoes;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Double getAderencia() {
        return aderencia;
    }

    public void setAderencia(Double aderencia) {
        this.aderencia = aderencia;
    }
}
