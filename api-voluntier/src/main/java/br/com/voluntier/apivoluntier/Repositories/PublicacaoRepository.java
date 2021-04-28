package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PublicacaoRepository extends JpaRepository<Publicacao, Integer> {

    @Query("select p from Publicacao p where p.evento is not null")
    List<Publicacao> findAllIdEventoNotNull();

    // List<Publicacao> findByEvento(int id);

}
