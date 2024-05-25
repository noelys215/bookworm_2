## SecurityConfig Documentation

### Overview

The SecurityConfig class is a configuration class that sets up the security for the application using Spring Security.
It defines beans and security policies to handle authentication and authorization, ensuring that only authorized users
can access certain endpoints and perform specific actions.

### File: SecurityConfig.java

Annotations

* @Configuration: Indicates that the class declares one or more @Bean methods and can be processed by the Spring
  container to generate bean definitions and service requests for those beans at runtime.
* @EnableWebSecurity: Enables Spring Security's web security support and provides the Spring MVC integration.

### Beans and Methods

1. PasswordEncoder

```java

@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

* Purpose: Defines a bean for PasswordEncoder that uses BCrypt hashing algorithm.
* Why: Passwords are hashed to ensure that they are stored securely and cannot be easily decrypted.

2. UserDetailsService

```jave
@Bean
public UserDetailsService userDetailsService() {
    return new CustomUserDetailsService();
}
```

* Purpose: Defines a bean for UserDetailsService that provides a way to retrieve user-related data.
* Why: UserDetailsService is used to load user-specific data, including username, password, and authorities.

3. AuthenticationManager

```java

@Bean
public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder, UserDetailsService userDetailsService) throws Exception {
    return http.getSharedObject(AuthenticationManagerBuilder.class)
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder)
            .and()
            .build();
}
```

* Purpose: Configures the AuthenticationManager with UserDetailsService and PasswordEncoder.
* Why: The AuthenticationManager is responsible for processing authentication requests.

4. SecurityFilterChain

```java

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authz -> authz
                    .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/books").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/api/books/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/api/books/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/api/users/assign-role").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "/api/books").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/loans").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "/api/loans/active").authenticated()
                    .requestMatchers(HttpMethod.GET, "/api/loans/**").authenticated()
                    .requestMatchers(HttpMethod.POST, "/api/loans").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/loans/return/**").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/api/loans/mark-lost/**").authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/api/loans/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "/api/users").hasRole("ADMIN")
                    .anyRequest().authenticated()
            )
            .formLogin(form -> form
                    .loginPage("/login")
                    .successHandler(loginSuccessHandler())
                    .permitAll()
            )
            .logout(logout -> logout
                    .logoutUrl("/logout")
                    .logoutSuccessHandler((request, response, authentication) -> {
                        response.setStatus(HttpServletResponse.SC_OK);
                    })
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .permitAll()
            )
            .exceptionHandling(exceptions -> exceptions
                    .authenticationEntryPoint(authenticationEntryPoint())
            );
    return http.build();
}
```

* Purpose: Defines the security filter chain that specifies which endpoints require authentication and what roles are
  required to access them.
* Why: This configuration secures the endpoints and ensures that only authorized users can access sensitive parts of the
  application.

### Endpoint Security Policies:

* POST /api/users: Permitted for all users (registration).
* POST /api/books: Restricted to users with ADMIN role.
* DELETE /api/books/**: Restricted to users with ADMIN role.
* PUT /api/books/**: Restricted to users with ADMIN role.
* POST /api/users/assign-role: Restricted to users with ADMIN role.
* GET /api/books: Permitted for all users.
* GET /api/loans: Restricted to users with ADMIN role.
* GET /api/loans/active: Restricted to authenticated users.
* GET /api/loans/**: Restricted to authenticated users.
* POST /api/loans: Restricted to authenticated users.
* PUT /api/loans/return/**: Restricted to authenticated users.
* PUT /api/loans/mark-lost/**: Restricted to authenticated users.
* DELETE /api/loans/**: Restricted to users with ADMIN role.
* GET /api/users: Restricted to users with ADMIN role.
* All other requests require authentication.

### Form Login and Logout:

* Custom login page at /login.
* Successful login returns "Login successful" response.
* Logout URL at /logout, invalidates session and deletes cookies.

### Exception Handling:

Custom authentication entry point to handle unauthorized access attempts.

5. AuthenticationEntryPoint

```java

@Bean
public AuthenticationEntryPoint authenticationEntryPoint() {
    return new Http403ForbiddenEntryPoint();
}
```

* Purpose: Defines a bean for handling authentication entry point.
* Why: Customizes the response for unauthorized requests by returning a 403 Forbidden status.

6. AuthenticationSuccessHandler

```jave
@Bean
public AuthenticationSuccessHandler loginSuccessHandler() {
    return (request, response, authentication) -> {
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Login successful");
        response.getWriter().flush();
    };
}
```

* Purpose: Defines a bean for handling successful authentication.
* Why: Customizes the response for successful logins by returning a 200 OK status with a message.

### Summary

The SecurityConfig class configures the security of the application, specifying how authentication and authorization
should be handled. It defines beans for password encoding, user details service, authentication manager, security filter
chain, authentication entry point, and success handler. The configuration enforces security policies, ensuring that only
authenticated and authorized users can access specific endpoints and perform certain actions.