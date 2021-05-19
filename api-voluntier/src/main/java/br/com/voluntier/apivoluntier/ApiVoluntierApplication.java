package br.com.voluntier.apivoluntier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ApiVoluntierApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiVoluntierApplication.class, args);
	}

}
