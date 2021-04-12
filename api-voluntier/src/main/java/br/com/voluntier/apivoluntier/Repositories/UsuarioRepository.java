package br.com.voluntier.apivoluntier.Repositories;

import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Responses.UsuarioResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {


    //List<Usuario> findByEmailAndSenha(String email, String senha);

    @Query("select u from Usuario as u where u.email = :email")
    List<UsuarioResponse> findByEmail(String email);

    @Query("select u from Usuario as u where u.email = :email and u.senha = :senha")
    List<UsuarioResponse> findByEmailAndSenha(String email, String senha);

}
