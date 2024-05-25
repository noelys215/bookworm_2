## API Request Classes Documentation

### Overview

This documentation explains the functionality and purpose of the LoanRequest and RoleAssignmentRequest classes in the
application. Each class is responsible for encapsulating the data required for specific API requests related to loans
and role assignments.

### LoanRequest

The LoanRequest class is used to encapsulate the data required to create a new loan. It contains a single field, bookId,
which represents the ID of the book being loaned.

```java
public class LoanRequest {
    private Long bookId;

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }
}
```

### Fields

* bookId: The ID of the book that the user wants to loan.

### Methods

* getBookId(): Returns the ID of the book.
* setBookId(Long bookId): Sets the ID of the book.

### Usage

This class is used in the LoanController when creating a new loan. It allows the client to specify which book should be
loaned by providing its ID.

Example usage in LoanController:

```java

@PostMapping
@PreAuthorize("isAuthenticated()")
public ResponseEntity<Loan> createLoan(@RequestBody LoanRequest loanRequest, Principal principal) {
    Loan loan = loanService.createLoan(loanRequest.getBookId(), principal.getName());
    return ResponseEntity.ok(loan);
}
```

### RoleAssignmentRequest

The RoleAssignmentRequest class is used to encapsulate the data required to assign a role to a user. It contains two
fields: email and roleName, representing the user's email address and the role to be assigned, respectively.

```java
public class RoleAssignmentRequest {
    private String email;
    private String roleName;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
```

### Fields

* email: The email address of the user to whom the role will be assigned.
* roleName: The name of the role to be assigned to the user.

### Methods

* getEmail(): Returns the email address of the user.
* setEmail(String email): Sets the email address of the user.
* getRoleName(): Returns the name of the role to be assigned.
* setRoleName(String roleName): Sets the name of the role to be assigned.

### Usage

This class is used in the UserController when assigning a role to a user. It allows the client to specify which user
should receive which role by providing the user's email address and the role name.

Example usage in UserController:

```java

@PostMapping("/assign-role")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public ResponseEntity<?> assignRoleToUser(@RequestBody RoleAssignmentRequest request) {
    userService.assignRoleToUser(request.getEmail(), request.getRoleName());
    return ResponseEntity.ok().build();
}
```

### Summary

The LoanRequest and RoleAssignmentRequest classes provide a structured way to handle the data required for specific API
requests. By encapsulating the data in these classes, the application ensures that the necessary information is clearly
defined and easily accessible, improving the maintainability and readability of the code.