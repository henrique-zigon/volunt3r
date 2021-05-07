package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscricaoEventoRepository extends JpaRepository<InscricaoEvento, Integer> {
    long countByFkEvento(int id);
}
