package br.com.voluntier.apivoluntier.Services;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.Usuario;
import br.com.voluntier.apivoluntier.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Formatter;
import java.util.FormatterClosedException;
import java.util.List;

@Service
public class ArquivoServices {

    @Autowired
    CliqueRepository repositoryClique;
    @Autowired
    GosteiRepository repositoryGostei;
    @Autowired
    UsuarioRepository repositoryUsuario;
    @Autowired
    InscricaoEventoRepository repositoryInscricaoEvento;
    @Autowired
    PublicacaoRepository repositoryPublicacao;

    public void gravaRegistro(String nomeArq, String registro) {
        BufferedWriter saida = null;
        try {
            saida = new BufferedWriter(new FileWriter(nomeArq, true));
        } catch (IOException e) {
            System.err.printf("Erro na abertura do arquivo: %s.\n", e.getMessage());
        }

        try {
            saida.append(registro + "\n");
            saida.close();

        } catch (IOException e) {
            System.err.printf("Erro ao gravar arquivo: %s.\n", e.getMessage());
        }
    }

    public ResponseEntity exportarEventosTXT() {
        List<Publicacao> eventos = repositoryPublicacao.findAllIdEventoNotNull();

        Date dataDeHoje = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyy-HHmmss");

        String nomeArq = "Arquivo-Eventos-" + formatter.format(dataDeHoje) + ".txt";
        String header = "";
        String corpo = "";
        String trailer = "";
        int contRegDados = 0;
        double aderencia = 64.8;
        int cliques = 50, likes = 25;

        // Monta o registro header
        formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        header += "00EVENTO20211";
        header += formatter.format(dataDeHoje);
        //Versão do Layout
        header += "01";

        // Grava o registro header
        gravaRegistro(nomeArq, header);


        for (Publicacao p : eventos) {
            corpo = "02";

            corpo += String.format("%-4s", p.getId()); // Vamos trabalhar com id da publi ou id do evento?
            corpo += String.format("%-50s", p.getTitulo());
            corpo += String.format("%-2s", p.getEvento().getCategoria().getNomeCategoria());
            corpo += String.format("%4s", p.getEvento().getMaximoParticipantes());
            corpo += String.format("%4s", p.getEvento().getHoras());
            corpo += String.format("%5s", repositoryInscricaoEvento.countByFkEvento(p.getEvento().getId()) * 100 / 1179);
            corpo += String.format("%-10s", p.getEvento().getDataEvento());
            corpo += String.format("%-10s", p.getEvento().getDataFechamentoEvento());
            corpo += String.format("%4s", repositoryClique.countByPublicacao_Id(p.getId()));
            corpo += String.format("%4s", repositoryGostei.countByFkPublicacao(p.getId()));

            contRegDados++;

            gravaRegistro(nomeArq, corpo);
        }

        // monta o trailer
        trailer += "01";
        trailer += String.format("%010d", contRegDados);
        gravaRegistro(nomeArq, trailer);

        Path path = Paths.get(nomeArq);
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=" + nomeArq);
        return ResponseEntity.status(200).headers(headers).body(resource);
    }

    public ResponseEntity exportarEventosCSV() {
        List<Publicacao> retornoRepositoryEvento = repositoryPublicacao.findAllIdEventoNotNull();

        Date dataDeHoje = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyy-HHmmss");
        FileWriter arq = null;        // objeto FileWriter - representa o arquivo
        Formatter saida = null;        // objeto Formatter para executar saída formatada
        boolean deuRuim = false;    // indica se deu erro

        String nomeArquivo = "Eventos-" + formatter.format(dataDeHoje) + ".csv";

        try {
            arq = new FileWriter(nomeArquivo, true);  // true indica que vai fazer "append"
            saida = new Formatter(arq);
        } catch (IOException erro) {
            System.err.println("Erro ao abrir arquivo");
            System.exit(1);  // encerra o programa, com status de erro
        }

        try {
            for (Publicacao p : retornoRepositoryEvento) {
                saida.format("%d;%s;%s;%d;%.2f;%.2f;%s;%s;%d;%d%n",
                        p.getId(),
                        p.getTitulo(),
                        p.getEvento().getCategoria().getNomeCategoria(),
                        p.getEvento().getMaximoParticipantes(),
                        p.getEvento().getHoras(),
                        (double) repositoryInscricaoEvento.countByFkEvento(p.getEvento().getId()) * 100.0 / 1179.0,
                        p.getEvento().getDataEvento(),
                        p.getEvento().getDataFechamentoEvento(),
                        repositoryClique.countByPublicacao_Id(p.getId()),
                        repositoryGostei.countByFkPublicacao(p.getId()));
            }
        } catch (FormatterClosedException erro) {
            System.err.println("Erro ao gravar no arquivo");
            deuRuim = true;
        } finally { // bloco finally é executado independente de dar erro ou não
            // usado para fechar os objetos saida e close.
            saida.close();
            try {
                arq.close();
            } catch (IOException erro) {
                System.err.println("Erro ao fechar arquivo.");
                deuRuim = true;
            }
            if (deuRuim) {
                System.exit(1);
            }
        }

        Path path = Paths.get(nomeArquivo);
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Disposition", "attachment; filename=" + nomeArquivo);

        return ResponseEntity.status(200).headers(headers).body(resource);
    }

