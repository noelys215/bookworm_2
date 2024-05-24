//package com.example.bookworm.backend.config;
//
//import com.example.bookworm.backend.model.Role;
//import com.example.bookworm.backend.model.User;
//import com.example.bookworm.backend.repository.RoleRepository;
//import com.example.bookworm.backend.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DataInitializer {
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Bean
//    CommandLineRunner init() {
//        return args -> {
//            Role userRole = new Role();
//            userRole.setName("ROLE_USER");
//            roleRepository.save(userRole);
//
//            Role adminRole = new Role();
//            adminRole.setName("ROLE_ADMIN");
//            roleRepository.save(adminRole);
//
//            User adminUser = new User();
//            adminUser.setEmail("admin@example.com");
//            adminUser.setPassword("admin123");
//            adminUser.setName("Admin");
//            userService.createAdminUser(adminUser);
//        };
//    }
//}
