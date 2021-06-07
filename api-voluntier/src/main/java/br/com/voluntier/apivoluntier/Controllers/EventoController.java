package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.CategoriaRepository;
import br.com.voluntier.apivoluntier.Repositories.EventoRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Repositories.InscricaoEventoRepository;
import br.com.voluntier.apivoluntier.Utils.EmailSender;
import br.com.voluntier.apivoluntier.Utils.FilaObj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/eventos")
public class EventoController {
    @Autowired
    private EventoRepository repository;

    @Autowired
    private InscricaoEventoRepository repositoryInscricaoEvento;

    @Autowired
    private PublicacaoRepository repositoryPublicacao;

    @Autowired
    private CategoriaRepository categoriaRepository;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping
    public ResponseEntity getEventos() {
        return ResponseEntity.status(200).body(repositoryPublicacao.findAllIdEventoNotNull());
    }


//    @PostMapping("/novo")
//    public ResponseEntity postEvento(@RequestBody Evento novoEvento) {
//        retornoHasmap.clear();
//        try {
//            //repository.save(novoEvento);
//            retornoHasmap.put("message", "Evento criado com sucesso!");
//
//            return ResponseEntity.status(201).body(repository.findEventoMaxId().get(0).getId());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//    }

    @PostMapping("/novo")
    public ResponseEntity postPublicacaoEvento(@RequestBody Publicacao novaPublicacaoEvento) {
        repository.save(novaPublicacaoEvento.getEvento());

        try {
            repositoryPublicacao.save(novaPublicacaoEvento);
            retornoHasmap.put("message", "Evento criado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/inscrever")
    public ResponseEntity postInscricaoEvento(@RequestBody InscricaoEvento novaInscricao) {
        retornoHasmap.clear();
        //Fazer verificação se já bateu o número máximo de inscritos
        try {
            repositoryInscricaoEvento.save(novaInscricao);
            retornoHasmap.put("message", "usuário inscrito com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/categorias")
    public ResponseEntity getCategorias() {
        return ResponseEntity.status(200).body(categoriaRepository.findAll());
    }

    @GetMapping("/niveis")
    public ResponseEntity getNiveis() {
        return ResponseEntity.status(200).body(categoriaRepository.findUniqueNiveis());
    }

}
