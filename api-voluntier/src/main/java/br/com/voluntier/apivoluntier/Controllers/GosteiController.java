package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Gostei;
import br.com.voluntier.apivoluntier.Repositories.GosteiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/gostei")
public class GosteiController {

    @Autowired
    private GosteiRepository repository;


    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping
    public ResponseEntity getGostei(){
        return ResponseEntity.status(200).body(repository.findAll());
    }

    @PostMapping
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

    @DeleteMapping
    public ResponseEntity deleteGostei(@RequestBody Gostei gosteiAtingido){
        retornoHasmap.clear();
        try{
            repository.delete(gosteiAtingido);
            retornoHasmap.put("message", "Gostei removido com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        }catch (Exception e){
            return ResponseEntity.status(500).build();
        }

    }

}
