package br.com.voluntier.apivoluntier.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class  Usuario implements UserDetails {

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

    public Usuario(Integer idUsuario, String nomeUsuario, String bio, String genero, int quantidadeMilhas, String tipoUsuario, String email, String senha, String cargo, String area, String usuarioImagemPerfil, String usuarioImagemCapa, int statusUsuario) {
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.bio = bio;
        this.genero = genero;
        this.quantidadeMilhas = quantidadeMilhas;
        this.tipoUsuario = tipoUsuario;
        this.email = email;
        this.senha = senha;
        this.cargo = cargo;
        this.area = area;
        this.usuarioImagemPerfil = usuarioImagemPerfil;
        this.usuarioImagemCapa = usuarioImagemCapa;
        this.statusUsuario = statusUsuario;
    }

    public Usuario(String nomeUsuario, String email, String senha) {
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.senha = senha;
    }

    public Usuario() {

    }

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

    @JsonProperty
    public void setSenha(String senha) {
        this.senha = senha;
    }

    @JsonIgnore
    public String getSenha() {
        return senha;
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

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<TipoUsuario> listaRoles = new ArrayList<>();
        listaRoles.add(new TipoUsuario(this.getTipoUsuario()));
        return listaRoles;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return this.senha;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return this.email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
