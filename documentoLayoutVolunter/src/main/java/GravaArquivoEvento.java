import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class GravaArquivoEvento {

    public static void gravaRegistro (String nomeArq, String registro) {
        BufferedWriter saida = null;
        try {
            // o argumento true é para indicar que o arquivo não será sobrescrito e sim
            // gravado com append (no final do arquivo)
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



    public static void main(String[] args) {

//        Scanner leitor = new Scanner(System.in);   // leitor para uso geral, menos nextLine()
//        Scanner leitorNL = new Scanner(System.in); // leitor para usar para ler com nextLine()

        String nomeArq = "Arquivo_Eventos.txt";
        String header = "";
        String corpo = "";
        String trailer = "";
        int contRegDados = 0;
        boolean fim = false;
        String idEvento, nomeEvento, categoria, dataAbertura, dataFechamento;
        double aderencia;
        int numeroParticipantes, horas, cliques, likes;

        // Monta o registro header
        Date dataDeHoje = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        header += "00EVENTO20211";
        header += formatter.format(dataDeHoje);
        //Versão do Layout
        header += "01";

        // Grava o registro header
        gravaRegistro(nomeArq, header);

//        while (!fim) {
//            System.out.println("\n" +
//                    "1.\tAdicionar um evento\n" +
//                    "2.\tSair\n"
//            );
//
//            int opcao = leitor.nextInt();
//
//            switch (opcao) {
//                case 1:
//                    System.out.println("Digite o id:");
//                    idEvento = leitor.next();
//
//                    System.out.println("Digite o nome:");
//                    nomeEvento = leitorNL.nextLine();
//
//                    System.out.println("Digite a categoria:");
//                    categoria = leitorNL.nextLine();
//
//                    System.out.println("Digite o número de participantes:");
//                    numeroParticipantes = leitor.nextInt();
//
//                    System.out.println("Digite as horas do evento:");
//                    horas = leitor.nextInt();
//
//                    System.out.println("Digite a aderência que o evento teve:");
//                    aderencia = leitor.nextDouble();
//
//                    System.out.println("Digite a data de abertura (dia-mes-ano):");
//                    dataAbertura = leitor.next();
//
//                    System.out.println("Digite a data de fechamento (dia-mes-ano):");
//                    dataFechamento = leitor.next();
//
//                    System.out.println("Digite quantos cliques o evento teve:");
//                    cliques = leitor.nextInt();
//
//                    System.out.println("Digite quantos likes o evento teve:");
//                    likes = leitor.nextInt();

                    corpo = "02";

                    corpo += String.format("%-4s", 01);
                    corpo += String.format("%-50s", "Doação de sangue");
                    corpo += String.format("%-2s", "N2");
                    corpo += String.format("%4s", 20);
                    corpo += String.format("%4s", 8);
                    corpo += String.format("%5s", 65.0);
                    corpo += String.format("%-10s", "20-04-2021");
                    corpo += String.format("%-10s", "20-04-2021");
                    corpo += String.format("%4s", 40);
                    corpo += String.format("%4s", 15);

                    contRegDados++;

                    gravaRegistro(nomeArq, corpo);
//                    break;
//
//                case 2:
//                    fim = true;
                    // monta o trailer
                    trailer += "01";
                    trailer += String.format("%010d", contRegDados);
                    gravaRegistro(nomeArq, trailer);
//                    System.out.println("Programa encerrado");
//                    break;

//                default:
//                    System.out.println("Opção inválida!");
//                    break;
//            }

            new Scanner(System.in).next();
        }
    }


