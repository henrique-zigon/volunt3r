package br.com.voluntier.apivoluntier.Security;

import br.com.voluntier.apivoluntier.Models.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
public class TokenService {

    private Long expiration = 86400000L;

    @Value("$(forum.jwt.secret)")
    private String secret;

    private Integer idResgatado;

    public Integer getIdResgatado() {
        return idResgatado;
    }

    public String gerarToken(Authentication authentication) {
        Usuario logado = (Usuario) authentication.getPrincipal();
        Date hoje = new Date();
        Date dataExpiracao = new Date(hoje.getTime() + expiration);

        return Jwts.builder()
                .setIssuer("API")
                .setSubject(logado.getIdUsuario().toString())
                .setIssuedAt(hoje)
                .setExpiration(dataExpiracao)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean isTokenValido(String token) {
        try {
            Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public Integer getIdUsuario(String token) {
        Claims claims=Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
        this.idResgatado=Integer.parseInt(claims.getSubject());
        System.out.println("Sonim:"+this.getIdResgatado());
        return Integer.parseInt(claims.getSubject());
    }
}
