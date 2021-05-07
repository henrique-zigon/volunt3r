package br.com.voluntier.apivoluntier.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
    @Autowired
    private JavaMailSender mailSender;
    private String email = "211-3cco-grupo4@bandtec.com.br";

    public boolean sendMessage(String title, String message, String sendTo) {
        SimpleMailMessage messageSent = new SimpleMailMessage();
        messageSent.setSubject(title);
        messageSent.setText(message);
        messageSent.setTo(sendTo);
        messageSent.setFrom(email);

        try {
            mailSender.send(messageSent);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
