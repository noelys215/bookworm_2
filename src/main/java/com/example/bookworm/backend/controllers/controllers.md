## Controllers Documentation

### Overview

This documentation explains the functionality and purpose of the BookController, LoanController, and UserController
classes in the application. Each class is responsible for handling HTTP requests related to books, loans, and users,
respectively.

### BookController

The BookController class handles all operations related to books.

```java

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book createdBook = bookService.createBook(book);
        return ResponseEntity.ok(createdBook);
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book updatedBook = bookService.updateBook(id, bookDetails);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable String isbn) {
        return bookService.getBookByIsbn(isbn)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable String author) {
        List<Book> books = bookService.getBooksByAuthor(author);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Book>> getBooksByTitle(@PathVariable String title) {
        List<Book> books = bookService.getBooksByTitle(title);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Book>> getBooksByGenre(@PathVariable String genre) {
        List<Book> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }
}
```

### Methods

* createBook: Creates a new book. Only accessible by users with the ADMIN role.
* getAllBooks: Retrieves a list of all books.
* getBookById: Retrieves a book by its ID.
* updateBook: Updates an existing book. Only accessible by users with the ADMIN role.
* deleteBook: Deletes a book by its ID. Only accessible by users with the ADMIN role.
* getBookByIsbn: Retrieves a book by its ISBN.
* getBooksByAuthor: Retrieves a list of books by the specified author.
* getBooksByTitle: Retrieves a list of books by the specified title.
* getBooksByGenre: Retrieves a list of books by the specified genre.

### LoanController

The LoanController class handles all operations related to loans.

```java

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        Loan loan = loanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> createLoan(@RequestBody LoanRequest loanRequest, Principal principal) {
        Loan loan = loanService.createLoan(loanRequest.getBookId(), principal.getName());
        return ResponseEntity.ok(loan);
    }

    @PutMapping("/return/{loanId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> returnLoan(@PathVariable Long loanId) {
        Loan returnedLoan = loanService.returnLoan(loanId);
        return ResponseEntity.ok(returnedLoan);
    }

    @PutMapping("/mark-lost/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> markLoanAsLost(@PathVariable Long id) {
        Loan loan = loanService.markLoanAsLost(id);
        return ResponseEntity.ok(loan);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active")
    @PreAuthorize("isAuthenticated()")
    public List<Loan> getActiveLoans() {
        return loanService.getActiveLoans();
    }
}

```

### Methods

* getAllLoans: Retrieves a list of all loans. Only accessible by users with the ADMIN role.
* getLoanById: Retrieves a loan by its ID. Only accessible by authenticated users.
* createLoan: Creates a new loan. Only accessible by authenticated users.
* returnLoan: Marks a loan as returned. Only accessible by authenticated users.
* markLoanAsLost: Marks a loan as lost. Only accessible by authenticated users.
* deleteLoan: Deletes a loan by its ID. Only accessible by users with the ADMIN role.
* getActiveLoans: Retrieves a list of all active (not returned) loans. Only accessible by authenticated users.

### UserController

The UserController class handles all operations related to users.

```java

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/assign-role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> assignRoleToUser(@RequestBody RoleAssignmentRequest request) {
        userService.assignRoleToUser(request.getEmail(), request.getRoleName());
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
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
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
```

### Methods

* assignRoleToUser: Assigns a role to a user based on their email. Only accessible by users with the ADMIN role.
* createUser: Creates a new user.
* getAllUsers: Retrieves a list of all users. Only accessible by users with the ADMIN role.
* getUserById: Retrieves a user by their ID.
* updateUser: Updates an existing user. Only accessible by users with the ADMIN role.
* deleteUser: Deletes a user by their ID. Only accessible by users with the ADMIN role.
* getUserByEmail: Retrieves a user by their email.

### Summary

The BookController, LoanController, and UserController classes provide RESTful APIs for managing books, loans, and users
in the application. They use the respective service classes to perform CRUD operations and enforce security policies to
ensure that only authorized users can perform certain actions. This setup allows for a clear separation of concerns and
enhances the maintainability of the codebase.