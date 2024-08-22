package Egzaminas.Egzaminas.controller;

import Egzaminas.Egzaminas.model.User;
import Egzaminas.Egzaminas.service.JwtService;
import Egzaminas.Egzaminas.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;  // Inject JwtService

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            User authenticatedUser = userService.loginUser(user);
            String token = jwtService.generateToken(authenticatedUser);  // Generate token
            return ResponseEntity.ok(new AuthResponse(token));  // Return token in response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/role")
    public ResponseEntity<?> getUserRole(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(Collections.singletonMap("role", user.getRole()));
    }

    public static class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}