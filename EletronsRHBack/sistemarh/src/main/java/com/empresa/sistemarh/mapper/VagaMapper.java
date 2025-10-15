package com.empresa.sistemarh.mapper;

import com.empresa.sistemarh.dto.request.VagaRequest;
import com.empresa.sistemarh.model.Area;
import com.empresa.sistemarh.model.Vaga;
import org.springframework.stereotype.Component;

@Component
public class VagaMapper {

    public Vaga toEntity(VagaRequest request, Area area) {
        Vaga vaga = new Vaga(request.getTitulo(), area, request.getDescricao());
        vaga.setRequisitos(request.getRequisitos());
        vaga.setBeneficios(request.getBeneficios());
        vaga.setSalario(request.getSalario());
        vaga.setLocalizacao(request.getLocalizacao());
        return vaga;
    }

    public void updateEntity(Vaga vaga, VagaRequest request, Area area) {
        vaga.setTitulo(request.getTitulo());
        vaga.setArea(area);
        vaga.setDescricao(request.getDescricao());
        vaga.setRequisitos(request.getRequisitos());
        vaga.setBeneficios(request.getBeneficios());
        vaga.setSalario(request.getSalario());
        vaga.setLocalizacao(request.getLocalizacao());
    }
}
