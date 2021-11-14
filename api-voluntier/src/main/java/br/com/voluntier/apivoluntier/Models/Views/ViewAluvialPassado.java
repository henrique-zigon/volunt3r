package br.com.voluntier.apivoluntier.Models.Views;

import com.amazonaws.annotation.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Immutable
@Table(name = "view_aluvial_passado")
public class ViewAluvialPassado {


    @Id
    @Column(name="ano2019")
    private String from;
    @Column(name="ano2020")
    private String to;
    @Column(name = "contador")
    private Integer weight;


    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }
}