package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.GosteiRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Responses.ComentarioResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Services.S3Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

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

    @GetMapping("/{id}/comentarios")
    public ResponseEntity getComentarios(@PathVariable Integer id, @RequestHeader String Authorization,
                                         @RequestParam(defaultValue = "0") Integer pagina,
                                         @RequestParam(defaultValue = "10") Integer tamanho) {
        String tokenLimpo=Authorization.substring(7,Authorization.length());
        Integer idUsu=tokenService.getIdUsuario(tokenLimpo);

        Publicacao p = new Publicacao();
        p.setId(id);

        Page<ComentarioResponse> comentarios = repository.findByPublicacaoPaiEqualsAndTipoEquals(p,"comentario",
                PageRequest.of(pagina,tamanho));

        if(!comentarios.isEmpty()) {
            comentarios.forEach(comentario -> {
                comentario.isCurtido(idUsu);
            });
            return ResponseEntity.status(200).body(comentarios);
        }else {
            return ResponseEntity.status(204).build();
        }
    }

    @GetMapping()
    public ResponseEntity getFeed(@RequestParam(defaultValue = "0") Integer pagina,
                                  @RequestParam(defaultValue = "10") Integer tamanho,
                                       @RequestHeader String Authorization) {
        String tokenLimpo=Authorization.substring(7,Authorization.length());
        Integer idUsu=tokenService.getIdUsuario(tokenLimpo);
        Page<Publicacao> allPub = repository.findByTipoIsNot("comentario",PageRequest.of(pagina, tamanho));
        if(allPub.isEmpty()) {
            return ResponseEntity.status(204).build();
        } else {
            allPub.forEach(pub -> {
                pub.isCurtido(idUsu);
            });
            return ResponseEntity.status(200).body(allPub);
        }
    }
}
