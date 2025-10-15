package com.empresa.sistemarh.controller;

import com.empresa.sistemarh.dto.request.EventoRequest;
import com.empresa.sistemarh.exception.BusinessException;
import com.empresa.sistemarh.exception.ResourceNotFoundException;
import com.empresa.sistemarh.model.Evento;
import com.empresa.sistemarh.model.ImagemEvento;
import com.empresa.sistemarh.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        return ResponseEntity.ok(eventoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscarEvento(@PathVariable Long id) {
        Evento evento = eventoService.buscarPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Evento", id));
        return ResponseEntity.ok(evento);
    }

    @PostMapping
    public ResponseEntity<Evento> criarEvento(
            @RequestParam String titulo,
            @RequestParam(required = false) MultipartFile imagemCapa) {

        try {   
            Evento evento = eventoService.criarEvento(titulo, imagemCapa);
            return ResponseEntity.ok(evento);
        } catch (IOException e) {
            throw new BusinessException("Erro ao fazer upload da imagem: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> atualizarEvento(
            @PathVariable Long id,
            @Valid @RequestBody EventoRequest request) {

        if (!eventoService.buscarPorId(id).isPresent()) {
            throw new ResourceNotFoundException("Evento", id);
        }

        Evento evento = eventoService.atualizarEvento(id, request.getDescricao());
        return ResponseEntity.ok(evento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEvento(@PathVariable Long id) {
        if (!eventoService.buscarPorId(id).isPresent()) {
            throw new ResourceNotFoundException("Evento", id);
        }
        eventoService.deletarEvento(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/imagens")
    public ResponseEntity<List<ImagemEvento>> listarImagensEvento(@PathVariable Long id) {
        if (!eventoService.buscarPorId(id).isPresent()) {
            throw new ResourceNotFoundException("Evento", id);
        }
        return ResponseEntity.ok(eventoService.listarImagensEvento(id));
    }

    @PostMapping("/{id}/imagens")
    public ResponseEntity<ImagemEvento> adicionarImagemEvento(
            @PathVariable Long id,
            @RequestParam MultipartFile imagem) {

        if (!eventoService.buscarPorId(id).isPresent()) {
            throw new ResourceNotFoundException("Evento", id);
        }

        try {
            ImagemEvento imagemEvento = eventoService.adicionarImagemEvento(id, imagem);
            return ResponseEntity.ok(imagemEvento);
        } catch (IOException e) {
            throw new BusinessException("Erro ao fazer upload da imagem: " + e.getMessage());
        }
    }

    @DeleteMapping("/imagens/{imagemId}")
    public ResponseEntity<Void> deletarImagemEvento(@PathVariable Long imagemId) {
        eventoService.deletarImagemEvento(imagemId);
        return ResponseEntity.ok().build();
    }
}
