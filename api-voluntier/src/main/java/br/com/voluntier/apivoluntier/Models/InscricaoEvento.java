package br.com.voluntier.apivoluntier.Models;

import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import br.com.voluntier.apivoluntier.Responses.UsuarioSimplesResponse;

import javax.persistence.*;

@Entity
public class InscricaoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inscricao_evento")
    private Integer id;
    private Integer fkEvento;
    @ManyToOne
    @JoinColumn(name = "fk_usuario")
    private Usuario fkUsuario;
    @Column(name = "status_UE")
    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFkEvento() {
        return fkEvento;
    }

    public void setFkEvento(Integer fkEvento) {
        this.fkEvento = fkEvento;
    }

    public UsuarioSimplesResponse getUsuario() {
        return new UsuarioSimplesResponse(fkUsuario);
    }

    public Integer getFkUsuario() {
        return fkUsuario.getIdUsuario();
    }

    public void setFkUsuario(Usuario fkUsuario) {
        this.fkUsuario = fkUsuario;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
