package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.Jwt;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.UsuarioRepository;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import br.com.voluntier.apivoluntier.Security.TokenService;
import br.com.voluntier.apivoluntier.Services.S3Services;
import br.com.voluntier.apivoluntier.Utils.EmailSender;
import br.com.voluntier.apivoluntier.Utils.LoginForm;
import br.com.voluntier.apivoluntier.Utils.SenhaForm;
import br.com.voluntier.apivoluntier.Utils.TokenDto;
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

    public String createJWT(String email) {
        String token = "";
        Calendar date = Calendar.getInstance();
        Date dataLimite = new Date(date.getTimeInMillis() + (600000));

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
        String linkFrontEnd = "http//volunt3r.ddns.net/recuperar-senha-redefinir/";
        String token = createJWT(email);
        String linkCompleto = linkFrontEnd+token;

        emailSender.sendMessage(
                "Volunt3r - Recuperação de Senha",
                "<html><body style=\"background-color: #F0F0F5; margin: 0; padding: 0; font-family: 'Poppins', sans-serif;\"><div style=\"display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; flex-direction: column;\"><div style=\"display: flex; align-items: flex-end; position: relative; justify-content: center;\"><img style=\"width: 150px; height: 150px;\" src=\"logo volunt3r.png\" alt=\"\"><span style=\"color: #06377B; font-weight: 600;font-size: 50px; position:relative; right:45px\">olunt3r</span></div><div style=\"background-color: #06377B; width: 500px; height: 500px; align-items: center; border-radius: 35px; color: #FFFFFF; margin: 15 0; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; position: relative;\"><div style=\"display: flex; width: 100%; align-items: center; justify-content: space-between;\"><span style=\"font-weight:600; font-size: 28px;\">Recuperação de Senha</span><svg width=\"55\" height=\"55\" viewBox=\"0 0 35 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5.0064 25.2656L4.49015 28.875C4.45825 29.099 4.47892 29.3274 4.55052 29.542C4.62213 29.7567 4.74271 29.9517 4.90272 30.1118C5.06273 30.2718 5.25779 30.3923 5.47245 30.464C5.68712 30.5356 5.9155 30.5562 6.13953 30.5243L9.7489 30.0081C10.2958 29.9308 11.6666 26.25 11.6666 26.25C11.6666 26.25 12.3549 26.8406 12.6364 26.9295C13.2372 27.1191 13.822 26.53 14.0189 25.932L14.5833 23.3479C14.5833 23.3479 15.4247 23.7737 15.7295 23.8364C16.1174 23.9166 16.4937 23.6775 16.7606 23.4091C16.9209 23.2493 17.0413 23.054 17.112 22.8389L17.4999 20.4312C17.4999 20.4312 18.4843 20.7039 18.8212 20.7433C19.2047 20.787 19.5781 20.5916 19.8522 20.316L21.5118 18.6579C22.9166 19.1131 24.4198 19.1718 25.8559 18.8275C27.2919 18.4832 28.6051 17.7493 29.6508 16.7066C31.1524 15.2011 31.9957 13.1615 31.9957 11.0352C31.9957 8.90879 31.1524 6.86921 29.6508 5.3637C28.1453 3.86208 26.1057 3.0188 23.9793 3.0188C21.853 3.0188 19.8134 3.86208 18.3079 5.3637C17.2649 6.40922 16.5308 7.72239 16.1865 9.15849C15.8422 10.5946 15.9011 12.0979 16.3566 13.5027L5.41765 24.4402C5.19437 24.6632 5.04998 24.953 5.0064 25.2656V25.2656ZM26.9849 8.02953C27.7806 8.82749 28.2273 9.90834 28.2273 11.0352C28.2273 12.162 27.7806 13.2428 26.9849 14.0408L20.9737 8.02953C21.7717 7.23393 22.8525 6.78716 23.9793 6.78716C25.1061 6.78716 26.187 7.23393 26.9849 8.02953Z\" fill=\"#DAA520\" /></svg></div><div style=\"display: flex; width: 100%; align-items: center; justify-content: center; flex-direction: column; margin-top: 50px;\"><span style=\"margin-top: 50px; font-size: 21px;\">Olá, <b>Voluntariado</b>. Esqueceu sua senha?</span><span style=\"margin-top: 50px; font-size: 21px;\">Não se preocupe, podemos te ajudar! <span style=\"font-size: 25px\">\uD83D\uDE09</span></span><a style=\"margin-top: 80px; height: 80px; width: 200px; border-radius: 50px;\"href=\""+linkCompleto+"\"><button style=\"height: 100%; width:100%; background-color: #FFFFFF;color: #06377B;border: none;border-radius: 50px;font-family: 'Poppins', sans-serif;font-weight: 500;font-size: 21px; cursor: pointer;\">Clique aqui</button></a></div></div></div></body></html>",
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
