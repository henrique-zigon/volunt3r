package Models;

import java.util.List;

public class Publicacao extends Postagem {

    public Publicacao(String titulo, String descricao, String dataPostagem, String pathImagem, int cliques,
                      Usuario usuario, List<String> tagsPostagem) {
        super(titulo, descricao, dataPostagem, pathImagem, cliques, usuario, tagsPostagem);
    }

    @Override
    public void postar() {

    }

    public void darMilhas() {

    }
}
