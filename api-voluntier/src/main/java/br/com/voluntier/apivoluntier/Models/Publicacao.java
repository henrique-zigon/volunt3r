package br.com.voluntier.apivoluntier.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Entity
public class Publicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_publicacao")
    private Integer id;

    private String descricao;

    private String dataPostagem;

    @Column(name = "imagem")
    private String pathImagem;

    @ManyToOne()
    @JoinColumn(name = "fk_usuario")
    private Usuario usuario;

    //@ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne
    @JoinColumn(name = "fk_evento")
    private Evento evento;
    //Porque a utilização do cascade? Ta bloquenado um treco aqui
    //@ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publicacao_pai")
    @JsonIgnore
    private Publicacao publicacaoPai;

    @OneToMany(mappedBy="fkPublicacao")
    @JsonIgnore
    private List<Gostei> likes;

    @OneToMany(mappedBy="publicacaoPai")
    @JsonIgnore
    private List<Publicacao> comentarios;

    @JsonInclude
    @Transient
    private boolean curtido;

    private String tipo;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public String getPathImagem() {
        return pathImagem;
    }

    public void setPathImagem(String pathImagem) {
        this.pathImagem = pathImagem;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Publicacao getPublicacaoPai() {
        return publicacaoPai;
    }

    public void setPublicacaoPai(Publicacao publicacaoPai) {
        this.publicacaoPai = publicacaoPai;
    }

    public List<Gostei> getLikes() {
        return likes;
    }

    public void setLikes(List<Gostei> likes) {
        this.likes = likes;
    }

    public List<Publicacao> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Publicacao> comentarios) {
        this.comentarios = comentarios;
    }

    public boolean isPublicacaoEvento() {
        return this.getTipo().equals("evento");
    }

    public boolean isComentario() {
        return this.getTipo().equals("comentario");
    }

    public Integer getNumeroLikes() {
        return this.getLikes().size();
    }

    public Integer getNumeroComentarios() {
        return this.getComentarios().size();
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

    public List<String> getHashtags(){

        Pattern pattern = Pattern.compile("(\\#\\w+)");
        List<String> listaHashtag = new ArrayList<String>();
        Matcher m = pattern.matcher(descricao);
        while (m.find()) {
            if(!listaHashtag.contains(m.group())) {
                listaHashtag.add(m.group());
            }
        }
        return listaHashtag;
    }
}
