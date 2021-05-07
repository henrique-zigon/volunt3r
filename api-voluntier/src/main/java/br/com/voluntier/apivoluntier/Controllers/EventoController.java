package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import br.com.voluntier.apivoluntier.Repositories.EventoRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Repositories.InscricaoEventoRepository;
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
    InscricaoEventoRepository repositoryUsuarioEvento;

    @Autowired
    PublicacaoRepository repositoryPublicacao;

    @Autowired
    private JavaMailSender mailSender;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping
    public ResponseEntity getEventos() {
        return ResponseEntity.status(200).body(repositoryPublicacao.findAllIdEventoNotNull());
    }

    @GetMapping("/enviarEMAIL")
    public String sendMail() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText("VAI SE FUDER EMAILZADA ARROMBADO");
        message.setSubject("Teste ÉOKRL");
        message.setTo("murilo@casmala.com.br");
        message.setFrom("211-3cco-grupo4@bandtec.com.br");

        try {
            mailSender.send(message);
            return "Email enviado com sucesso!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao enviar email.";
        }
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
        try {
            repositoryPublicacao.save(novaPublicacaoEvento);
            retornoHasmap.put("message", "Evento criado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }

    }

    @PostMapping("/inscrever")
    public ResponseEntity postUsuarioEvento(@RequestBody InscricaoEvento novaInscricao) {
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
