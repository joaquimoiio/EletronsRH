package com.empresa.sistemarh.mapper;

import com.empresa.sistemarh.dto.request.AreaRequest;
import com.empresa.sistemarh.model.Area;
import org.springframework.stereotype.Component;

@Component
public class AreaMapper {

    public Area toEntity(AreaRequest request) {
        return new Area(request.getNome().trim());
    }

    public void updateEntity(Area area, AreaRequest request) {
        area.setNome(request.getNome().trim());
    }
}
