package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Gostei;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GosteiRepository extends JpaRepository<Gostei, Integer> {

    long countByFkPublicacao(int id);

    @Query(value = "select * from Gostei where fk_publicacao =?1 and fk_usuario=?2",nativeQuery = true)
    List<Optional<Gostei>> findAllGosteiByFKs1(int fk_publicacao, int fk_usuario);

    @Query(value = "select * from Gostei where fk_publicacao =?1 and fk_usuario=?2",nativeQuery = true)
    Optional<Gostei> findAllGosteiByFKs(int fk_publicacao, int fk_usuario);

}
