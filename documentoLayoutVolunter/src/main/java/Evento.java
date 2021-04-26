public class Evento {

    private Integer idEvento;
    private String nomeEvento;
    private String categoria;
    private Integer numeroParticipantes;
    private Integer horas;
    private Double aderencia;
    private String dataAbertura; //dia-mes-ano
    private String dataFechamento; //dia-mes-ano
    private Integer cliques;
    private Integer likes;


    public Evento(Integer idEvento, String nomeEvento, String categoria, Integer numeroParticipantes, Integer horas,
                  Double aderencia, String dataAbertura, String dataFechamento, Integer cliques, Integer likes) {
        this.idEvento = idEvento;
        this.nomeEvento = nomeEvento;
        this.categoria = categoria;
        this.numeroParticipantes = numeroParticipantes;
        this.horas = horas;
        this.aderencia = aderencia;
        this.dataAbertura = dataAbertura;
        this.dataFechamento = dataFechamento;
        this.cliques = cliques;
        this.likes = likes;
    }

    public Integer getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Integer idEvento) {
        this.idEvento = idEvento;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Integer getNumeroParticipantes() {
        return numeroParticipantes;
    }

    public void setNumeroParticipantes(Integer numeroParticipantes) {
        this.numeroParticipantes = numeroParticipantes;
    }

    public Integer getHoras() {
        return horas;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
    }

    public Double getAderencia() {
        return aderencia;
    }

    public void setAderencia(Double aderencia) {
        this.aderencia = aderencia;
    }

    public String getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(String dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public String getDataFechamento() {
        return dataFechamento;
    }

    public void setDataFechamento(String dataFechamento) {
        this.dataFechamento = dataFechamento;
    }

    public Integer getCliques() {
        return cliques;
    }

    public void setCliques(Integer cliques) {
        this.cliques = cliques;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    @Override
    public String toString() {
        return "Evento{" +
                "idEvento=" + idEvento +
                ", nomeEvento='" + nomeEvento + '\'' +
                ", categoria='" + categoria + '\'' +
                ", numeroParticipantes=" + numeroParticipantes +
                ", horas=" + horas +
                ", aderencia=" + aderencia +
                ", dataAbertura='" + dataAbertura + '\'' +
                ", dataFechamento='" + dataFechamento + '\'' +
                ", cliques=" + cliques +
                ", likes=" + likes +
                '}';
    }
}
