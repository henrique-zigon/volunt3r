package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscricaoEventoRepository extends JpaRepository<InscricaoEvento, Integer> {
    long countByFkEvento(int id);

    List<InscricaoEvento> findAllByFkUsuario(int fkUsuario);

    InscricaoEvento findByFkUsuarioAndFkEvento(int fkUsuario,int fkEvento);


}
