package com.empresa.sistemarh.dto.response;

public class CandidatoCountResponse {

    private long total;
    private long chamados;

    public CandidatoCountResponse() {
    }

    public CandidatoCountResponse(long total, long chamados) {
        this.total = total;
        this.chamados = chamados;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getChamados() {
        return chamados;
    }

    public void setChamados(long chamados) {
        this.chamados = chamados;
    }
}
