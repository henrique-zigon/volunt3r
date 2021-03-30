package Models;

import java.util.List;

public class Evento extends Postagem {

    private String categoria;
    private String dataEvento;

    public String getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(String dataEvento) {
        this.dataEvento = dataEvento;
    }

    public Evento(String titulo, String descricao, String dataPostagem, String pathImagem, int cliques, Usuario usuario,
                  List<String> tagsPostagem, String categoria, String dataEvento) {
        super(titulo, descricao, dataPostagem, pathImagem, cliques, usuario, tagsPostagem);
        this.categoria = categoria;
        this.dataEvento = dataEvento;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    @Override
    public void postar() {

    }

    public void ingressar(Usuario usuario) {

    }
}
