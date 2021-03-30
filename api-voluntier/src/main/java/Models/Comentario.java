package Models;

import Models.Usuario;

public class Comentario {

    private int idComentario;
    private String comentario;
    private String data;
    private Usuario usuario;

    public Comentario(int idComentario, String comentario, String data, Usuario usuario) {
        this.idComentario = idComentario;
        this.comentario = comentario;
        this.data = data;
        this.usuario = usuario;
    }


    public int getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(int idComentario) {
        this.idComentario = idComentario;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
