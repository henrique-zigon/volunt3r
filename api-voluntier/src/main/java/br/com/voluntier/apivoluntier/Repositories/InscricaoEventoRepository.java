package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InscricaoEventoRepository extends JpaRepository<InscricaoEvento, Integer> {
    long countByFkEvento(int id);

    List<InscricaoEvento> findAllByFkUsuario(int fkUsuario);

//    InscricaoEvento findByFkUsuarioAndFkEvento(int fkUsuario,int fkEvento);

    @Query(value = "select * from inscricao_evento where fk_usuario=?1 and fk_evento=?2",nativeQuery = true)
    InscricaoEvento findByFkUsuarioAndFkEvento(int fkUsuario,int fkEvento);
}
