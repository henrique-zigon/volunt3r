package br.com.voluntier.apivoluntier.Models;

public class WordCloud {

    private String name;
    private Integer weight;

    public WordCloud(String name) {
        this.name = name;
        this.weight=0;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public void aumentarWeight(){
        this.weight++;
    }
}
