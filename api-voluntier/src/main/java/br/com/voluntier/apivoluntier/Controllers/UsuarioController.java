package br.com.voluntier.apivoluntier.Controllers;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    private HashMap<String, Object> retornoHasmap = new HashMap<>();
    private List<Usuario> usuariosLogados = new ArrayList<>();

    // Endpoint responsável pelo login do usuário
    @PostMapping("/logar")
    public ResponseEntity<HashMap<String, Object>> postLogar(@RequestBody Usuario usuario) {
        retornoHasmap.clear();
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmailAndSenha(usuario.getEmail(), usuario.getSenha());

        if(retornoRepository.isEmpty()) {
            retornoHasmap.put("message:", "Usuário e/ou senha incorretos!");
            return ResponseEntity.status(404).body(retornoHasmap);
        } else {
            usuariosLogados.add(usuario);
            retornoHasmap.put("message", "Usuário logado com sucesso!");
            retornoHasmap.put("Usuario", retornoRepository);

            return ResponseEntity.status(200).body(retornoHasmap);
        }

    }

    @GetMapping("/sair/{id}")
    public ResponseEntity getSair(@PathVariable Integer id) {

        retornoHasmap.clear();

        if(id < usuariosLogados.size()) {
            usuariosLogados.remove(id);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/novo")
    public ResponseEntity postCriarUsuario(@RequestBody Usuario usuario) {
        retornoHasmap.clear();
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmail(usuario.getEmail());

        // Validando se o usuário existe
        if(retornoRepository.isEmpty()) {
            usuarioRepository.save(usuario);
            retornoHasmap.put("message:", "Usuario criado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } else {
            retornoHasmap.put("message:", "Esse usuário já existe!");
            return ResponseEntity.status(406).body(retornoHasmap);
        }
    }
}
