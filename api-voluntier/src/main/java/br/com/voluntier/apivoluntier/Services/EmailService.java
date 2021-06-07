package br.com.voluntier.apivoluntier.Services;

import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Utils.EmailSender;
import br.com.voluntier.apivoluntier.Utils.FilaObj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    public static FilaObj<Usuario> listaEmail = new FilaObj<>(10);

    @Autowired
    EmailSender emailSender;
    /*
    A lógica que eu imagino aqui é a seguinte:
        Coletar todos os inscritos pro evento, e notificá-los baseado em algo
        Exemplo: 2 dias antes do evento acontecer de fato
        Ai no caso, vamos usar fila, então vamos primeiro coletar as infos de inscricaoEvento
        Resumindo o cron abaixo:
            De segunda a sexta, toda vez que der o horário 8:30:00 nós iremos rodar essa função
         ┌───────────── second (0-59)
         │ ┌───────────── minute (0 - 59)
         │ │ ┌───────────── hour (0 - 23)
         │ │ │ ┌───────────── day of the month (1 - 31)
         │ │ │ │ ┌───────────── month (1 - 12) (or JAN-DEC)
         │ │ │ │ │ ┌───────────── day of the week (0 - 7)
         │ │ │ │ │ │          (0 or 7 is Sunday, or MON-SUN)
         │ │ │ │ │ │
         * * * * * *
    */
    @Scheduled(cron="0 30 8 * * MON-FRI")
    //@Scheduled(fixedDelay = 1000*60)
    public void enviarEmails() {
        while(!listaEmail.isEmpty()) {
            Usuario user = listaEmail.poll();
            if(emailSender.sendMessage(
                    "Titulo badass",
                    "MEnsagem sobre evento braba",
                    user.getEmail()
            )) {
                System.out.println("Email enviado com sucesso!");
            }else {
                System.out.println("Erro ao enviar email.");
            }
        }
    }
}
