package br.com.voluntier.apivoluntier.Responses;

import br.com.voluntier.apivoluntier.Models.Gostei;
import br.com.voluntier.apivoluntier.Models.Publicacao;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

public class ComentarioResponse {

    private Integer id;
    private String descricao;
    private String dataPostagem;
    private UsuarioSimplesResponse usuario;
    private Integer numeroLikes;
    @JsonIgnore
    private List<Gostei> likes;
    private boolean curtido;

    public ComentarioResponse(Publicacao publicacao) {
        this.id = publicacao.getId();
        this.descricao = publicacao.getDescricao();
        this.dataPostagem = publicacao.getDataPostagem();
        this.usuario = new UsuarioSimplesResponse(publicacao.getUsuario());
        this.numeroLikes = publicacao.getNumeroLikes();
        this.likes = publicacao.getLikes();
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

    public List<Gostei> getLikes() {
        return likes;
    }

    public void setLikes(List<Gostei> likes) {
        this.likes = likes;
    }

    public void isCurtido(Integer idUsu){
        this.curtido=false;
        for (Gostei gostei: likes){
            if (gostei.getFkUsuario().getIdUsuario()==idUsu){
                this.curtido=true;
                return;
            }
        }
    }

    public boolean getCurtido(){
        return this.curtido;
    }
}
