package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Views.ViewAluvialAtual;
import br.com.voluntier.apivoluntier.Models.Views.ViewAluvialPassado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AluvialPassadoRepository extends JpaRepository<ViewAluvialPassado,String> {

//    @Query(value = "select ano2019,ano2020,count(*) as contador from Voluntario group by ano2019,ano2020",nativeQuery = true)
//    List<ViewAluvialPassado> getAluvialPassado();

}
