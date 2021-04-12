package br.com.voluntier.apivoluntier.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Evento extends Postagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate dataEvento;
    private int maximoParticipantes;
    private double horasEvento;


    public void ingresar(Usuario usuario) {

    }

    public List<Usuario> update(Usuario usuario) {
        return null;
    }

}
