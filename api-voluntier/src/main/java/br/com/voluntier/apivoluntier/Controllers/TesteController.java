package br.com.voluntier.apivoluntier.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
public class TesteController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity getTeste(){
        String stringa="xipa";
        CharSequence xipa=(passwordEncoder.encode(stringa));
        System.out.println(xipa);
        return ResponseEntity.status(201).body(passwordEncoder.matches("stringa",xipa.toString()));
    }


}