    public ResponseEntity exportarFuncionariosTXT() {
        List<Usuario> usuarios = repositoryUsuario.findAll();

        // Monta o registro header
        Date dataDeHoje = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyy-HHmmss");
        String nomeArq = "Arquivo-Funcionarios" + formatter.format(dataDeHoje) + ".txt";
        String header = "";
        String corpo = "";
        String trailer = "";
        int contRegDados = 0;

        formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        header += "00FUNCIONARIO20211";
        header += formatter.format(dataDeHoje);
        //Versão do Layout
        header += "01";

        // Grava o registro header
        gravaRegistro(nomeArq, header);

        for (Usuario u : usuarios) {
            corpo = "02";

            corpo += String.format("%-4s", u.getIdUsuario());
            corpo += String.format("%-50s", u.getNomeUsuario());
            corpo += String.format("%-30s", u.getCargo());
            corpo += String.format("%-30s", u.getArea());
            corpo += String.format("%-30s", u.getEmail());

            contRegDados++;

            gravaRegistro(nomeArq, corpo);
        }
        // monta o trailer
        trailer += "01";
        trailer += String.format("%010d", contRegDados);
        gravaRegistro(nomeArq, trailer);

        HttpHeaders headers = new HttpHeaders();
        Path path = Paths.get(nomeArq);
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        headers.add("Content-Disposition", "attachment; filename=" + nomeArq);

        return ResponseEntity.status(200).headers(headers).body(resource);
    }

    public ResponseEntity exportarFuncionariosCSV() {
        List<Usuario> usuarios = repositoryUsuario.findAll();
        Date dataDeHoje = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyy-HHmmss");
        FileWriter arq = null;        // objeto FileWriter - representa o arquivo
        Formatter saida = null;        // objeto Formatter para executar saída formatada
        boolean deuRuim = false;    // indica se deu erro

        String nomeArquivo = "Funcionarios" + formatter.format(dataDeHoje) + ".csv";

        try {
            arq = new FileWriter(nomeArquivo, true);  // true indica que vai fazer "append"
            saida = new Formatter(arq);
        } catch (IOException erro) {
            System.err.println("Erro ao abrir arquivo");
            System.exit(1);  // encerra o programa, com status de erro
        }

        try {
            for (Usuario u : usuarios) {

                saida.format("%d;%s;%s;%s;%s%n",
                        u.getIdUsuario(),
                        u.getNomeUsuario(),
                        u.getCargo(),
                        u.getArea(),
                        u.getEmail()
                );
            }
        } catch (FormatterClosedException erro) {
            System.err.println("Erro ao gravar no arquivo");
            deuRuim = true;
        } finally { // bloco finally é executado independente de dar erro ou não
            // usado para fechar os objetos saida e close.
            saida.close();
            try {
                arq.close();
            } catch (IOException erro) {
                System.err.println("Erro ao fechar arquivo.");
                deuRuim = true;
            }
            if (deuRuim) {
                System.exit(1);
            }
        }

        HttpHeaders headers = new HttpHeaders();
        Path path = Paths.get(nomeArquivo);
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        headers.add("Content-Disposition", "attachment; filename=" + nomeArquivo);

        return ResponseEntity.status(200).headers(headers).body(resource);
    }
}
