package br.com.voluntier.apivoluntier;
import Models.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {


    // Criando as listas
    private List<Usuario> usuarioLogado = new ArrayList<Usuario>();
    private List<Usuario> usuariosSistema = new ArrayList<>();

    // Iniciando o construtor com usuários "cadastrados"
    public UsuarioController() {
        usuariosSistema.add(new Usuario(1, "ygor.lima@bandtec.com.br", "123456",
                "Ygor dos Santos", "25/05/2002", 'M', 125,
                "B3 Social"));

        usuariosSistema.add(new Usuario(2, "eduardo.santos@bandtec.com.br", "@123",
                "Eduardo Cavalcanti", "10/01/2002", 'M', 25,
                "Comum"));

    }
    
    /*
    EndPoint para realizar login do usuário
    Nesse EndPoint passamos: email e senha no json
     */
    @PostMapping("/logar")
    public String postLogar(@RequestBody Usuario usuario) {

        List<Usuario> usuarioFiltrado = usuariosSistema.stream()
                .filter( u -> {
                    return u.getEmail().equals(usuario.getEmail()) &&
                            u.getSenha().equals(usuario.getSenha());
                }).collect( Collectors.toList());


        if(usuarioFiltrado.isEmpty()) {
            return "Opps... Usuário e/ou senha incorretos!";
        } else {
            usuarioLogado.add(usuario);
            return "Usuário logado com sucesso!";
        }
    }


    /*
    EndPoint para realizar logout do usuário
    passando como parâmetro do endpoint o "id"
    que no momento está sendo a posição do List
     */

    @GetMapping("/sair/{id}")
    public String getSair(@PathVariable int id) {

        if(id < usuarioLogado.size()) {
            usuarioLogado.remove(id);
            return "Usuário desconectado com sucesso!";
        } else {
            return "Opps... Deu aldo de errado ao sair!";
        }

    }


    /*
    Esse endpoint é responsável por criar o usuário.
    Para a sua criação temos que passar no json os atributos da classe Usuário
     */
    @PostMapping
    public String postCriarUsuario(@RequestBody Usuario usuario) {
        usuariosSistema.add(usuario);
        /*
        HashMap<String, String> map = new HashMap<>();
        map.put("message", "Usuário criado com sucesso!");*/
        return "Usuário criado com sucesso!";
    }
    

}
