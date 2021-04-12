package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Comentario;
import br.com.voluntier.apivoluntier.Repositories.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/comentario")
public class ComentarioController {

    @Autowired
    private ComentarioRepository comentarioRepository;
    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    // Criando um novo comentário
    @PostMapping("/novo")
    public ResponseEntity postComentario(Comentario novoComentario) {
        try {
            retornoHasmap.clear();
            retornoHasmap.put("message", "Comentário criado com sucesso!");
            comentarioRepository.save(novoComentario);
            return ResponseEntity.status(204).body(novoComentario);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }

    }

    // Buscando os comentários de uma postagem expecífica
    @GetMapping("/{idPostagem}")
    public ResponseEntity getComentariosPostagem(@PathVariable int idPostagem) {
        return ResponseEntity.status(200).body( comentarioRepository.findByFkPublicacao(idPostagem));
    }

    @DeleteMapping
    public ResponseEntity deleteComentarioPostagem(@RequestParam int idPostagem,
                                                   @RequestParam int idUsuario) {
        try {
            retornoHasmap.clear();
            comentarioRepository.deleteComentarioByFkPublicacaoAndFkUsuario(idUsuario, idPostagem);
            retornoHasmap.put("message", "Comentário excluído com sucesso!");
            return ResponseEntity.status(200).body(retornoHasmap);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
