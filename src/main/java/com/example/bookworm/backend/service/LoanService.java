package com.example.bookworm.backend.service;

import com.example.bookworm.backend.exception.BookNotFoundException;
import com.example.bookworm.backend.exception.LoanNotFoundException;
import com.example.bookworm.backend.exception.UserNotFoundException;
import com.example.bookworm.backend.model.Book;
import com.example.bookworm.backend.model.Loan;
import com.example.bookworm.backend.model.User;
import com.example.bookworm.backend.repository.BookRepository;
import com.example.bookworm.backend.repository.LoanRepository;
import com.example.bookworm.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan getLoanById(Long id) {
        return loanRepository.findById(id).orElseThrow(() -> new LoanNotFoundException("Loan not found with id: " + id));
    }

    public Loan createLoan(Long bookId, String userEmail) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found with id: " + bookId));
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UserNotFoundException("User not found with email: " + userEmail));

        if (book.getQuantity() <= 0) {
            throw new RuntimeException("No copies available for loan");
        }

        Loan loan = new Loan();
        loan.setBook(book);
        loan.setUser(user);
        loan.setLoanDate(LocalDate.now());
        loan.setReturnDate(null);  // Ensure returnDate is null when creating a loan
        loan.setLost(false);  // Set default value for 'lost'
        loan.setLostDate(null);  // Set default value for 'lostDate'

        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        return loanRepository.save(loan);
    }

    public Loan returnLoan(Long loanId, String userEmail) {
        Loan loan = getLoanById(loanId);
        if (!loan.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not authorized to return this loan");
        }
        loan.setReturnDate(LocalDate.now());

        Book book = loan.getBook();
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);

        return loanRepository.save(loan);
    }

    public Loan markLoanAsLost(Long id) {
        Loan loan = getLoanById(id);
        loan.setLost(true);
        loan.setLostDate(LocalDate.now());  // Set lost date

        Book book = loan.getBook();
        book.setLostQuantity(book.getLostQuantity() + 1);
        bookRepository.save(book);

        return loanRepository.save(loan);
    }

    public void deleteLoan(Long id) {
        Loan loan = getLoanById(id);
        loanRepository.delete(loan);
    }

    public List<Loan> getActiveLoans() {
        return loanRepository.findByReturnDateIsNull();
    }

    public List<Loan> getLoansByUserEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return loanRepository.findByUserIdAndReturnDateIsNull(user.getId());
    }
}
