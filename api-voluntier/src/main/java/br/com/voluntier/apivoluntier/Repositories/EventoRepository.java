package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Integer> {

    @Query("select e from Evento e order by e.id desc")
    List<Evento> findEventoMaxId();

    @Query(value = "select fk_categoria from Evento where id_evento=?1",nativeQuery = true)
    String findCategoria(int id_evento);


}
