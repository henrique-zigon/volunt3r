package br.com.voluntier.apivoluntier.Utils;

import br.com.voluntier.apivoluntier.Models.Publicacao;

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

    public Integer funcaoHash(Publicacao pub){
        System.out.println(pub.getEvento().getCategoria().getNivel()-1);
        return pub.getEvento().getCategoria().getNivel()-1;
    }

    public void insere(Publicacao pub){
        Integer resto=funcaoHash(pub);
        this.tabela[resto].insereNode(pub);
    }

    public boolean busca(Publicacao pub){
        Integer resto=funcaoHash(pub);
        Node nodeEncontrado=tabela[resto].buscaNode(pub);
        if(nodeEncontrado==null){
            return false;
        }
        return true;
    }

    public boolean remove(Publicacao pub){
        if (busca(pub)){
            Integer resto=funcaoHash(pub);
            tabela[resto].removeNode(pub);
            return true;
        }
        else {
            return false;
        }
    }

    public List<Publicacao> getLista(int nivel){
        return tabela[nivel].exibeLista();
    }
}
