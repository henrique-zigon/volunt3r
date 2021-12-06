package br.com.voluntier.apivoluntier.Repositories.Views;

import br.com.voluntier.apivoluntier.Models.Views.ViewAderenciaEventos;
import br.com.voluntier.apivoluntier.Models.Views.ViewHistoricoVoluntario;
import br.com.voluntier.apivoluntier.Responses.ITotalByLabel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViewAderenciaEventosRepository extends JpaRepository<ViewAderenciaEventos, Integer> {
}
