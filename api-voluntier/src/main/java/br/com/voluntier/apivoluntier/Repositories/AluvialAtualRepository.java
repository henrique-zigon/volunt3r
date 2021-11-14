package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Views.ViewAluvialAtual;
import br.com.voluntier.apivoluntier.Responses.AluvialAtualResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AluvialAtualRepository extends JpaRepository<ViewAluvialAtual,String> {

//    @Query(value = "select ano2020,ano2021,contador from Voluntario group by ano2020,ano2021",nativeQuery = true)
//    List<ViewAluvialAtual> getAluvialAtual();

    //List<ViewAluvialAtual> findAllByOrderByIdAsc();
}
