package Models;

import Models.Postagem;
import Models.Usuario;

public class Evento extends Postagem {


    private String dataEvento;
    private String categoria;

    public Evento(String titulo, String descricao, String dataPostagem, String pathImagem, int cliques, String dataEvento, String categoria) {
        super(titulo, descricao, dataPostagem, pathImagem, cliques);
        this.dataEvento = dataEvento;
        this.categoria = categoria;
    }

    public String getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(String dataEvento) {
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
