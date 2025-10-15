package com.empresa.sistemarh.controller;

import com.empresa.sistemarh.dto.request.StatusRequest;
import com.empresa.sistemarh.dto.response.CandidatoCountResponse;
import com.empresa.sistemarh.exception.ResourceNotFoundException;
import com.empresa.sistemarh.model.Candidato;
import com.empresa.sistemarh.model.StatusCandidato;
import com.empresa.sistemarh.service.CandidatoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CandidatoController {

    @Autowired
    private CandidatoService candidatoService;

    @GetMapping("/vagas/{vagaId}/candidatos")
    public ResponseEntity<List<Candidato>> listarCandidatos(
            @PathVariable Long vagaId,
            @RequestParam(required = false) String filtro,
            @RequestParam(required = false) String status) {

        List<Candidato> candidatos;

        if (status != null && !status.isEmpty()) {
            StatusCandidato statusCandidato = StatusCandidato.valueOf(status.toUpperCase());
            candidatos = candidatoService.buscarPorVagaEStatus(vagaId, statusCandidato, filtro);
        } else {
            candidatos = candidatoService.buscarPorVagaENome(vagaId, filtro);
        }

        return ResponseEntity.ok(candidatos);
    }

    @GetMapping("/vagas/{vagaId}/candidatos/count")
    public ResponseEntity<CandidatoCountResponse> contarCandidatos(@PathVariable Long vagaId) {
        long count = candidatoService.contarCandidatosPorVaga(vagaId);
        long countChamados = candidatoService.contarCandidatosChamadosPorVaga(vagaId);

        CandidatoCountResponse response = new CandidatoCountResponse(count, countChamados);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/candidaturas")
    public ResponseEntity<Candidato> criarCandidatura(
            @RequestParam String nome,
            @RequestParam String email,
            @RequestParam String telefone,
            @RequestParam Long vagaId,
            @RequestParam(required = false) MultipartFile curriculo) {

        Candidato candidato = candidatoService.inscreverCandidato(
            vagaId, nome, email, telefone, curriculo
        );
        return ResponseEntity.ok(candidato);
    }

    @PatchMapping("/candidatos/{candidatoId}/chamar")
    public ResponseEntity<Candidato> chamarCandidatoParaEntrevista(@PathVariable Long candidatoId) {
        Candidato candidato = candidatoService.chamarParaEntrevista(candidatoId);
        return ResponseEntity.ok(candidato);
    }

    @PatchMapping("/candidatos/{candidatoId}/status")
    public ResponseEntity<Candidato> alterarStatusCandidato(
            @PathVariable Long candidatoId,
            @Valid @RequestBody StatusRequest request) {

        StatusCandidato novoStatus = StatusCandidato.valueOf(request.getStatus().toUpperCase());
        Candidato candidato = candidatoService.alterarStatusCandidato(candidatoId, novoStatus);
        return ResponseEntity.ok(candidato);
    }
}
