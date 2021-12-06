package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Jwt;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Services.S3Services;
import br.com.voluntier.apivoluntier.Utils.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
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

    @Autowired
    EmailSender emailSender;

    @Autowired
    JSONStringConverterToUsuario jsonStringConverterToUsuario;

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
    public ResponseEntity postCriarUsuario(@RequestParam(required = false) Optional<MultipartFile> imagemPerfil,
                                            @RequestParam(required = false) Optional<MultipartFile> imagemCapa,
                                            @RequestParam(value = "usuario") String usuarioJson) throws IOException {
        retornoHasmap.clear();
        Usuario usuario = jsonStringConverterToUsuario.convert(usuarioJson);
        // Validando se o e-mail já foi cadastrado
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmail(usuario.getEmail());
        if(!retornoRepository.isEmpty()) {
            retornoHasmap.put("message:", "Esse e-mail já está cadastrado!");
            return ResponseEntity.status(406).body(retornoHasmap);
        }

        if(usuario.getSenha().equals("")) {
            //Dispara e-mail com a senha temporária
            System.out.println("Alooo");
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
        usuNovo.setUsuarioImagemPerfil(null);
        usuNovo.setUsuarioImagemCapa(null);

        if(imagemPerfil.isPresent()) {
            MultipartFile imagemPerfilUpload = imagemPerfil.get();
            String filenamePerfil = imagemPerfilUpload.getOriginalFilename();
            String namePerfil = new Date().getTime()+"_"+filenamePerfil;
            s3Services.uploadFile(namePerfil,imagemPerfilUpload);
            usuNovo.setUsuarioImagemPerfil(namePerfil);
        }

        if(imagemCapa.isPresent()) {
            MultipartFile imagemCapaUpload = imagemCapa.get();
            String filenameCapa = imagemCapaUpload.getOriginalFilename();
            String nameCapa = new Date().getTime()+"_"+filenameCapa;
            s3Services.uploadFile(nameCapa,imagemCapaUpload);
        }

        usuarioRepository.save(usuNovo);
        retornoHasmap.put("message:", "Usuario criado com sucesso!");
        return ResponseEntity.status(201).body(retornoHasmap);
    }

    public String createJWT(String email) {
        String token = "";
        Calendar date = Calendar.getInstance();
        Date dataLimite = new Date(date.getTimeInMillis() + (3600000));

        token = Jwts.builder()
                .setIssuer("recuperarSenha")
                .setSubject(email)
                .setExpiration(dataLimite)
                .signWith(SignatureAlgorithm.HS256, "secreto").compact();
        return token;
    }


    @PostMapping("/email-existente/{email}")
    public ResponseEntity postEmailExistente(@PathVariable String email){
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmail(email);
        if(retornoRepository.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        String linkFrontEnd = "http://volunt3r.ddns.net/recuperar-senha-redefinir/";
        String token = createJWT(email);
        String linkCompleto = linkFrontEnd+token;

        emailSender.sendMessage(
                "Volunt3r - Recuperação de Senha",
                "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\"><head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/> <title>E-mail Recuperação de senha</title> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/> <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"> <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin> <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap\" rel=\"stylesheet\"></head><body style=\"margin: 0; padding: 0; font-family: 'Poppins', sans-serif;\"> <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"800\" style=\"border-collapse: collapse; border: none;\"> <tr style=\"position: relative;\"> <td align=\"center\" style=\"padding: 40px 0 30px 0;\"> <img src=\"bloob1.svg\" style=\"position: absolute; top: 0; right: 0; width: 150px;\"> <img src=\"logo_voluntier.svg\" alt=\"Criando Mágica de E-mail\" width=\"50\" height=\"50\" style=\"display: block;\"/> </td></tr><tr> <td align=\"center\"> <span style=\"font-size: 1rem;\">Olá, <b>Gabriel Ronny</b></span> <br><span style=\"font-size: 0.8rem;\">Vamos Recuperar a sua senha</span> </td></tr><tr> <td align=\"center\" style=\"height: 120px;\"> <a href=\""+linkCompleto+"\" > <button style=\"background: #06377B; width: 400px; height: 50px; color: white; border: none; font-family: 'Poppins', sans-serif; cursor: pointer;\"> Recuperar senha </button> </a> </td></tr><tr style=\"position: relative;\"> <td align=\"center\"> <span>Algo deu errado? <a href=\""+linkCompleto+"\" style=\"color: #06377B; text-decoration: none;\">clique aqui</a></span> <img src=\"bloob2.svg\" style=\"position: absolute; bottom: 0; left: 0; width: 150px;\"> </td></tr></table></body></html>",
                email
        );
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/validarToken/{token}")
    public ResponseEntity postValidarToken(@PathVariable String token){

        try {
            Jwts.parser().setSigningKey("secreto").parseClaimsJws(token);
            return ResponseEntity.status(200).build();
        }
        catch (Exception e){
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/updateSenha")
    public ResponseEntity updateSenha(@RequestBody SenhaForm senhaForm){
        try {
            String email = "";
            String senhaSecreta = new BCryptPasswordEncoder().encode(senhaForm.getSenha());

            Claims claims=Jwts.parser().setSigningKey("secreto").parseClaimsJws(senhaForm.getToken()).getBody();
            email= claims.getSubject();

            usuarioRepository.updateSenhaUsuarioByEmail(senhaSecreta, email);
        }
        catch (Exception e){
            return ResponseEntity.status(500).build();
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

    //get para teste
    @GetMapping("/usuario/{id}")
    public ResponseEntity getUsuario(@PathVariable int id){
        return ResponseEntity.status(200).body(usuarioRepository.findById(id));
    }
}
