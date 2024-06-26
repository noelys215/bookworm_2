package com.example.bookworm.backend.service;

import com.example.bookworm.backend.dto.UserDto;
import com.example.bookworm.backend.exception.UserNotFoundException;
import com.example.bookworm.backend.model.Loan;
import com.example.bookworm.backend.model.Role;
import com.example.bookworm.backend.model.User;
import com.example.bookworm.backend.repository.LoanRepository;
import com.example.bookworm.backend.repository.RoleRepository;
import com.example.bookworm.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void assignRoleToUser(String email, String roleName) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName));

        user.getRoles().add(role);
        userRepository.save(user);
    }

    public void removeRoleFromUser(String email, String roleName) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName));

        user.getRoles().remove(role);
        userRepository.save(user);
    }

//    public void removeAdminRoleFromUser(String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
//
//        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
//                .orElseThrow(() -> new IllegalArgumentException("Role not found: ROLE_ADMIN"));
//
//        if (user.getRoles().contains(adminRole)) {
//            user.getRoles().remove(adminRole);
//            userRepository.save(user);
//        } else {
//            throw new RuntimeException("User does not have admin role");
//        }
//    }


    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered: " + user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalArgumentException("Role not found: ROLE_USER")));
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public User createAdminUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered: " + user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalArgumentException("Role not found: 'ROLE_USER")));
        roles.add(roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new IllegalArgumentException("Role not found: 'ROLE_ADMIN")));
        user.setRoles(roles);

        return userRepository.save(user);
    }

//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRoles().stream().map(Role::getName).collect(Collectors.toSet())
                ))
                .collect(Collectors.toList());
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Check for active loans
        List<Loan> activeLoans = loanRepository.findByUserIdAndReturnDateIsNull(id);
        if (!activeLoans.isEmpty()) {
            throw new RuntimeException("Cannot delete user with active loans.");
        }

        // Delete all loans associated with the user
        List<Loan> loans = loanRepository.findByUserId(id);
        for (Loan loan : loans) {
            loanRepository.delete(loan);
        }

        userRepository.delete(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Highlighted: Method to get user details
    public UserDto getUserDetails(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        Set<String> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()); // Get role names
        return new UserDto(user.getId(), user.getName(), user.getEmail(), roles); // Updated constructor call
    }

    // Highlighted: Method to update user details (name and email)
    public void updateUserDetails(UserDto updatedUserDto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        user.setName(updatedUserDto.getName());
        user.setEmail(updatedUserDto.getEmail());
        userRepository.save(user);
    }

    // Highlighted: Method to update user password
    public void updateUserPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}



