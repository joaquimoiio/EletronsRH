package com.empresa.sistemarh.controller;

import com.empresa.sistemarh.dto.request.LoginRequest;
import com.empresa.sistemarh.dto.response.EstatisticasResponse;
import com.empresa.sistemarh.dto.response.LoginResponse;
import com.empresa.sistemarh.exception.UnauthorizedException;
import com.empresa.sistemarh.model.Area;
import com.empresa.sistemarh.model.Evento;
import com.empresa.sistemarh.model.Usuario;
import com.empresa.sistemarh.model.Vaga;
import com.empresa.sistemarh.service.AreaService;
import com.empresa.sistemarh.service.CandidatoService;
import com.empresa.sistemarh.service.EventoService;
import com.empresa.sistemarh.service.UsuarioService;
import com.empresa.sistemarh.service.VagaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AreaService areaService;

    @Autowired
    private VagaService vagaService;

    @Autowired
    private EventoService eventoService;

    @Autowired
    private CandidatoService candidatoService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Usuario usuario = usuarioService.autenticar(request.getEmail(), request.getSenha());
            LoginResponse response = new LoginResponse(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getRole()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new UnauthorizedException("Credenciais inválidas");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logout realizado com sucesso");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/estatisticas")
    public ResponseEntity<EstatisticasResponse> getEstatisticas() {
        List<Area> areas = areaService.listarTodas();
        List<Vaga> vagasAtivas = vagaService.listarVagasAtivas();
        List<Evento> eventos = eventoService.listarTodos();
        long totalCandidatos = candidatoService.contarTotalCandidatos();

        EstatisticasResponse response = new EstatisticasResponse(
            areas.size(),
            vagasAtivas.size(),
            eventos.size(),
            totalCandidatos
        );

        return ResponseEntity.ok(response);
    }
}
