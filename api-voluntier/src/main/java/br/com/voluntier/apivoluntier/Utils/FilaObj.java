package br.com.voluntier.apivoluntier.Utils;

public class FilaObj<T>{
    private int tamanho;
    private T[] fila;

    public FilaObj(int capacidade) {
        this.tamanho = 0;
        this.fila = (T[]) new Object[capacidade];
    }

    public boolean isEmpty() {
        return tamanho == 0;
    }

    public boolean isFull() {
        return tamanho == fila.length;
    }

    public void insert(T info) {
        if(this.isFull()) {
            return;
        }
        this.fila[tamanho++] = info;
    }

    public T peek() {
        return fila[0];
    }

    public T poll() {
        if(isEmpty()) {
            return null;
        }
        T retorno = fila[0];
        for(int i = 1; i < tamanho; i++) {
            fila[i-1] = fila[i];
        }
        tamanho--;
        return retorno;
    }

    public void exibe() {
        if(this.isEmpty()) {
            System.out.println("Ex1.Fila vazia");
        }
        for(int i = 0; i < tamanho; i++) {
            System.out.println(fila[i]);
        }
    }
}