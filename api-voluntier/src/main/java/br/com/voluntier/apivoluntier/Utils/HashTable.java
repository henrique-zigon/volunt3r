package br.com.voluntier.apivoluntier.Utils;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.Views.ViewCachePublicacao;

import javax.annotation.PostConstruct;
import java.util.List;

public class HashTable {

    ListaLigada[] tabela;


    public HashTable(int numeroEntradas) {
        this.tabela = tabela;
        this.tabela= new ListaLigada[numeroEntradas];
        for (int i=0; i<numeroEntradas;i++){
            tabela[i]=new ListaLigada();
        }
    }

    public Integer funcaoHash(ViewCachePublicacao pub){
        //System.out.println(pub.getEvento().getCategoria().getNivel()-1);
        return pub.getnivel()-1;
    }

    public void insere(ViewCachePublicacao pub){
        Integer resto=funcaoHash(pub);
        this.tabela[resto].insereNode(pub);
    }

    public boolean busca(ViewCachePublicacao pub){
        Integer resto=funcaoHash(pub);
        Node nodeEncontrado=tabela[resto].buscaNode(pub);
        if(nodeEncontrado==null){
            return false;
        }
        return true;
    }

    public boolean remove(ViewCachePublicacao pub){
        if (busca(pub)){
            Integer resto=funcaoHash(pub);
            tabela[resto].removeNode(pub);
            return true;
        }
        else {
            return false;
        }
    }

    public List<ViewCachePublicacao> getLista(int nivel){
        return tabela[nivel].exibeLista();
    }
}
