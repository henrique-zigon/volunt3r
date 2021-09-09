package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Gostei;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.GosteiRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/gostei")
public class GosteiController {

    @Autowired
    private GosteiRepository repository;
    @Autowired
    private PublicacaoRepository repositoryPublicacao;
    @Autowired
    private UsuarioRepository repositoryUsuario;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping
    public ResponseEntity getGostei(){
        return ResponseEntity.status(200).body(repository.findAll());
    }

    @PostMapping
    public ResponseEntity postGostei(@RequestBody Gostei novoGostei) {
        retornoHasmap.clear();
        Optional<Gostei> gosteiExistente;
        Optional<Publicacao> publiExistente;
        Optional<Usuario> usuExistente;
        try {
            gosteiExistente=repository.findAllGosteiByFKs(novoGostei.getFkPublicacao().getId(),novoGostei.getFkUsuario().getIdUsuario());
            publiExistente=repositoryPublicacao.findById(novoGostei.getFkPublicacao().getId());
            usuExistente=repositoryUsuario.findById(novoGostei.getFkUsuario().getIdUsuario());
        }
        catch (Exception e){
            return  ResponseEntity.status(500).body("Parâmetros incorretos ou inexistentes");
        }

        if(!publiExistente.isPresent() || !usuExistente.isPresent()){
            retornoHasmap.put("message","Parâmetros não encontrados");
            return ResponseEntity.status(400).body(retornoHasmap);
        } else if(gosteiExistente.isPresent()) {
            retornoHasmap.put("message", "Você ja gostou dessa publicação");
            return ResponseEntity.status(400).body(retornoHasmap);
        }

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
            List<Optional<Gostei>>gosteiExistente;
            try {
                gosteiExistente=repository.findAllGosteiByFKs1(gosteiAtingido.getFkPublicacao().getId(),gosteiAtingido.getFkUsuario().getIdUsuario());
            }catch (Exception e1){
                return ResponseEntity.status(500).body(e1.getMessage());
            }
            if (gosteiExistente.size()>1){
                retornoHasmap.put("message","duplicidade de gostei");
            } else if (!gosteiExistente.isEmpty()){
                repository.delete(gosteiExistente.get(0).get());
                retornoHasmap.put("message", "Gostei removido com sucesso!");
            }else {
                retornoHasmap.put("message","Gostei não encontrado");
            }
            return ResponseEntity.status(201).body(retornoHasmap);
        }catch (Exception e){
            return ResponseEntity.status(500).build();
        }

    }

}
