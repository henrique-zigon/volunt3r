package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.EventoRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Repositories.InscricaoEventoRepository;
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
    InscricaoEventoRepository repositoryInscricaoEvento;

    @Autowired
    PublicacaoRepository repositoryPublicacao;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping
    public ResponseEntity getEventos() {
        return ResponseEntity.status(200).body(repositoryPublicacao.findAllIdEventoNotNull());
    }

    @PostMapping("/novo")
    public ResponseEntity postPublicacaoEvento(@RequestBody Publicacao novaPublicacaoEvento) {
        try {
            repositoryPublicacao.save(novaPublicacaoEvento);
            retornoHasmap.put("message", "Evento criado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }

    }

    @PostMapping("/inscrever")
    public ResponseEntity postUsuarioEvento(@RequestBody InscricaoEventoRepository novaInscricao) {
        retornoHasmap.clear();
        try {
            //repositoryInscricaoEvento.save(novaInscricao);
            retornoHasmap.put("message", "usuário inscrito com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

}
