package br.com.voluntier.apivoluntier.Responses;

import br.com.voluntier.apivoluntier.Models.Views.Voluntario;

public class ScoreTempoCasaResponse {

    private Double score;

    private Double tempoCasa;

    public ScoreTempoCasaResponse(Voluntario vol) {
        this.score = vol.getScore();
        //this.tempoCasa = vol.getTempoCasa();
    }


    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Double getTempoCasa() {
        return tempoCasa;
    }

    public void setTempoCasa(Double tempoCasa) {
        this.tempoCasa = tempoCasa;
    }
}
