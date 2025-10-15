package com.empresa.sistemarh.dto.response;

public class EstatisticasResponse {

    private long totalAreas;
    private long vagasAtivas;
    private long totalEventos;
    private long totalCandidatos;

    public EstatisticasResponse() {
    }

    public EstatisticasResponse(long totalAreas, long vagasAtivas, long totalEventos, long totalCandidatos) {
        this.totalAreas = totalAreas;
        this.vagasAtivas = vagasAtivas;
        this.totalEventos = totalEventos;
        this.totalCandidatos = totalCandidatos;
    }

    public long getTotalAreas() {
        return totalAreas;
    }

    public void setTotalAreas(long totalAreas) {
        this.totalAreas = totalAreas;
    }

    public long getVagasAtivas() {
        return vagasAtivas;
    }

    public void setVagasAtivas(long vagasAtivas) {
        this.vagasAtivas = vagasAtivas;
    }

    public long getTotalEventos() {
        return totalEventos;
    }

    public void setTotalEventos(long totalEventos) {
        this.totalEventos = totalEventos;
    }

    public long getTotalCandidatos() {
        return totalCandidatos;
    }

    public void setTotalCandidatos(long totalCandidatos) {
        this.totalCandidatos = totalCandidatos;
    }
}
