package br.com.voluntier.apivoluntier.Responses;

import br.com.voluntier.apivoluntier.Models.Usuario;

public class UsuarioResponse {

    private Integer idUsuario;
    private String nomeUsuario;
    private String email;
    private String genero;
    private int quantidadeMilhas;
    private String tipoUsuario;
    private String cargo;
    private String area;

    public UsuarioResponse(Usuario usuario) {
        this.idUsuario = usuario.getIdUsuario();
        this.nomeUsuario = usuario.getNomeUsuario();
        this.email = usuario.getEmail();
        this.genero = usuario.getGenero();
        this.quantidadeMilhas = usuario.getQuantidadeMilhas();
        this.tipoUsuario = usuario.getTipoUsuario();
        this.cargo = usuario.getCargo();
        this.area = usuario.getArea();
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public String getEmail() {
        return email;
    }

    public String getGenero() {
        return genero;
    }

    public int getQuantidadeMilhas() {
        return quantidadeMilhas;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public String getCargo() {
        return cargo;
    }

    public String getArea() {
        return area;
    }
}
