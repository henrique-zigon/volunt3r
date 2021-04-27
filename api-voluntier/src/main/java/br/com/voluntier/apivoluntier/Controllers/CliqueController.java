package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Clique;
import br.com.voluntier.apivoluntier.Repositories.CliqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/cliques")
public class CliqueController {


    @Autowired
    CliqueRepository repository;
    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @PostMapping("/novo")
    public ResponseEntity postClique(@RequestBody Clique novoClique) {
        retornoHasmap.clear();
        try {
            repository.save(novoClique);
            retornoHasmap.put("message", "Clique registrado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
