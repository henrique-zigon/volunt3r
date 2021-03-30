package Models;

public abstract class Postagem {

    private String titulo;
    private String descricao;
    private String dataPostagem;
    private String pathImagem;
    private int cliques;


    public Postagem(String titulo, String descricao, String dataPostagem, String pathImagem, int cliques) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataPostagem = dataPostagem;
        this.pathImagem = pathImagem;
        this.cliques = cliques;
    }

    public abstract void postar();

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public int getCliques() {
        return cliques;
    }

    public void setCliques(int cliques) {
        this.cliques = cliques;
    }
}
