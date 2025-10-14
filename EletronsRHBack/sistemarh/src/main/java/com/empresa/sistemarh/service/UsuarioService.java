package com.empresa.sistemarh.service;

import com.empresa.sistemarh.model.Usuario;
import com.empresa.sistemarh.repository.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostConstruct
    public void init() {
        // Criar usuário admin padrão se não existir
        if (!usuarioRepository.existsByEmail("admin@eletrons.com")) {
            Usuario admin = new Usuario(
                "admin@eletrons.com",
                passwordEncoder.encode("eletrons2018@!"),
                "ADMIN"
            );
            usuarioRepository.save(admin);
            System.out.println("Usuário admin criado: admin@eletrons.com");
        }
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean validarSenha(String senhaInformada, String senhaArmazenada) {
        return passwordEncoder.matches(senhaInformada, senhaArmazenada);
    }

    public Usuario criarUsuario(String email, String senha, String role) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario = new Usuario(email, passwordEncoder.encode(senha), role);
        return usuarioRepository.save(usuario);
    }

    public Usuario autenticar(String email, String senha) {
        Optional<Usuario> usuarioOpt = buscarPorEmail(email);

        if (usuarioOpt.isEmpty()) {
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        Usuario usuario = usuarioOpt.get();

        if (!validarSenha(senha, usuario.getSenha())) {
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        return usuario;
    }
}
