package br.com.voluntier.apivoluntier.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-healthcheck")
public class APIHealthCheckController {

    @GetMapping("/status")
    public ResponseEntity apihealthcheck(){
        return ResponseEntity.status(200).build();
    }
}
