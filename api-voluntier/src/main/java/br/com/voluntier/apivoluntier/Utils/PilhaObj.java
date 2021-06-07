package br.com.voluntier.apivoluntier.Utils;

public class PilhaObj<T> {
    private int topo;
    private T[] pilha;
    public PilhaObj(int capacidade) {
        pilha = (T[]) new Object[capacidade];
        topo = -1;
    }

    public boolean isEmpty() {
        if(topo == -1) {
            return true;
        }
        return false;
    }

    public boolean isFull() {
        if(topo == pilha.length-1) {
            return true;
        }
        return false;
    }

    public void push(T info) {
        if(!this.isFull()) {
            pilha[++topo] = info;
        }
    }

    public T pop() {
        if(!this.isEmpty()) {
            return pilha[topo--];
        }else {
            return null;
        }
    }

    public T peek() {
        if(!this.isEmpty()) {
            return pilha[topo];
        }else {
            return null;
        }
    }

    public void exibe() {
        if(this.isEmpty()) {
            System.out.println("Pilha vazia");
        }else {
            for(int i = 0; i <= topo; i++) {
                System.out.println(pilha[i]);
            }
        }
    }
}
