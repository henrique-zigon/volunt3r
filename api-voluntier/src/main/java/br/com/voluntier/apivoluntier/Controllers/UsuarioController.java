package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Jwt;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Services.S3Services;
import br.com.voluntier.apivoluntier.Utils.LoginForm;
import br.com.voluntier.apivoluntier.Utils.TokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.io.IOException;
import java.util.*;

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

    @Autowired
    private S3Services s3Services;

    @GetMapping
    public ResponseEntity listar(){
        return ResponseEntity.status(200).body(usuarioRepository.findAll());
    }

    @PostMapping("/login")
    public ResponseEntity autentificar(@RequestBody LoginForm form){
        UsernamePasswordAuthenticationToken dadosLogin= form.converter();
        try{
            List<UsuarioResponse> usuarioResponse = usuarioRepository.findByEmail
                    (dadosLogin.getPrincipal().toString());
            if(usuarioResponse.isEmpty()) {
                return ResponseEntity.status(404).build();
            }
            Authentication authentication = authManager.authenticate(dadosLogin);
            String token= tokenService.gerarToken(authentication);
            retornoHasmap.put("token", new TokenDto(token, "Bearer"));
            retornoHasmap.put("user",usuarioResponse.get(0));
            return ResponseEntity.ok(retornoHasmap);
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

    @PostMapping(path="/novo", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postCriarUsuario(@RequestPart MultipartFile imagemPerfil,
                                            @RequestPart MultipartFile imagemCapa,
                                            @RequestPart Usuario usuario) throws IOException {
        retornoHasmap.clear();

        String filenamePerfil = imagemPerfil.getOriginalFilename();
        String namePerfil = new Date().getTime()+"."+filenamePerfil.substring(filenamePerfil.lastIndexOf(".")+1);
        s3Services.uploadFile(namePerfil,imagemPerfil);

        String filenameCapa = imagemCapa.getOriginalFilename();
        String nameCapa = new Date().getTime()+"."+filenameCapa.substring(filenameCapa.lastIndexOf(".")+1);
        s3Services.uploadFile(nameCapa,imagemCapa);

        // Validando se o e-mail já foi cadastrado
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmail(usuario.getEmail());
        if(!retornoRepository.isEmpty()) {
            retornoHasmap.put("message:", "Esse e-mail já está cadastrado!");
            return ResponseEntity.status(406).body(retornoHasmap);
        }

        Usuario usuNovo=new Usuario();
        usuNovo.setNomeUsuario(usuario.getNomeUsuario());
        usuNovo.setTipoUsuario(usuario.getTipoUsuario());
        usuNovo.setArea(usuario.getArea());
        usuNovo.setStatusUsuario(1);
        usuNovo.setBio(usuario.getBio());
        usuNovo.setCargo(usuario.getCargo());
        usuNovo.setEmail(usuario.getEmail());
        usuNovo.setGenero(usuario.getGenero());
        usuNovo.setQuantidadeMilhas(0);
        usuNovo.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        usuNovo.setUsuarioImagemPerfil(namePerfil);
        usuNovo.setUsuarioImagemCapa(nameCapa);

        usuarioRepository.save(usuNovo);
        retornoHasmap.put("message:", "Usuario criado com sucesso!");
        return ResponseEntity.status(201).body(retornoHasmap);
    }

    @PostMapping("/email-existente/{email}")
    public ResponseEntity getEmailExistente(@PathVariable String email){
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmail(email);
        if(retornoRepository.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).build();
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
