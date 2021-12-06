package br.com.voluntier.apivoluntier.Models.Views;

import com.amazonaws.annotation.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "view_aderencia_eventos")
public class ViewAderenciaEventos {
    @Id
    private Integer fkEvento;
    private String titulo;
    private String data_fechamento_evento;
    private Long participacoes;
    private Double aderencia;

    public Integer getFkEvento() {
        return fkEvento;
    }

    public void setFkEvento(Integer fkEvento) {
        this.fkEvento = fkEvento;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getData_fechamento_evento() {
        return data_fechamento_evento;
    }

    public void setData_fechamento_evento(String data_fechamento_evento) {
        this.data_fechamento_evento = data_fechamento_evento;
    }

    public Long getParticipacoes() {
        return participacoes;
    }

    public void setParticipacoes(Long participacoes) {
        this.participacoes = participacoes;
    }

    public Double getAderencia() {
        return aderencia;
    }

    public void setAderencia(Double aderencia) {
        this.aderencia = aderencia;
    }
}
