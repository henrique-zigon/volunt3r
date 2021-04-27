package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Gostei;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.GosteiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/gostei")
public class GosteiController {

    @Autowired
    GosteiRepository repository;
    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @PostMapping("/novo")
    public ResponseEntity postGostei(@RequestBody Gostei novoGostei) {
        retornoHasmap.clear();
        try {
            repository.save(novoGostei);
            retornoHasmap.put("message", "Gostei registrado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

}
