package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Views.ViewQuantidadeVoluntarioCategoria;
import br.com.voluntier.apivoluntier.Models.Voluntario;
// import br.com.voluntier.apivoluntier.Responses.DashboardQuantidadeResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DashboardRepository extends JpaRepository<ViewQuantidadeVoluntarioCategoria,String> {

    List<ViewQuantidadeVoluntarioCategoria> findAllByOrderByCategoriaAsc();

}
