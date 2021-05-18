package br.com.voluntier.apivoluntier.Models;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class Jwt {
    public String createJWT(Usuario user) {
        String token="";
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("tipoUsuario",user.getTipoUsuario())
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
            JWTVerifier verificador=JWT.require(algorithm)
                    .withIssuer("auth0")
                    .withClaim("tipoUsuario","b3_social")
                    .build();
            DecodedJWT jwt=verificador.verify(token);
            System.out.println("Token decodificado: "+jwt);
            return "Vai na fé";
        }catch (JWTVerificationException exception){
            return "Sem premissão";
        }
    }
}
