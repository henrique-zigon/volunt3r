package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import br.com.voluntier.apivoluntier.Repositories.EventoRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Repositories.InscricaoEventoRepository;
import br.com.voluntier.apivoluntier.Utils.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

    @Autowired
    EmailSender emailSender;

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


    @GetMapping("/enviar-email")
    public String sendMail() {
        if(emailSender.sendMessage(
                "Titulo badass",
                "MEnsagem sobre evento braba",
                "ygor.lima@bandtec.com.br"
        )) {
            return "Email enviado com sucesso!";
        }else {
            return "Erro ao enviar email.";
        }
    }

    @PostMapping("/novo")
    public ResponseEntity postPublicacaoEvento(@RequestBody Publicacao novaPublicacaoEvento) {
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
        try {
            repositoryInscricaoEvento.save(novaInscricao);
            retornoHasmap.put("message", "usuário inscrito com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

}
