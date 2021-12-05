package br.com.voluntier.apivoluntier.Repositories.Views;

import br.com.voluntier.apivoluntier.Models.Views.ViewHistoricoVoluntario;
import br.com.voluntier.apivoluntier.Responses.ITotalByLabel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViewHistoricoVoluntarioRepository extends JpaRepository<ViewHistoricoVoluntario, Integer> {

    @Query("SELECT hv.perfilComparativo AS label, COUNT(hv) AS total " +
            "FROM ViewHistoricoVoluntario AS hv GROUP BY hv.perfilComparativo ORDER BY hv.perfilComparativo")
    List<ITotalByLabel> countTotalPerfilComparativo();

    @Query("SELECT hv.perfilAno AS label, COUNT(hv) AS total " +
            "FROM ViewHistoricoVoluntario AS hv GROUP BY hv.perfilAno ORDER BY hv.perfilAno")
    List<ITotalByLabel> countTotalPerfilAno();

    @Query("SELECT hv.perfilCompleto AS label, COUNT(hv) AS total " +
            "FROM ViewHistoricoVoluntario AS hv GROUP BY hv.perfilCompleto ORDER BY hv.perfilCompleto")
    List<ITotalByLabel> countTotalPerfilCompleto();
}
