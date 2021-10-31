package br.com.voluntier.apivoluntier.Responses;

import br.com.voluntier.apivoluntier.Models.Voluntario;

import javax.persistence.Column;
import javax.persistence.Id;

public class ScoreTempoCasaResponse {

    private Integer score;

    private Double tempoCasa;

    public ScoreTempoCasaResponse(Voluntario vol) {
        this.score = vol.getScore();
        this.tempoCasa = vol.getTempoCasa();
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
}
