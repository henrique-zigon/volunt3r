package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Jwt;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Services.S3Services;
import br.com.voluntier.apivoluntier.Utils.EmailSender;
import br.com.voluntier.apivoluntier.Utils.LoginForm;
import br.com.voluntier.apivoluntier.Utils.TokenDto;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
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

    public String createJWT() {
        String token = "";
        Calendar date = Calendar.getInstance();
        Date dataLimite = new Date(date.getTimeInMillis() + (600000));

        Algorithm algorithm = Algorithm.HMAC256("secreto");
        token = JWT.create()
                .withIssuer("recuperarSenha")
                .withExpiresAt(dataLimite)
                .sign(algorithm);
        return token;
    }


    @PostMapping("/email-existente/{email}")
    public ResponseEntity postEmailExistente(@PathVariable String email){
        List<UsuarioResponse> retornoRepository = usuarioRepository.findByEmail(email);
        if(retornoRepository.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        String linkFrontEnd = "http//localhost:3000/recuperar-senha-redefinir/";
        String token = createJWT();
        String linkCompleto = linkFrontEnd+token;

        emailSender.sendMessage(
                "Volunt3r - Recuperação de Senha",
                "<body style=\"background-color: #F0F0F5;\"><div style=\"margin-top: 30px;background-color: #FFFFFF;height: 900px;border-radius: 100px;\"> <div style=\"padding-top: 10px;display: flex;margin: 0;position: absolute;left: 50%;transform: translate(-50%);\"><img style=\"margin-left: 30px;width: 150px;height: 150px;\" src=\"logo volunt3r.png\" alt=\"\"><h2 style=\"color: #06377B;font-family: 'Poppins', sans-serif;font-weight: 600;font-size: 50px;padding-top: 40px;margin-left: 120px;position: absolute;\">olunt3r</h2></div><div style=\"margin-top: 180px;margin-left: 10%;margin-right: 10%;background-color: #06377B;border-radius: 50px;height: 650px;width: 80%;display: flex;display: inline-block;\"><div style=\"width: 100%;display: flex;height: 150px;\"><h2 style=\"color: #FFFFFF;font-family: 'Poppins', sans-serif;font-weight: 600;font-size: 50px;margin-left: 8%;\">Recuperação de Senha</h2><span style=\"font-size: 100px;margin-left: 5%;transform: scaleX(-1)\">\uD83D\uDD11</span></div><div style=\"margin-left: 10%;width: 100%;display: flex;display: inline-block;\"><h2 style=\"color: #FFFFFF;font-family: 'Poppins', sans-serif;font-weight: 500;font-size: 30px;margin-left: 18%;\">Olá, Voluntariado. <br> Esqueceu sua senha?</h2><div style=\"display: flex;display: inline-flex;margin-left: 18%;width: 100%;\"><h2 style=\"margin-top: 50px;color: #FFFFFF;font-family: 'Poppins', sans-serif;font-weight: 500;font-size: 30px;\">Não se preocupe, <br> podemos te ajudar!</h2><span style=\"font-size: 100px;margin-left: 5%;margin-top: 15px;\">\uD83D\uDE09</span></div><a href=\"" +linkCompleto+ "\"><button style=\"height: 100px;width: 250px;margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%);margin-top: 150px;background-color: #FFFFFF;color: #06377B;border: none;border-radius: 35px;font-family: 'Poppins', sans-serif;font-weight: 500;font-size: 30px;cursor: pointer;\">Clique aqui</button></a></div></div></div></body></html>",
                email
        );
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/validarToken/{token}")
    public ResponseEntity postValidarToken(@PathVariable String token){

        Algorithm algorithm = Algorithm.HMAC256("secreto");

        try {
            JWTVerifier verificar=JWT.require(algorithm)
                    .withIssuer("recuperarSenha")
                    .build();

            verificar.equals(token);
            DecodedJWT jwt=verificar.verify(token);

            System.out.println("Token decodificado: "+token);
            return ResponseEntity.status(200).build();

        }catch (JWTVerificationException exception) {
            System.out.println("Token inválido");
            return ResponseEntity.status(404).build();
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

    //get para teste
    @GetMapping("/usuario/{id}")
    public ResponseEntity getUsuario(@PathVariable int id){
        return ResponseEntity.status(200).body(usuarioRepository.findById(id));
    }
}
