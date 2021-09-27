package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Curso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Integer> {

    @Query("SELECT DISTINCT c.categoria from Curso c")
    List<String> findUniqueCategorias();

    Page<Curso> findByTituloContainsOrDescricaoContainsOrCategoriaContains(String titulo, String descricao, String categoria, Pageable pageable);



}
