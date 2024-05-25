# Service Layer Documentation

This documentation provides an overview of the service layer in the application. The service layer is responsible for
implementing the business logic and interacting with the repository layer to perform CRUD operations and other
business-specific tasks.

## BookService

The `BookService` class manages the business logic for book-related operations.

### Methods

- **getAllBooks()**: Retrieves all books from the repository.
- **getBookById(Long id)**: Retrieves a book by its ID. Throws `BookNotFoundException` if the book is not found.
- **createBook(Book book)**: Creates a new book or updates the quantity if the book with the given ISBN already exists.
- **updateBook(Long id, Book bookDetails)**: Updates the details of an existing book.
- **deleteBook(Long id)**: Deletes a book by its ID. Throws `BookNotFoundException` if the book is not found.
- **getBookByIsbn(String isbn)**: Retrieves a book by its ISBN.
- **getBooksByAuthor(String author)**: Retrieves books by the author's name.
- **getBooksByTitle(String title)**: Retrieves books by the title.
- **getBooksByGenre(String genre)**: Retrieves books by the genre.
- **decrementQuantity(Long bookId)**: Decreases the quantity of a book by 1. Throws `BookNotFoundException` if the book
  is not found or `RuntimeException` if no copies are available.
- **incrementQuantity(Long bookId)**: Increases the quantity of a book by 1. Throws `BookNotFoundException` if the book
  is not found.
- **incrementLostQuantity(Long bookId)**: Increases the lost quantity of a book by 1. Throws `BookNotFoundException` if
  the book is not found.

## CustomUserDetailsService

The `CustomUserDetailsService` class implements `UserDetailsService` and provides custom user authentication logic.

### Methods

- **loadUserByUsername(String email)**: Loads a user by their email. Throws `UsernameNotFoundException` if the user is
  not found.
- **getAuthorities(User user)**: Retrieves the authorities (roles) of a user.

## LoanService

The `LoanService` class manages the business logic for loan-related operations.

### Methods

- **getAllLoans()**: Retrieves all loans from the repository.
- **getLoanById(Long id)**: Retrieves a loan by its ID. Throws `LoanNotFoundException` if the loan is not found.
- **createLoan(Long bookId, String userEmail)**: Creates a new loan. Throws `BookNotFoundException` if the book is not
  found, `UserNotFoundException` if the user is not found, or `RuntimeException` if no copies are available.
- **returnLoan(Long loanId)**: Marks a loan as returned by setting the return date to the current date and increasing
  the book quantity by 1.
- **markLoanAsLost(Long id)**: Marks a loan as lost by setting the return date to the current date and increasing the
  book's lost quantity by 1.
- **deleteLoan(Long id)**: Deletes a loan by its ID. Throws `LoanNotFoundException` if the loan is not found.
- **getActiveLoans()**: Retrieves loans that have not been returned (i.e., `returnDate` is null).

## UserService

The `UserService` class manages the business logic for user-related operations.

### Methods

- **assignRoleToUser(String email, String roleName)**: Assigns a role to a user. Throws `UserNotFoundException` if the
  user is not found or `IllegalArgumentException` if the role is not found.
- **createUser(User user)**: Creates a new user with the `ROLE_USER` role. Throws `IllegalArgumentException` if the
  email is already registered.
- **createAdminUser(User user)**: Creates a new admin user with both `ROLE_USER` and `ROLE_ADMIN` roles.
  Throws `IllegalArgumentException` if the email is already registered.
- **getAllUsers()**: Retrieves all users from the repository.
- **getUserById(Long id)**: Retrieves a user by their ID. Throws `UserNotFoundException` if the user is not found.
- **updateUser(Long id, User userDetails)**: Updates the details of an existing user.
- **deleteUser(Long id)**: Deletes a user by their ID. Throws `UserNotFoundException` if the user is not found.
- **getUserByEmail(String email)**: Retrieves a user by their email. Returns an `Optional<User>` which can be empty if
  no user is found.