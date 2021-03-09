package br.com.voluntier.apivoluntier;

public class Usuario {


    private int id;
    private String email;
    private String senha;
    private String nome;
    private String dataNascimento;
    private char genero;
    private int quantidade_milhas;
    private String tipoUsuario;

    public Usuario(int id, String email, String senha, String nome, String dataNascimento, char genero, int quantidade_milhas, String tipoUsuario) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.quantidade_milhas = quantidade_milhas;
        this.tipoUsuario = tipoUsuario;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public char getGenero() {
        return genero;
    }

    public void setGenero(char genero) {
        this.genero = genero;
    }

    public int getQuantidade_milhas() {
        return quantidade_milhas;
    }

    public void setQuantidade_milhas(int quantidade_milhas) {
        this.quantidade_milhas = quantidade_milhas;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
