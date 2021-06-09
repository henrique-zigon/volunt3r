package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Jwt;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Utils.LoginForm;
import br.com.voluntier.apivoluntier.Utils.TokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private UserDetailsService userDetailsService;

    Jwt jwtBolado=new Jwt();
    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> autentificar(@RequestBody LoginForm form){
        UsernamePasswordAuthenticationToken dadosLogin= form.converter();
        try{
            Authentication authentication = authManager.authenticate(dadosLogin);

            String token= tokenService.gerarToken(authentication);
            System.out.println("TOKEN: "+ token);
            return ResponseEntity.ok(new TokenDto(token, "Bearer"));
        }
        catch (AuthenticationException e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).build();
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
        usuNovo.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        usuNovo.setUsuarioImagemPerfil(usuario.getUsuarioImagemPerfil());
        usuNovo.setUsuarioImagemCapa(usuario.getUsuarioImagemCapa());

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
