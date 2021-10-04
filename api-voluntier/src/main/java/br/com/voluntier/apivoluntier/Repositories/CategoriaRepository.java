package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    List<Categoria> findById(int id);

    @Query("SELECT DISTINCT c.nivel from Categoria c")
    List<String> findUniqueNiveis();

}
