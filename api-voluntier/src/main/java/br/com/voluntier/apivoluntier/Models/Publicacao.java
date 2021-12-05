package br.com.voluntier.apivoluntier.Models;

import br.com.voluntier.apivoluntier.Responses.ComentarioResponse;
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
    @ManyToOne
    @JoinColumn(name = "publicacao_pai")
    @JsonIgnore
    private Publicacao publicacaoPai;

    @OneToMany(mappedBy="fkPublicacao")
    @JsonIgnore
    private List<Gostei> likes;

    @OneToMany(mappedBy="publicacaoPai",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Publicacao> publicacoesFilhos;

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

    public List<ComentarioResponse> getComentarios() {
        List<ComentarioResponse> comentarioResponseList = new ArrayList<>();
        for(Publicacao coment : publicacoesFilhos) {
            comentarioResponseList.add(new ComentarioResponse(coment));
        }
        return comentarioResponseList;
    }

    public List<Publicacao> getPublicacoesFilhos() {
        return publicacoesFilhos;
    }

    public void setPublicacoesFilhos(List<Publicacao> publicacoesFilhos) {
        this.publicacoesFilhos = publicacoesFilhos;
    }

    public boolean setCurtido() {
        return curtido;
    }

    public void setCurtido(boolean curtido) {
        this.curtido = curtido;
    }

    public boolean isPublicacaoEvento() {
        return this.getTipo().equals("EVENTO");
    }

    public boolean isComentario() {
        return this.getTipo().equals("COMENTARIO");
    }

    public Integer getNumeroLikes() {
        return this.getLikes().size();
    }

    public Integer getNumeroComentarios() {
        return this.getPublicacoesFilhos().size();
    }

    public void setCurtido(Integer idUsu){
        this.curtido=false;
        for (Gostei gostei: likes){
            if(this.isPublicacaoEvento()) {
                this.evento.setInscrito(idUsu);
            }
            if (gostei.getFkUsuario().getIdUsuario()==idUsu){
                this.curtido=true;
                return;
            }
        }
    }

    public boolean isCurtido(){
        return this.curtido;
    }

    public List<String> getHashtags(){

        Pattern pattern = Pattern.compile("(\\#.*?\\s|\\#.*?$|\\#.*?\\,|\\#.*?.)");
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
