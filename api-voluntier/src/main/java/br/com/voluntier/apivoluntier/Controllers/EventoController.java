package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.UsuarioEvento;
import br.com.voluntier.apivoluntier.Repositories.EventoRepository;
import br.com.voluntier.apivoluntier.Repositories.UsuarioEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/eventos")
public class EventoController {


    @Autowired
    EventoRepository repository;

    @Autowired
    UsuarioEventoRepository repositoryUsuarioEvento;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping
    public ResponseEntity getEventos() {
        return ResponseEntity.status(200).body(repository.findAll());
    }

    @PostMapping("/novo")
    public ResponseEntity postEvento(@RequestBody Evento novoEvento) {
        retornoHasmap.clear();
        try {
            repository.save(novoEvento);
            retornoHasmap.put("message", "Evento criado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/inscrever")
    public ResponseEntity postUsuarioEvento(@RequestBody UsuarioEvento novaInscricao) {
        retornoHasmap.clear();
        try {
            repositoryUsuarioEvento.save(novaInscricao);
            retornoHasmap.put("message", "usuário inscrito com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

}
