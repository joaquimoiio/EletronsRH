package com.empresa.sistemarh.controller;

import com.empresa.sistemarh.dto.VagaDTO;
import com.empresa.sistemarh.dto.request.StatusRequest;
import com.empresa.sistemarh.dto.request.VagaRequest;
import com.empresa.sistemarh.exception.ResourceNotFoundException;
import com.empresa.sistemarh.mapper.VagaMapper;
import com.empresa.sistemarh.model.Area;
import com.empresa.sistemarh.model.StatusVaga;
import com.empresa.sistemarh.model.Vaga;
import com.empresa.sistemarh.service.AreaService;
import com.empresa.sistemarh.service.CandidatoService;
import com.empresa.sistemarh.service.VagaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vagas")
@CrossOrigin(origins = "*")
public class VagaController {

    @Autowired
    private VagaService vagaService;

    @Autowired
    private AreaService areaService;

    @Autowired
    private CandidatoService candidatoService;

    @Autowired
    private VagaMapper vagaMapper;

    @GetMapping
    public ResponseEntity<List<VagaDTO>> listarTodasVagas() {
        List<Vaga> vagas = vagaService.listarTodas();
        List<VagaDTO> vagasDTO = vagas.stream()
            .map(vaga -> {
                long candidatosCount = candidatoService.contarCandidatosPorVaga(vaga.getId());
                long candidatosChamadosCount = candidatoService.contarCandidatosChamadosPorVaga(vaga.getId());
                return new VagaDTO(vaga, candidatosCount, candidatosChamadosCount);
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(vagasDTO);
    }

    @GetMapping("/ativas")
    public ResponseEntity<List<Vaga>> listarVagasAtivas() {
        return ResponseEntity.ok(vagaService.listarVagasAtivas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaga> buscarVaga(@PathVariable Long id) {
        Vaga vaga = vagaService.buscarPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Vaga", id));
        return ResponseEntity.ok(vaga);
    }

    @PostMapping
    public ResponseEntity<Vaga> criarVaga(@Valid @RequestBody VagaRequest request) {
        Area area = areaService.buscarPorId(request.getAreaId())
            .orElseThrow(() -> new ResourceNotFoundException("Área", request.getAreaId()));

        Vaga vaga = vagaMapper.toEntity(request, area);
        Vaga vagaSalva = vagaService.salvar(vaga);
        return ResponseEntity.ok(vagaSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaga> atualizarVaga(
            @PathVariable Long id,
            @Valid @RequestBody VagaRequest request) {

        Vaga vaga = vagaService.buscarPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Vaga", id));

        Area area = areaService.buscarPorId(request.getAreaId())
            .orElseThrow(() -> new ResourceNotFoundException("Área", request.getAreaId()));

        vagaMapper.updateEntity(vaga, request, area);
        Vaga vagaAtualizada = vagaService.salvar(vaga);
        return ResponseEntity.ok(vagaAtualizada);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> alterarStatusVaga(
            @PathVariable Long id,
            @Valid @RequestBody StatusRequest request) {

        if (!vagaService.buscarPorId(id).isPresent()) {
            throw new ResourceNotFoundException("Vaga", id);
        }

        StatusVaga statusVaga = StatusVaga.valueOf(request.getStatus());
        vagaService.alterarStatus(id, statusVaga);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVaga(@PathVariable Long id) {
        if (!vagaService.buscarPorId(id).isPresent()) {
            throw new ResourceNotFoundException("Vaga", id);
        }
        vagaService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
