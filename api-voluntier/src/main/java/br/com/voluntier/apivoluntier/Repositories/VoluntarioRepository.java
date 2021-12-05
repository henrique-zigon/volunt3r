package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Views.Voluntario;
import br.com.voluntier.apivoluntier.Responses.ScoreTempoCasaResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VoluntarioRepository extends JpaRepository<Voluntario ,Integer> {

    @Query("select v from Voluntario as v")
    List<ScoreTempoCasaResponse> findAllScore();
}
