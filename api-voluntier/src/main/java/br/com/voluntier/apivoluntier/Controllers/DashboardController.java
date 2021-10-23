package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Repositories.DashboardRepository;
import br.com.voluntier.apivoluntier.Repositories.VoluntarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dash")
public class DashboardController {

    @Autowired
    DashboardRepository dashboardRepository;

    @Autowired
    VoluntarioRepository voluntarioRepository;

    @GetMapping
    public ResponseEntity getQuantidadeVoluntario(){
        return ResponseEntity.status(200).body(dashboardRepository.findAllByOrderByCategoriaAsc());
    }

    @GetMapping("/score")
    public ResponseEntity getScoreTempo(){

        return ResponseEntity.status(200).body(voluntarioRepository.findAllScore());
    }
}
