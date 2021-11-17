package br.com.voluntier.apivoluntier.Services;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Repositories.EventoRepository;
import br.com.voluntier.apivoluntier.Repositories.GosteiRepository;
import br.com.voluntier.apivoluntier.Repositories.PublicacaoRepository;
import br.com.voluntier.apivoluntier.Utils.HashTable;
import br.com.voluntier.apivoluntier.Utils.ListaLigada;
import br.com.voluntier.apivoluntier.Utils.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class HashService {

    HashTable hashTable;

    @Autowired
    PublicacaoRepository publicacaoRepository;


    @PostConstruct
    public void ConstrutorHashService(){
        hashTable = new HashTable(4);

        List<Publicacao> listaPub=publicacaoRepository.findAll();
        publicacaoRepository.findByPublicaoCache().forEach((item) -> {
            System.out.println(item.getId());
            System.out.println(item.getTitulo());
            System.out.println(item.getQuantidadeGostei());
        });

        for (Publicacao pub : listaPub){
            //System.out.println(pub.getLikes().stream().map((gostei) -> 1).reduce(Integer::sum).orElse(0));
            //hashTable.insere(pub);
        }
    }

    public HashTable getHashTable(){
        return hashTable;
    }

}
