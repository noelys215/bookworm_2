package com.example.bookworm.backend.controllers;

import com.example.bookworm.backend.dto.RoleAssignmentRequest;
import com.example.bookworm.backend.dto.UserDto;
import com.example.bookworm.backend.model.Loan;
import com.example.bookworm.backend.model.User;
import com.example.bookworm.backend.repository.LoanRepository;
import com.example.bookworm.backend.repository.UserRepository;
import com.example.bookworm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/assign-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> assignRoleToUser(@RequestBody RoleAssignmentRequest request) {
        userService.assignRoleToUser(request.getEmail(), request.getRoleName());
        return ResponseEntity.ok().build();
    }

    // New endpoint to remove the admin role

    @PostMapping("/remove-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> removeRoleFromUser(@RequestBody RoleAssignmentRequest request) {
        userService.removeRoleFromUser(request.getEmail(), request.getRoleName());
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Highlighted: Updated method to return UserDto without password
    @GetMapping("/me")
    public ResponseEntity<UserDto> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserDto userDto = userService.getUserDetails(email);
        return ResponseEntity.ok(userDto);
    }

    // Highlighted: Updated method to update only name and email
    @PutMapping("/me")
    public ResponseEntity<Void> updateAuthenticatedUser(@RequestBody UserDto updatedUserDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        userService.updateUserDetails(updatedUserDto, email);
        return ResponseEntity.ok().build();
    }

    // Highlighted: Added method to update password separately
    @PutMapping("/me/password")
    public ResponseEntity<Void> updateAuthenticatedUserPassword(@RequestBody Map<String, String> passwordMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String newPassword = passwordMap.get("newPassword");
        userService.updateUserPassword(email, newPassword);
        return ResponseEntity.ok().build();
    }

    // Method to get the authenticated user's loans
    @GetMapping("/me/loans")
    @PreAuthorize("isAuthenticated()")
    public List<Loan> getAuthenticatedUserLoans() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        // Filter loans to return only active ones (those without a return date)
        return loanRepository.findByUserIdAndReturnDateIsNull(user.getId());
    }
}







