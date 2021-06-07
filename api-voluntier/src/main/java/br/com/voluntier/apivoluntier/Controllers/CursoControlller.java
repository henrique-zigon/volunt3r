package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Curso;
import br.com.voluntier.apivoluntier.Repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cursos")
public class CursoControlller {
    @Autowired
    private CursoRepository repository;
    @GetMapping
    public ResponseEntity getCursos() {
        List<Curso> listaCursos = repository.findAll();
        if(!listaCursos.isEmpty()) {
            return ResponseEntity.status(200).body(listaCursos);
        }else {
            return ResponseEntity.status(204).build();
        }
    }

    @PostMapping
    public ResponseEntity postCurso(@RequestBody Curso novoCurso) {
        repository.save(novoCurso);
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCurso(@PathVariable Integer id) {
        Optional<Curso> cursoOptional = repository.findById(id);
        if(cursoOptional.isPresent()) {
            repository.deleteById(id);
            return ResponseEntity.status(200).build();
        }else {
            return ResponseEntity.status(404).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity putMapping(@PathVariable Integer id,
                                     @RequestBody Curso curso) {
        Optional<Curso> cursoOptional = repository.findById(id);
        if(cursoOptional.isPresent()) {
            curso.setId(id);
            repository.save(curso);
            return ResponseEntity.status(200).build();
        }else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/categorias")
    public ResponseEntity getCategorias() {
        return ResponseEntity.status(200).body(repository.findUniqueCategorias());
    }
}
