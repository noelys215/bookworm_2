## Repository Interfaces Documentation

### Overview

This documentation provides an overview of the repository interfaces used in the application. These interfaces extend
JpaRepository and define methods for interacting with the database. Each repository is responsible for a specific entity
type and provides CRUD operations along with custom query methods.

### UserRepository

The UserRepository interface extends JpaRepository for the User entity. It provides standard CRUD operations and a
custom method to find a user by email.

```java

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

### Methods

* findByEmail(String email): Retrieves a user by their email address. Returns an Optional<User> which can be empty if no
  user is found.

### RoleRepository

The RoleRepository interface extends JpaRepository for the Role entity. It provides standard CRUD operations and a
custom method to find a role by name.

```java
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
```

### Methods

* findByName(String name): Retrieves a role by its name. Returns an Optional<Role> which can be empty if no role is
  found.

### LoanRepository

The LoanRepository interface extends JpaRepository for the Loan entity. It provides standard CRUD operations and custom
methods to find loans by user ID, book ID, and return date.

```java

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserId(Long userId);

    List<Loan> findByBookId(Long bookId);

    List<Loan> findByReturnDateIsNull();
}
```

### Methods

* findByUserId(Long userId): Retrieves a list of loans associated with a specific user ID.
* findByBookId(Long bookId): Retrieves a list of loans associated with a specific book ID.
* findByReturnDateIsNull(): Retrieves a list of loans that have not been returned (i.e., returnDate is null).

### BookRepository

The BookRepository interface extends JpaRepository for the Book entity. It provides standard CRUD operations and custom
methods to find books by ISBN, author, title, and genre.

```java

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIsbn(String isbn);

    List<Book> findByAuthor(String author);

    List<Book> findByTitle(String title);

    List<Book> findByGenre(String genre);
}
```

### Methods

* findByIsbn(String isbn): Retrieves a book by its ISBN. Returns an Optional<Book> which can be empty if no book is
  found.
* findByAuthor(String author): Retrieves a list of books by the author's name.
* findByTitle(String title): Retrieves a list of books by the title.
* findByGenre(String genre): Retrieves a list of books by the genre.

### Summary

The repository interfaces provide the necessary methods to interact with the database for each entity type. By extending
JpaRepository, they inherit standard CRUD operations. Custom query methods are also defined to meet specific
requirements of the application, such as finding users by email, roles by name, loans by user or book ID, and books by
various attributes like ISBN, author, title, and genre. These repositories enable efficient data access and
manipulation, adhering to the principles of Spring Data JPA.