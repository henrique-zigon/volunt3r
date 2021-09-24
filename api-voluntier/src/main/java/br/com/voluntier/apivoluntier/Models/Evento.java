package br.com.voluntier.apivoluntier.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Integer id;

    private String titulo;
    private String dataEvento;
    private String dataFechamentoEvento;
    private String endereco;
    private Integer maximoParticipantes;
    private double horas;
    private Integer milhasParticipacao;
    @OneToMany(mappedBy = "fkEvento")
    private List<InscricaoEvento> inscritos;

    @ManyToOne
    @JoinColumn(name = "fk_categoria")
    private Categoria categoria;

    public Integer getMilhasParticipacao() {
        return milhasParticipacao;
    }

    public void setMilhasParticipacao(Integer milhasParticipacao) {
        this.milhasParticipacao = milhasParticipacao;
    }

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

    public String getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(String dataEvento) {
        this.dataEvento = dataEvento;
    }

    public String getDataFechamentoEvento() {
        return dataFechamentoEvento;
    }

    public void setDataFechamentoEvento(String dataFechamentoEvento) {
        this.dataFechamentoEvento = dataFechamentoEvento;
    }

    public Integer getMaximoParticipantes() {
        return maximoParticipantes;
    }

    public void setMaximoParticipantes(Integer maximoParticipantes) {
        this.maximoParticipantes = maximoParticipantes;
    }

    public double getHoras() {
        return horas;
    }

    public void setHoras(double horas) {
        this.horas = horas;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public List<InscricaoEvento> getInscritos() {
        return inscritos;
    }

    public void setInscritos(List<InscricaoEvento> inscritos) {
        this.inscritos = inscritos;
    }

    public Integer getNumeroInscritos() {
        return this.getInscritos().size();
    }
}



