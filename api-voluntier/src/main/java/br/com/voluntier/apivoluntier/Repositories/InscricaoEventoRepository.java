package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import br.com.voluntier.apivoluntier.Models.UsuarioEventoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InscricaoEventoRepository extends JpaRepository<InscricaoEvento, Integer> {
    long countByFkEvento(int id);

    List<InscricaoEvento> findAllByFkUsuario(int fkUsuario);

    InscricaoEvento findByFkUsuarioAndFkEvento(int fkUsuario,int fkEvento);

    @Query(value = "select nome_categoria,count(nome_categoria) from Usuario,Inscricao_Evento,Evento,Categoria where id_usuario=fk_usuario and id_evento=fk_evento and id_categoria=fk_categoria and fk_usuario=?1  group by nome_categoria",nativeQuery = true)
    List<UsuarioEventoCategoria> FindAllByFkUsuarioAndfkCategoria(int fkUsuario);
}
