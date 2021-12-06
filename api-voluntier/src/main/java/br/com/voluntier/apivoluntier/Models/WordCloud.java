package br.com.voluntier.apivoluntier.Models;

public class WordCloud {

    private String hashtag;
    private Integer contador;

    public WordCloud(String hashtag) {
        this.hashtag = hashtag;
        this.contador=0;
    }

    public String getHashtag() {
        return hashtag;
    }

    public void setHashtag(String hashtag) {
        this.hashtag = hashtag;
    }

    public Integer getContador() {
        return contador;
    }

    public void setContador(Integer contador) {
        this.contador = contador;
    }

    public void aumentarContador(){
        this.contador++;
    }
}
