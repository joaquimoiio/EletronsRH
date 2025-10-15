package com.empresa.sistemarh.dto.request;

import jakarta.validation.constraints.Size;

public class EventoRequest {

    @Size(max = 5000, message = "Descrição deve ter no máximo 5000 caracteres")
    private String descricao;

    public EventoRequest() {
    }

    public EventoRequest(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
