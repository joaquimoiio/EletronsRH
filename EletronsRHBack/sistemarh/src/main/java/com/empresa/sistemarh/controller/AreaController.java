package com.empresa.sistemarh.controller;

import com.empresa.sistemarh.dto.request.AreaRequest;
import com.empresa.sistemarh.exception.ResourceNotFoundException;
import com.empresa.sistemarh.mapper.AreaMapper;
import com.empresa.sistemarh.model.Area;
import com.empresa.sistemarh.service.AreaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/areas")
@CrossOrigin(origins = "*")
public class AreaController {

    @Autowired
    private AreaService areaService;

    @Autowired
    private AreaMapper areaMapper;

    @GetMapping
    public ResponseEntity<List<Area>> listarAreas() {
        return ResponseEntity.ok(areaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Area> buscarArea(@PathVariable Long id) {
        Area area = areaService.buscarPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Área", id));
        return ResponseEntity.ok(area);
    }

    @PostMapping
    public ResponseEntity<Area> criarArea(@Valid @RequestBody AreaRequest request) {
        Area area = areaMapper.toEntity(request);
        Area areaSalva = areaService.salvar(area);
        return ResponseEntity.ok(areaSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Area> atualizarArea(
            @PathVariable Long id,
            @Valid @RequestBody AreaRequest request) {

        Area area = areaService.buscarPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Área", id));

        areaMapper.updateEntity(area, request);
        Area areaAtualizada = areaService.salvar(area);
        return ResponseEntity.ok(areaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarArea(@PathVariable Long id) {
        if (!areaService.buscarPorId(id).isPresent()) {
            throw new ResourceNotFoundException("Área", id);
        }
        areaService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
