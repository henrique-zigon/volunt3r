package br.com.voluntier.apivoluntier.Models;

import javax.persistence.*;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;
    private String nomeUsuario;
    private String bio;
    private String genero;
    private int quantidadeMilhas;
    private String tipoUsuario;
    private String email;
    @Column(length = 70)
    private String senha;
    private String cargo;
    private String area;
    @Column(name="imagem_perfil")
    private String usuarioImagemPerfil;
    @Column(name="imagem_capa")
    private String usuarioImagemCapa;

    // 0 = desativado 1 = ativado
    private int statusUsuario;

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public int getQuantidadeMilhas() {
        return quantidadeMilhas;
    }

    public void setQuantidadeMilhas(int quantidadeMilhas) {
        this.quantidadeMilhas = quantidadeMilhas;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getStatusUsuario() {
        return statusUsuario;
    }

    public void setStatusUsuario(int statusUsuario) {
        this.statusUsuario = statusUsuario;
    }

    public String getUsuarioImagemPerfil() {
        return usuarioImagemPerfil;
    }

    public void setUsuarioImagemPerfil(String usuarioImagemPerfil) {
        this.usuarioImagemPerfil = usuarioImagemPerfil;
    }

    public String getUsuarioImagemCapa() {
        return usuarioImagemCapa;
    }

    public void setUsuarioImagemCapa(String usuarioImagemCapa) {
        this.usuarioImagemCapa = usuarioImagemCapa;
    }


}
