package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Classificacao;
import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import br.com.voluntier.apivoluntier.Models.UsuarioEventoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InscricaoEventoRepository extends JpaRepository<InscricaoEvento, Integer> {
    long countByFkEvento(int id);

    List<InscricaoEvento> findAllByFkUsuario(int fkUsuario);

    InscricaoEvento findByFkUsuarioAndFkEvento(int fkUsuario,int fkEvento);


}
