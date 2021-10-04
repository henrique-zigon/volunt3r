package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Responses.Classificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassificacaoRepository extends JpaRepository<Classificacao,String> {

    @Query(value = "select categoria.*,\n" +
            "       CASE\n" +
            "           WHEN cont is null then 0\n" +
            "           ELSE cont\n" +
            "        END contagem,\n" +
            "       CASE\n" +
            "           WHEN cont >= limite_ouro THEN 'OURO'\n" +
            "           WHEN cont >= limite_prata THEN 'PRATA'\n" +
            "           WHEN cont >= limite_bronze THEN 'BRONZE'\n" +
            "           ELSE 'Sem ranque'\n" +
            "END ranque\n" +
            "    from categoria\n" +
            "left join (\n" +
            "    select nome_categoria,\n" +
            "           count(*) as cont\n" +
            "    from (\n" +
            "        select * from inscricao_evento\n" +
            "        left join evento on fk_evento = id_evento\n" +
            "        left join categoria on id_categoria = fk_categoria\n" +
            "        where fk_usuario = ?1\n" +
            "    ) sub\n" +
            "    group by nome_categoria\n" +
            ") sub2 on categoria.nome_categoria = sub2.nome_categoria;\n",nativeQuery = true)
    List<Classificacao> FindAllByFkUsuarioAndfkCategoria(int fkUsuario);

}
