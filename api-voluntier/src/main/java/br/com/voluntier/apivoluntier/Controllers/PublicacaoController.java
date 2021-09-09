package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Gostei;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.GosteiRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Responses.ComentarioResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Services.S3Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/*
TODO Acho importante freezar que devem estar todas as funcionalidades de um feed
 -Fazer filtros em publicações
 -Fazer paginação
 -Implementar hashtags (Dá para fazer um like %#hashtag% e funciona,
   e aqui no back a gente tira todos os hashtags e envia uma lista pro front

 */
@RestController
@RequestMapping("/publicacoes")
public class PublicacaoController {
    @Autowired
    S3Services s3Services;
    @Autowired
    PublicacaoRepository repository;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @Autowired
    TokenService tokenService;

    @Autowired
    GosteiRepository repositoryGostei;

//    @GetMapping()
//    public ResponseEntity getPublicacoes() {
//        return ResponseEntity.status(200).body(repository.findAll()
//                .stream()
//                .filter(publicacao -> !publicacao.isComentario())
//                .collect(Collectors.toList()));
//    }

    @GetMapping("/{usuario}")
    public ResponseEntity getPublicacoes(@RequestHeader String Authorization) {
        Integer idUsu=null;
        String tokenLimpo=Authorization.substring(7,Authorization.length());
        try{
            List<Publicacao> listaPubl=repository.findAll();
            idUsu =tokenService.getIdUsuario(tokenLimpo);
            for(Publicacao pub : listaPubl){
                pub.isCurtido(idUsu);
            }
            return ResponseEntity.status(200).body(listaPubl
                    .stream()
                    .filter(publicacao -> !publicacao.isComentario())
                    .collect(Collectors.toList()));
        }catch (Exception e){
            return ResponseEntity.status(500).body("Erro ao trazer publicações");
        }
    }

//    @GetMapping("/{usuario}")
//    public ResponseEntity getPublicacoes(@PathVariable int usuario) {
//        List<Publicacao> listaPubl=repository.findAll();
//        for(Publicacao pub : listaPubl){
//            pub.isCurtido(usuario);
//        }
//        return ResponseEntity.status(200).body(listaPubl
//                .stream()
//                .filter(publicacao -> !publicacao.isComentario())
//                .collect(Collectors.toList()));
//    }

    @PostMapping(path="/novo", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postPublicacao(@RequestPart MultipartFile arquivo,
                                         @RequestPart Publicacao novaPublicacao)  throws IOException {
        String filename = arquivo.getOriginalFilename();
        String name = new Date().getTime()+"."+filename.substring(filename.lastIndexOf(".")+1);
        s3Services.uploadFile(name,arquivo);
        novaPublicacao.setPathImagem(name);
        retornoHasmap.clear();
        try {
            repository.save(novaPublicacao);
            retornoHasmap.put("message", "Publicação criada com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }
    }

//    @PostMapping("/eventos/novo")
//    public ResponseEntity postPublicacaoEvento(@RequestBody Publicacao novaPublicacaoEvento) {
//        try {
//            repository.save(novaPublicacaoEvento);
//            retornoHasmap.put("message", "Evento criado com sucesso!");
//            return ResponseEntity.status(201).body(retornoHasmap);
//        } catch (Exception e) {
//            return ResponseEntity.status(401).build();
//        }
//
//    }
    @DeleteMapping("/remover/{id}")
    public ResponseEntity deletePublicacao(@PathVariable int id) {

        retornoHasmap.clear();
        if(!repository.findById(id).isPresent()) {
            retornoHasmap.put("message", "Publicação não existe!");
            return ResponseEntity.status(404).body(retornoHasmap);
        } else {
            try {
                retornoHasmap.put("message", "Publicação removida com sucesso!");
                repository.deleteById(id);
                return ResponseEntity.status(200).body(retornoHasmap);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(500).build();
            }
        }
    }

    @GetMapping("/{id}/{comentarios}")
    public ResponseEntity getComentarios(@PathVariable Integer id) {
        Publicacao p = new Publicacao();
        p.setId(id);
        List<ComentarioResponse> comentarios = repository.findAllByPublicacaoPai(p);
        if(!comentarios.isEmpty()) {
            return ResponseEntity.status(200).body(comentarios);
        }else {
            return ResponseEntity.status(204).build();
        }
    }
}
