package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import br.com.voluntier.apivoluntier.Models.Usuario;
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
    FilaObj<Usuario> listaEmail = new FilaObj<>(10);

    @Autowired
    EventoRepository repository;

    @Autowired
    InscricaoEventoRepository repositoryInscricaoEvento;

    @Autowired
    PublicacaoRepository repositoryPublicacao;

    @Autowired
    EmailSender emailSender;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    /*
    A lógica que eu imagino aqui é a seguinte:
        Coletar todos os inscritos pro evento, e notificá-los baseado em algo
        Exemplo: 2 dias antes do evento acontecer de fato
        Ai no caso, vamos usar fila, então vamos primeiro coletar as infos de inscricaoEvento
        Resumindo o cron abaixo:
            De segunda a sexta, toda vez que der o horário 8:30:00 nós iremos rodar essa função
         ┌───────────── second (0-59)
         │ ┌───────────── minute (0 - 59)
         │ │ ┌───────────── hour (0 - 23)
         │ │ │ ┌───────────── day of the month (1 - 31)
         │ │ │ │ ┌───────────── month (1 - 12) (or JAN-DEC)
         │ │ │ │ │ ┌───────────── day of the week (0 - 7)
         │ │ │ │ │ │          (0 or 7 is Sunday, or MON-SUN)
         │ │ │ │ │ │
         * * * * * *
     */
    @Scheduled(cron="0 30 8 * * MON-FRI")
    //@Scheduled(fixedDelay = 1000*60)
    public void enviarEmails() {
        while(!listaEmail.isEmpty()) {
            Usuario user = listaEmail.poll();
            if(emailSender.sendMessage(
                    "Titulo badass",
                    "MEnsagem sobre evento braba",
                    user.getEmail()
            )) {
                System.out.println("Email enviado com sucesso!");
            }else {
                System.out.println("Erro ao enviar email.");
            }
        }
    }

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

}
