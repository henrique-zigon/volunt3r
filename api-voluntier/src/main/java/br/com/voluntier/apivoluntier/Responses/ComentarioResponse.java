package br.com.voluntier.apivoluntier.Responses;

import br.com.voluntier.apivoluntier.Models.Clique;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.OneToMany;
import java.util.List;

public class ComentarioResponse {

    private Integer id;
    private String descricao;
    private String dataPostagem;
    private UsuarioSimplesResponse usuario;
    private Integer numeroLikes;

    public ComentarioResponse(Publicacao publicacao) {
        this.id = publicacao.getId();
        this.descricao = publicacao.getDescricao();
        this.dataPostagem = publicacao.getDataPostagem();
        this.usuario = new UsuarioSimplesResponse(publicacao.getUsuario());
        this.numeroLikes = publicacao.getNumeroLikes();
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataPostagem() {
        return dataPostagem;
    }

    public void setDataPostagem(String dataPostagem) {
        this.dataPostagem = dataPostagem;
    }

    public UsuarioSimplesResponse getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioSimplesResponse usuario) {
        this.usuario = usuario;
    }

    public Integer getNumeroLikes() {
        return numeroLikes;
    }

    public void setNumeroLikes(Integer numeroLikes) {
        this.numeroLikes = numeroLikes;
    }
}
