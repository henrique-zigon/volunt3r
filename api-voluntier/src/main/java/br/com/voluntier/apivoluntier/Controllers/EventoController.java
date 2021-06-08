package br.com.voluntier.apivoluntier.Controllers;


import br.com.voluntier.apivoluntier.Models.Evento;
import br.com.voluntier.apivoluntier.Models.InscricaoEvento;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.*;
import br.com.voluntier.apivoluntier.Responses.UsuarioSimplesResponse;
import br.com.voluntier.apivoluntier.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    @Autowired
    private UsuarioRepository usuarioRepository;

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
        Evento evento = repository.findById(novaInscricao.getFkEvento()).get();
        for(InscricaoEvento inscricao : evento.getInscritos()) {
            if(inscricao.getFkUsuario() == novaInscricao.getFkUsuario())
                return ResponseEntity.status(400).body("Você já está inscrito neste evento");
        }
        try {
            if(evento.getNumeroInscritos() == evento.getMaximoParticipantes())
                return ResponseEntity.status(400).body("Número de inscritos já atingido");

            repositoryInscricaoEvento.save(novaInscricao);
            EmailService.listaEmail.insert(novaInscricao);
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

    @GetMapping("/{id}/inscritos")
    public ResponseEntity getInscritos(@PathVariable Integer id) {
        Evento evento = repository.findById(id).get();
        List<Integer> lista = new ArrayList<>();
        for(InscricaoEvento ie : evento.getInscritos()) {
            lista.add(ie.getFkUsuario());
        }
        List<UsuarioSimplesResponse> listaUsuario = usuarioRepository.pesquisarTodosIds(lista);
        if(!listaUsuario.isEmpty()) {
            return ResponseEntity.status(200).body(listaUsuario);
        }else {
            return ResponseEntity.status(204).build();
        }
    }

}
