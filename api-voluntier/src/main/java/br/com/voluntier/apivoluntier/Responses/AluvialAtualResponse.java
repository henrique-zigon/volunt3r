package br.com.voluntier.apivoluntier.Responses;

public class AluvialAtualResponse {

    private String ano2020;
    private String ano2021;
    private Integer peso;

//    public AluvialAtualResponse(String ano2020, String ano2021, Integer peso) {
//        this.ano2020 = ano2020;
//        this.ano2021 = ano2021;
//        this.peso = peso;
//    }

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

    public Integer getPeso() {
        return peso;
    }

    public void setPeso(Integer peso) {
        this.peso = peso;
    }
}
