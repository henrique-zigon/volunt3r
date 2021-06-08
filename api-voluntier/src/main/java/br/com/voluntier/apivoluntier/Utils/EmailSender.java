package br.com.voluntier.apivoluntier.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class EmailSender {
    @Autowired
    private JavaMailSender mailSender;
    private String email = "211-3cco-grupo4@bandtec.com.br";

    public boolean sendMessage(String title, String message, String sendTo) {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            mimeMessage.setSubject(title);
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setText(message, true);
            helper.setTo(sendTo);
            helper.setFrom(email);
            mailSender.send(mimeMessage);
            return true;
        }catch(MessagingException ex) {
            System.out.println("Puts deu ruim\n"+ ex);
            return false;
        }
    }
}
