package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Responses.Classificacao;
import br.com.voluntier.apivoluntier.Repositories.ClassificacaoRepository;
import br.com.voluntier.apivoluntier.Repositories.InscricaoEventoRepository;
import br.com.voluntier.apivoluntier.Repositories.RanqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ranque")
public class RanqueController {

    @Autowired
    public RanqueRepository repository;

    @Autowired
    public InscricaoEventoRepository inscricaoEventoRepository;

    @Autowired
    public ClassificacaoRepository classificacaoRepository;

    //DEVE SER PUT? JA QUE ATUALIZA?
    @GetMapping("/{idUsuario}")
    public ResponseEntity getQuantidadeRanque(@PathVariable int idUsuario){
        //atualizar
        List<Classificacao> resposta= classificacaoRepository.FindAllByFkUsuarioAndfkCategoria(idUsuario);
        return ResponseEntity.status(200).body(resposta);
        //mostrar
    }
}
