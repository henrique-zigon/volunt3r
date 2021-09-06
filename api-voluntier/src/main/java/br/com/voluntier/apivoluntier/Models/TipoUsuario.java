package br.com.voluntier.apivoluntier.Models;

import org.springframework.security.core.GrantedAuthority;

public class TipoUsuario implements GrantedAuthority {
    private String nome;

    public TipoUsuario(String nome) {
        this.nome = nome;
    }

    @Override
    public String getAuthority() {
        return nome;
    }
}
