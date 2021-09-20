package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Curso;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.CursoRepository;
import br.com.voluntier.apivoluntier.Services.S3Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/*
TODO
 -Fazer filtros de cursos
 -Fazer paginação (Utilizar limit 10 offset x*10)
 */

@RestController
@RequestMapping("/cursos")
public class CursoControlller {
    @Autowired
    private CursoRepository repository;
    @Autowired
    private S3Services s3Services;

    @GetMapping
    public ResponseEntity getCursos(@RequestParam(defaultValue = "0") Integer pagina,
                                    @RequestParam(defaultValue = "10") Integer tamanho) {
        Page<Curso> listaCursos = repository.findAll(PageRequest.of(pagina, tamanho));
        if(!listaCursos.isEmpty()) {
            return ResponseEntity.status(200).body(listaCursos);
        }else {
            return ResponseEntity.status(204).build();
        }
    }

    @PostMapping()
    public ResponseEntity postCurso(@RequestPart Curso novoCurso, @RequestPart MultipartFile arquivo) throws IOException {
        String filename = arquivo.getOriginalFilename();
        String name = new Date().getTime()+"."+filename.substring(filename.lastIndexOf(".")+1);
        s3Services.uploadFile(name,arquivo);

        novoCurso.setImagem(name);
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
