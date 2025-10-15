package com.empresa.sistemarh.dto.response;

public class LoginResponse {

    private Long id;
    private String email;
    private String role;
    private boolean success;

    public LoginResponse() {
    }

    public LoginResponse(Long id, String email, String role) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.success = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
