package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Repositories.InscricaoEventoRepository;
import br.com.voluntier.apivoluntier.Repositories.RanqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ranque")
public class RanqueController {

    @Autowired
    public RanqueRepository repository;

    @Autowired
    public InscricaoEventoRepository inscricaoEventoRepository;

    //DEVE SER PUT? JA QUE ATUALIZA?
    @GetMapping("/{idUsuario}")
    public ResponseEntity getRanque(@PathVariable int idUsuario){
        //atualizar
        inscricaoEventoRepository.FindAllByFkUsuarioAndfkCategoria(idUsuario);
        return ResponseEntity.status(200).body("terminar esse END-Point-falta pegar o selcet e/ou mudar o banco ou decidir oq fazer");
        //mostrar
    }
}
