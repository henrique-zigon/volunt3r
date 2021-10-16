package br.com.voluntier.apivoluntier.Utils;

import br.com.voluntier.apivoluntier.Models.Publicacao;

public class Node {
    private Publicacao info;
    private Node next;

    public Node(Publicacao info) {
        this.info = info;
        this.next=null;
    }

    public Publicacao getInfo() {
        return info;
    }

    public void setInfo(Publicacao info) {
        this.info = info;
    }

    public Node getNext() {
        return next;
    }

    public void setNext(Node next) {
        this.next = next;
    }
}
