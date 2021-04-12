package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {

    List<Comentario> findByFkPublicacao(int idPublicacao);

    void deleteComentarioByFkPublicacaoAndFkUsuario(int idUsuario, int idPostagem);

}
