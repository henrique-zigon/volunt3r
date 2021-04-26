public class Funcionario {

    private Integer idFuncionario;
    private String nomeFuncionario;
    private String cargo;
    private String classificacao;
    private Double totalhorasn1;
    private Double totalhorasn2;
    private Double totalhorasn3;
    private Double totalhorasn4;
    private Integer totalqtdn1;
    private Integer totalqtdn2;
    private Integer totalqtdn3;
    private Integer totalqtdn4;
    private Integer totalqtd;
    private Double score;

    public Funcionario(Integer idFuncionario, String nomeFuncionario, String cargo, String classificacao,
                       Double totalhorasn1, Double totalhorasn2, Double totalhorasn3, Double totalhorasn4,
                       Integer totalqtdn1, Integer totalqtdn2, Integer totalqtdn3, Integer totalqtdn4,
                       Integer totalqtd, Double score) {
        this.idFuncionario = idFuncionario;
        this.nomeFuncionario = nomeFuncionario;
        this.cargo = cargo;
        this.classificacao = classificacao;
        this.totalhorasn1 = totalhorasn1;
        this.totalhorasn2 = totalhorasn2;
        this.totalhorasn3 = totalhorasn3;
        this.totalhorasn4 = totalhorasn4;
        this.totalqtdn1 = totalqtdn1;
        this.totalqtdn2 = totalqtdn2;
        this.totalqtdn3 = totalqtdn3;
        this.totalqtdn4 = totalqtdn4;
        this.totalqtd = totalqtd;
        this.score = score;
    }

    public Integer getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(Integer idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(String classificacao) {
        this.classificacao = classificacao;
    }

    public Double getTotalhorasn1() {
        return totalhorasn1;
    }

    public void setTotalhorasn1(Double totalhorasn1) {
        this.totalhorasn1 = totalhorasn1;
    }

    public Double getTotalhorasn2() {
        return totalhorasn2;
    }

    public void setTotalhorasn2(Double totalhorasn2) {
        this.totalhorasn2 = totalhorasn2;
    }

    public Double getTotalhorasn3() {
        return totalhorasn3;
    }

    public void setTotalhorasn3(Double totalhorasn3) {
        this.totalhorasn3 = totalhorasn3;
    }

    public Double getTotalhorasn4() {
        return totalhorasn4;
    }

    public void setTotalhorasn4(Double totalhorasn4) {
        this.totalhorasn4 = totalhorasn4;
    }

    public Integer getTotalqtdn1() {
        return totalqtdn1;
    }

    public void setTotalqtdn1(Integer totalqtdn1) {
        this.totalqtdn1 = totalqtdn1;
    }

    public Integer getTotalqtdn2() {
        return totalqtdn2;
    }

    public void setTotalqtdn2(Integer totalqtdn2) {
        this.totalqtdn2 = totalqtdn2;
    }

    public Integer getTotalqtdn3() {
        return totalqtdn3;
    }

    public void setTotalqtdn3(Integer totalqtdn3) {
        this.totalqtdn3 = totalqtdn3;
    }

    public Integer getTotalqtdn4() {
        return totalqtdn4;
    }

    public void setTotalqtdn4(Integer totalqtdn4) {
        this.totalqtdn4 = totalqtdn4;
    }

    public Integer getTotalqtd() {
        return totalqtd;
    }

    public void setTotalqtd(Integer totalqtd) {
        this.totalqtd = totalqtd;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "Funcionario{" +
                "idFuncionario=" + idFuncionario +
                ", nomeFuncionario='" + nomeFuncionario + '\'' +
                ", cargo='" + cargo + '\'' +
                ", classificacao='" + classificacao + '\'' +
                ", totalhorasn1=" + totalhorasn1 +
                ", totalhorasn2=" + totalhorasn2 +
                ", totalhorasn3=" + totalhorasn3 +
                ", totalhorasn4=" + totalhorasn4 +
                ", totalqtdn1=" + totalqtdn1 +
                ", totalqtdn2=" + totalqtdn2 +
                ", totalqtdn3=" + totalqtdn3 +
                ", totalqtdn4=" + totalqtdn4 +
                ", totalqtd=" + totalqtd +
                ", score=" + score +
                '}';
    }
}
