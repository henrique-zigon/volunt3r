package br.com.voluntier.apivoluntier.Responses;

import br.com.voluntier.apivoluntier.Models.Usuario;

public class UsuarioSimplesResponse {
    private Integer idUsuario;
    private String nome;
    private String usuarioImagemPerfil;

    public UsuarioSimplesResponse(Usuario usuario) {
        this.idUsuario = usuario.getIdUsuario();
        this.nome = usuario.getNomeUsuario();
        this.usuarioImagemPerfil = usuario.getUsuarioImagemPerfil();
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUsuarioImagemPerfil() {
        return usuarioImagemPerfil;
    }

    public void setUsuarioImagemPerfil(String usuarioImagemPerfil) {
        this.usuarioImagemPerfil = usuarioImagemPerfil;
    }
}
