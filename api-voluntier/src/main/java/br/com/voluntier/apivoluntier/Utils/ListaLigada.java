package br.com.voluntier.apivoluntier.Utils;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.Views.ViewCachePublicacao;

import java.util.ArrayList;
import java.util.List;

public class ListaLigada {

    private Node head;

    public Node getHead() {
        return head;
    }

    public ListaLigada(){
        this.head=new Node(null);
    }

    public void insereNode(ViewCachePublicacao valor){
        Node novoNode=new Node(valor);
        novoNode.setNext(this.head.getNext());
        this.head.setNext(novoNode);
    }

    public void exibe(){
        Node atual=this.head.getNext();
        while (atual!=null){
            System.out.print(atual.getInfo()+"\n");
            atual=atual.getNext();
        }
    }

    public List<ViewCachePublicacao> exibeLista(){
        List<ViewCachePublicacao> listaPub = new ArrayList<>();
        Node atual=this.head.getNext();
        while (atual!=null){
            listaPub.add(atual.getInfo());
            atual=atual.getNext();
        }
        return listaPub;
    }


    public Node buscaNode(ViewCachePublicacao valor){
        Node atual=this.head.getNext();
        while (atual!=null){
            if (atual.getInfo()==valor){
                return atual;
            }
            atual=atual.getNext();
        }
        return null;
    }


    public boolean removeNode(ViewCachePublicacao valor){
        Node ant=this.head;
        Node atual=this.head.getNext();
        while (atual!=null){
            if (atual.getInfo()==valor){
                ant.setNext(atual.getNext());
                return true;
            }
            ant=ant.getNext();
            atual=atual.getNext();
        }
        return false;
    }


    public Integer getTamanho(){
        Node atual=this.head.getNext();
        int tam=0;
        while (atual!=null){
            tam++;
            atual=atual.getNext();
        }
        return tam;
    }


    public void concatena(ListaLigada listaNova){
        Node atual=this.head.getNext();
        Node nodesNovo=listaNova.head.getNext();
        while (atual!=null){
            atual=atual.getNext();
        }

        while (nodesNovo!=null){
            this.insereNode(nodesNovo.getInfo());
            nodesNovo=nodesNovo.getNext();
        }

        exibe();

    }

    public boolean comparar(ListaLigada lista){
        Node atual=this.head.getNext();
        Node listaFora=lista.head.getNext();

        while (atual!=null || listaFora!=null){
            if (atual.getInfo()!=listaFora.getInfo()){
                return false;
            }
            atual=atual.getNext();
            listaFora=listaFora.getNext();
        }
        return true;
    }

    public void inverte(){
        Node nodeAtual=this.head.getNext();
        Node nodeProxima=this.head.getNext().getNext();
        Node nodeAux;
        nodeAtual.setNext(null);
        while (nodeProxima!=null){
            nodeAux = nodeProxima.getNext();
            nodeProxima.setNext(nodeAtual);
            nodeAtual=nodeProxima;
            nodeProxima=nodeAux;
        }
        head.setNext(nodeAtual);
    }




}
