package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Classificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassificacaoRepository extends JpaRepository<Classificacao,String> {

    @Query(value = "select nome_categoria,count(nome_categoria) as quantidade from Usuario,Inscricao_Evento,Evento,Categoria where id_usuario=fk_usuario and id_evento=fk_evento and id_categoria=fk_categoria and fk_usuario=?1  group by nome_categoria",nativeQuery = true)
    List<Classificacao> FindAllByFkUsuarioAndfkCategoria(int fkUsuario);

}
