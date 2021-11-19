package br.com.voluntier.apivoluntier.Utils;

import br.com.voluntier.apivoluntier.Models.Publicacao;
import br.com.voluntier.apivoluntier.Models.Views.ViewCachePublicacao;

public class Node {
    private ViewCachePublicacao info;
    private Node next;

    public Node(ViewCachePublicacao info) {
        this.info = info;
        this.next=null;
    }

    public ViewCachePublicacao getInfo() {
        return info;
    }

    public void setInfo(ViewCachePublicacao info) {
        this.info = info;
    }

    public Node getNext() {
        return next;
    }

    public void setNext(Node next) {
        this.next = next;
    }
}
