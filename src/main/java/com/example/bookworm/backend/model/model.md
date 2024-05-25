## Entity Classes Classes Documentation

### Overview

This documentation provides an overview of the Person, User, and Role entity classes used in the application. These
classes represent the core entities within the system and define their attributes, relationships, and behaviors.
Additionally, the Person and User classes demonstrate inheritance and polymorphism.

### Person

The Person class is an abstract base class mapped as a superclass. It defines common attributes and methods for entities
that represent a person.

```java

@MappedSuperclass
public abstract class Person {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // Constructors
    public Person() {
    }

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    /* Polymorphism */
    public void displayInfo() {
        System.out.println("Person Name: " + name + ", Email: " + email);
    }
}
```

### Attributes

* name: The name of the person. It is a mandatory field.
* email: The email address of the person. It is a mandatory and unique field.

### Methods

* displayInfo(): A method to display information about the person. This method demonstrates polymorphism by being
  overridden in the User class.

### User

The User class extends Person and adds additional attributes and relationships specific to a user entity.

```java

@Entity
@Table(name = "users")
public class User extends Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    // Constructors
    public User() {
        super();
    }

    public User(String name, String email, String password) {
        super(name, email);
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    /* Polymorphism */
    @Override
    public void displayInfo() {
        System.out.println("User Name: " + getName() + ", Email: " + getEmail() + ", Roles: " + roles);
    }
}
```

### Attributes

* id: The unique identifier for the user.
* password: The password for the user. It is a mandatory field.
* roles: A set of roles assigned to the user, representing the user's permissions.

### Methods

* displayInfo(): Overrides the displayInfo() method from the Person class to provide specific information about the
  user, including their roles.

### Role

The Role class represents a role that can be assigned to users. It defines the name of the role and the relationship
with users.

```java

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
```

### Attributes

* id: The unique identifier for the role.
* name: The name of the role. It is a mandatory and unique field.
* users: A set of users assigned to this role. This relationship is bidirectional.

### Summary

The Person, User, and Role classes define the core entities in the application. The Person class provides a base for
common attributes and methods, while the User class extends Person to add user-specific attributes and relationships.
The Role class represents user roles within the system. Together, these classes illustrate the use of inheritance,
polymorphism, and encapsulation in the application's design.