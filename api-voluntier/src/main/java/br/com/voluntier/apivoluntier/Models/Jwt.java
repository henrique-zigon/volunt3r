package br.com.voluntier.apivoluntier.Models;

import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

public class Jwt {

    public String createJWT(Usuario user) {
        String token="";
        Calendar date=Calendar.getInstance();



        Date dataLimite=new Date(date.getTimeInMillis()+(100000));
        System.out.println(dataLimite+" eeee");


        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("tipoUsuario",user.getTipoUsuario())
                    .withExpiresAt(dataLimite)
                    .sign(algorithm);

        } catch (JWTCreationException exception){
            //Invalid Signing configuration / Couldn't convert Claims.
            System.out.println("Falha ao criar o Token");
        }
        System.out.println("TOKEN: " +token);
        return token;
    }

    public String verificarAcesso(String token){
        Algorithm algorithm = Algorithm.HMAC256("secret");
        try {
            System.out.println("linha 42");
            JWTVerifier verificador=JWT.require(algorithm)
                    .withIssuer("auth0")
                    .withClaim("tipoUsuario","b3_social")
                    .build();

            verificador.equals(token);
            DecodedJWT jwt=verificador.verify(token);

            System.out.println("Token decodificado: ");
            return "Vai na fé";
        }catch (JWTVerificationException exception){
            System.out.println("deu ruim");
            return "Sem premissão";
        }
    }
}
