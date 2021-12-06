package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.NodeAluvial;
import br.com.voluntier.apivoluntier.Models.Views.ViewAluvialAtual;
import br.com.voluntier.apivoluntier.Models.Views.ViewAluvialPassado;
import br.com.voluntier.apivoluntier.Repositories.AluvialAtualRepository;
import br.com.voluntier.apivoluntier.Repositories.AluvialPassadoRepository;
import br.com.voluntier.apivoluntier.Repositories.DashboardRepository;
import br.com.voluntier.apivoluntier.Repositories.Views.ViewAderenciaEventosRepository;
import br.com.voluntier.apivoluntier.Repositories.Views.ViewHistoricoVoluntarioRepository;
import br.com.voluntier.apivoluntier.Repositories.VoluntarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dash")
public class DashboardController {

    @Autowired
    DashboardRepository dashboardRepository;

    @Autowired
    VoluntarioRepository voluntarioRepository;

    @Autowired
    AluvialAtualRepository aluvialAtualRepository;

    @Autowired
    AluvialPassadoRepository aluvialPassadoRepository;

    @Autowired
    ViewHistoricoVoluntarioRepository historicoVoluntarioRepository;

    @Autowired
    ViewAderenciaEventosRepository aderenciaEventosRepository;

    private HashMap<String, Object> retornoHasmap = new HashMap<>();

    @GetMapping
    public ResponseEntity getQuantidadeVoluntario(){
        return ResponseEntity.status(200).body(dashboardRepository.findAllByOrderByCategoriaAsc());
    }

    @GetMapping("/score")
    public ResponseEntity getScoreTempo(){

        return ResponseEntity.status(200).body(voluntarioRepository.findAllScore());
    }

    @GetMapping("/aluvial/atual")
    public ResponseEntity getAluvialAtual(){

        retornoHasmap.clear();

        List<ViewAluvialAtual> nodesAtuais=aluvialAtualRepository.findAll();
        List<ViewAluvialPassado> nodesPassado=aluvialPassadoRepository.findAll();

        List<NodeAluvial> nodes=new ArrayList<>();
        nodes.add(new NodeAluvial("n0_2019","N0"));
        nodes.add(new NodeAluvial("n1_2019","N1"));
        nodes.add(new NodeAluvial("n2_2019","N2"));
        nodes.add(new NodeAluvial("n3_2019","N3"));
        nodes.add(new NodeAluvial("n4_2019","N4"));//----
        nodes.add(new NodeAluvial("n0_2020","N0"));
        nodes.add(new NodeAluvial("n1_2020","N1"));
        nodes.add(new NodeAluvial("n2_2020","N2"));
        nodes.add(new NodeAluvial("n3_2020","N3"));
        nodes.add(new NodeAluvial("n4_2020","N4"));//---
        nodes.add(new NodeAluvial("n0_2021","N0"));
        nodes.add(new NodeAluvial("n1_2021","N1"));
        nodes.add(new NodeAluvial("n2_2021","N2"));
        nodes.add(new NodeAluvial("n3_2021","N3"));
        nodes.add(new NodeAluvial("n4_2021","N4"));


        for (ViewAluvialPassado dePara : nodesPassado){
            if (dePara.getFrom().equals("0")){
                dePara.setFrom(nodes.get(0).getId());
            }
            else if (dePara.getFrom().equals("1")){
                dePara.setFrom(nodes.get(1).getId());
            }
            else if (dePara.getFrom().equals("2")){
                dePara.setFrom(nodes.get(2).getId());
            }
            else if (dePara.getFrom().equals("3")){
                dePara.setFrom(nodes.get(3).getId());
            }
            else if (dePara.getFrom().equals("4")){
                dePara.setFrom(nodes.get(4).getId());
            }
                //------
            if (dePara.getTo().equals("0")){
                dePara.setTo(nodes.get(5).getId());
            }
            else if (dePara.getTo().equals("1")){
                dePara.setTo(nodes.get(6).getId());
            }
            else if (dePara.getTo().equals("2")){
                dePara.setTo(nodes.get(7).getId());
            }
            else if (dePara.getTo().equals("3")){
                dePara.setTo(nodes.get(8).getId());
            }
            else if (dePara.getTo().equals("4")){
                dePara.setTo(nodes.get(9).getId());
            }
        }

        for (ViewAluvialAtual dePara : nodesAtuais){
            if (dePara.getFrom().equals("0")){
            dePara.setFrom(nodes.get(5).getId());
            }
            else if (dePara.getFrom().equals("1")){
                dePara.setFrom(nodes.get(6).getId());
            }
            else if (dePara.getFrom().equals("2")){
                dePara.setFrom(nodes.get(7).getId());
            }
            else if (dePara.getFrom().equals("3")){
                dePara.setFrom(nodes.get(8).getId());
            }
            else if (dePara.getFrom().equals("4")){
                dePara.setFrom(nodes.get(9).getId());
            }
            //-----
            if (dePara.getTo().equals("0")){
                dePara.setTo(nodes.get(10).getId());
            }
            else if (dePara.getTo().equals("1")){
                dePara.setTo(nodes.get(11).getId());
            }
            else if (dePara.getTo().equals("2")){
                dePara.setTo(nodes.get(12).getId());
            }
            else if (dePara.getTo().equals("3")){
                dePara.setTo(nodes.get(13).getId());
            }
            else if (dePara.getTo().equals("4")){
                dePara.setTo(nodes.get(14).getId());
            }
        }



        //retornoHasmap.put("nodes",nodes);
        retornoHasmap.put("data",nodesAtuais);
        retornoHasmap.put("dataAntigo",nodesPassado);

        return ResponseEntity.status(200).body(retornoHasmap);
    }

//    @GetMapping("/aluvial/passado")
//    public ResponseEntity getAluvialPassado(){
//        return ResponseEntity.status(200).body(aluvialPassadoRepository.findAll());
//    }

    @GetMapping("/perfil-comparativo")
    public ResponseEntity getDistribuicaoPerfilComparativo() {
        return ResponseEntity.status(200).body(historicoVoluntarioRepository.countTotalPerfilComparativo());
    }

    @GetMapping("/perfil-ano")
    public ResponseEntity getDistribuicaoPerfilAno() {
        return ResponseEntity.status(200).body(historicoVoluntarioRepository.countTotalPerfilAno());
    }

    @GetMapping("/perfil-completo")
    public ResponseEntity getDistribuicaoPerfilCompleto() {
        return ResponseEntity.status(200).body(historicoVoluntarioRepository.countTotalPerfilCompleto());
    }

    @GetMapping("/aderencia-overtime")
    public ResponseEntity getAderenciaOvertime() {
        return ResponseEntity.status(200).body(aderenciaEventosRepository.findAll());
    }

    @GetMapping("/distribuicao-categoria")
    public ResponseEntity getDistribuicaoCategoria() {
        return ResponseEntity.status(200).body(historicoVoluntarioRepository.countCategoria());
    }

    @GetMapping("/distribuicao-area")
    public ResponseEntity getDistribuicaoArea() {
        return ResponseEntity.status(200).body(historicoVoluntarioRepository.countArea());
    }
}
