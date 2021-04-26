import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class GravaArquivoFuncionario {

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

        Scanner leitor = new Scanner(System.in);   // leitor para uso geral, menos nextLine()
        Scanner leitorNL = new Scanner(System.in); // leitor para usar para ler com nextLine()

        String nomeArq = "Arquivo_Funcionario.txt";
        String header = "";
        String corpo = "";
        String trailer = "";
        int contRegDados = 0;
        boolean fim = false;
        String idFuncionario, nomeFuncionario, cargo, classificacao;
        double horasN1, horasN2, horasN3, horasN4, score;
        int qtdN1, qtdN2, qtdN3, qtdN4, qtdTotal;

        // Monta o registro header
        Date dataDeHoje = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        header += "00FUNCIONARIO20211";
        header += formatter.format(dataDeHoje);
        header += "01";

        // Grava o registro header
        gravaRegistro(nomeArq, header);

        while (!fim) {
            System.out.println("\n" +
                    "1.\tAdicionar um funcionário\n" +
                    "2.\tSair\n"
            );

            int opcao = leitor.nextInt();

            switch (opcao) {
                case 1:
                    System.out.println("Digite o id:");
                    idFuncionario = leitor.next();

                    System.out.println("Digite o nome:");
                    nomeFuncionario = leitorNL.nextLine();

                    System.out.println("Digite a cargo:");
                    cargo = leitorNL.nextLine();

                    System.out.println("Digite a classificação (N1, N2, N3 ou N4):");
                    classificacao = leitor.next();

                    System.out.println("Digite as horas gastas em eventos N1:");
                    horasN1 = leitor.nextDouble();

                    System.out.println("Digite as horas gastas em eventos N2:");
                    horasN2 = leitor.nextDouble();

                    System.out.println("Digite as horas gastas em eventos N3:");
                    horasN3 = leitor.nextDouble();

                    System.out.println("Digite as horas gastas em eventos N4:");
                    horasN4 = leitor.nextDouble();

                    System.out.println("Digite a quantidade de participações em evento N1:");
                    qtdN1 = leitor.nextInt();

                    System.out.println("Digite a quantidade de participações em evento N2:");
                    qtdN2 = leitor.nextInt();

                    System.out.println("Digite a quantidade de participações em evento N3:");
                    qtdN3 = leitor.nextInt();

                    System.out.println("Digite a quantidade de participações em evento N4:");
                    qtdN4 = leitor.nextInt();

                    System.out.println("Digite a quantidade total de participações:");
                    qtdTotal = leitor.nextInt();

                    System.out.println("Digite a pontuação do funcionário:");
                    score = leitor.nextDouble();

                    corpo = "02";

                    corpo += String.format("%-4s", idFuncionario);
                    corpo += String.format("%-50s", nomeFuncionario);
                    corpo += String.format("%-30s", cargo);
                    corpo += String.format("%-2s", classificacao);
                    corpo += String.format("%4s", horasN1);
                    corpo += String.format("%4s", horasN2);
                    corpo += String.format("%4s", horasN3);
                    corpo += String.format("%4s", horasN4);
                    corpo += String.format("%3s", qtdN1);
                    corpo += String.format("%3s", qtdN2);
                    corpo += String.format("%3s", qtdN3);
                    corpo += String.format("%3s", qtdN4);
                    corpo += String.format("%4s", qtdTotal);
                    corpo += String.format("%7s", score);

                    contRegDados++;

                    gravaRegistro(nomeArq, corpo);
                    break;

                case 2:
                    fim = true;
                    // monta o trailer
                    trailer += "01";
                    trailer += String.format("%010d", contRegDados);
                    gravaRegistro(nomeArq, trailer);
                    System.out.println("Programa encerrado");
                    break;

                default:
                    System.out.println("Opção inválida!");
                    break;
            }
        }
    }

}
