package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/publicacoes")
public class PublicacaoController {

    @Autowired
    PublicacaoRepository repository;
    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping()
    public ResponseEntity getPublicacoes() {
        return ResponseEntity.status(200).body(repository.findAll());
    }

    @PostMapping("/novo")
    public ResponseEntity postPublicacao(@RequestBody Publicacao novaPublicacao) {
        retornoHasmap.clear();
        try {
            repository.save(novaPublicacao);
            retornoHasmap.put("message", "Publicação criada com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }





}
