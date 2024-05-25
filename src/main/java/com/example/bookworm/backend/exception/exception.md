## Custom Exception Classes Documentation

### Overview

This documentation provides an overview of the custom exception classes in the application. These exceptions are used to
handle specific error conditions related to loans, books, and users. By defining custom exceptions, the application can
provide more meaningful error messages and handle errors more effectively.

### LoanNotFoundException

The LoanNotFoundException class is a custom exception used to indicate that a loan was not found. It extends
RuntimeException.

```java
public class LoanNotFoundException extends RuntimeException {
    public LoanNotFoundException(String message) {
        super(message);
    }
}
```

### Constructor

* LoanNotFoundException(String message): Constructs a new exception with the specified detail message.

### Usage

This exception is thrown when a requested loan cannot be found in the database. It provides a clear and specific error
message to indicate the issue.

Example usage in LoanService:

```java
public Loan getLoanById(Long id) {
    return loanRepository.findById(id)
            .orElseThrow(() -> new LoanNotFoundException("Loan not found with id: " + id));
}
```

### BookNotFoundException

The BookNotFoundException class is a custom exception used to indicate that a book was not found. It extends
RuntimeException.

```java
public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String message) {
        super(message);
    }
}
```

### Constructor

* BookNotFoundException(String message): Constructs a new exception with the specified detail message.

### Usage

This exception is thrown when a requested book cannot be found in the database. It provides a clear and specific error
message to indicate the issue.

Example usage in BookService:

```java
public Book getBookById(Long id) {
    return bookRepository.findById(id)
            .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));
}
```

### UserNotFoundException

The UserNotFoundException class is a custom exception used to indicate that a user was not found. It extends
RuntimeException.

```java
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
```

### Constructor

* UserNotFoundException(String message): Constructs a new exception with the specified detail message.

### Usage

This exception is thrown when a requested user cannot be found in the database. It provides a clear and specific error
message to indicate the issue.

Example usage in UserService:

```java
public User getUserById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
}
```

### Summary

The custom exception classes LoanNotFoundException, BookNotFoundException, and UserNotFoundException are designed to
handle specific error conditions in the application. By defining these exceptions, the application can provide more
informative error messages and handle errors in a consistent manner. Each exception class extends RuntimeException and
includes a constructor that takes a detail message, allowing for clear and specific error reporting.
