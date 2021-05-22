package br.com.voluntier.apivoluntier.Controllers;
import br.com.voluntier.apivoluntier.Models.Jwt;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    private HashMap<String, Object> retornoHasmap = new HashMap<>();
    private List<Usuario> usuariosLogados = new ArrayList<>();

    @Autowired
    private PasswordEncoder passwordEncoder;
    //@Autowired
    //private UserDetailsService userDetailsService;

    Jwt jwtBolado=new Jwt();

    // Endpoint responsável pelo login do usuário
    @PostMapping("/logar")
    public ResponseEntity<HashMap<String, Object>> postLogar(@RequestBody Usuario usuario) {

        jwtBolado=new Jwt();

        retornoHasmap.clear();
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmailAndSenha(usuario.getEmail(), usuario.getSenha());

        List<Usuario> retorno1=(usuarioRepository.findByEmail1(usuario.getEmail()));
        System.out.println(retorno1.isEmpty());
        if (retorno1.isEmpty()){
            retornoHasmap.put("message:", "Usuário e/ou senha incorretos!");
            return ResponseEntity.status(404).body(retornoHasmap);
        }else {
            boolean igual=passwordEncoder.matches(usuario.getSenha(),retorno1.get(0).getSenha());
            if (igual){
                usuariosLogados.add(usuario);
                String token= jwtBolado.createJWT(retorno1.get(0));
                retornoHasmap.put("message", "Usuário logado com sucesso!");
                retornoHasmap.put("Usuario", retornoRepository);

                return ResponseEntity.status(200).header("token",token).body(retornoHasmap);
            }else {
                retornoHasmap.put("message:", "Usuário e/ou senha incorretos!");
                return ResponseEntity.status(404).body(retornoHasmap);
            }

        }

//        if(usuarioRepository.findByEmailAndStatus(usuario.getEmail()).isEmpty()) {
//            retornoHasmap.put("message", "Esse usuário está desativado!");
//            return ResponseEntity.status(400).body(retornoHasmap);
//        } else {
//            retornoHasmap.clear();
//            if (retornoRepository.isEmpty()) {
//                retornoHasmap.put("message:", "Usuário e/ou senha incorretos!");
//                return ResponseEntity.status(404).body(retornoHasmap);
//            } else {
//                usuariosLogados.add(usuario);
//                String token= jwtBolado.createJWT(retornoRepository.get(0));
//                retornoHasmap.put("message", "Usuário logado com sucesso!");
//                retornoHasmap.put("Usuario", retornoRepository);
//
//                return ResponseEntity.status(200).header("token",token).body(retornoHasmap);
//            }
//        }
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
        usuario.setStatusUsuario(1);

        Usuario usuNovo=new Usuario();
        usuNovo.setNomeUsuario(usuario.getNomeUsuario());
        usuNovo.setTipoUsuario(usuario.getTipoUsuario());
        usuNovo.setArea(usuario.getArea());
        usuNovo.setStatusUsuario(usuario.getStatusUsuario());
        usuNovo.setBio(usuario.getBio());
        usuNovo.setCargo(usuario.getCargo());
        usuNovo.setEmail(usuario.getEmail());
        usuNovo.setGenero(usuario.getGenero());
        usuNovo.setQuantidadeMilhas(usuario.getQuantidadeMilhas());
        System.out.println("senha decodificado: "+passwordEncoder.encode(usuario.getSenha()));
        usuNovo.setSenha(passwordEncoder.encode(usuario.getSenha()));

        // Validando se o usuário existe
        if(retornoRepository.isEmpty()) {
            usuarioRepository.save(usuNovo);
            retornoHasmap.put("message:", "Usuario criado com sucesso!");
            return ResponseEntity.status(201).body(retornoHasmap);
        } else {
            retornoHasmap.put("message:", "Esse usuário já existe!");
            return ResponseEntity.status(406).body(retornoHasmap);
        }
    }

    @DeleteMapping("/desativar/{id}")
    public ResponseEntity deleteUsuario(@PathVariable int id,@RequestHeader("token") String token) {
        String resul=jwtBolado.verificarAcesso(token);
        retornoHasmap.clear();
        if (resul.equals("Sem premissão")){
            return ResponseEntity.status(401).body("sem permissão");
        }else {
            try {
                retornoHasmap.put("message", "Usuário desativado com sucesso!");
                usuarioRepository.updateStatusUsuarioById(id);

                return ResponseEntity.status(200).body(retornoHasmap);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(500).build();
            }
        }

    }
}
