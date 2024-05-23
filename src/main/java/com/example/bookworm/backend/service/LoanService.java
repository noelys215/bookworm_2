package com.example.bookworm.backend.service;

import com.example.bookworm.backend.exception.BookNotFoundException;
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
        return loanRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Loan not found with id: " + id));
    }

    public Loan createLoan(Long bookId, Long userId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found with id: " + bookId));
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        if (book.getQuantity() <= 0) {
            throw new RuntimeException("No copies available for loan");
        }

        Loan loan = new Loan();
        loan.setBook(book);
        loan.setUser(user);
        loan.setLoanDate(LocalDate.now());
        loan.setReturnDate(null);

        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        return loanRepository.save(loan);
    }

    public Loan returnLoan(Long id) {
        Loan loan = getLoanById(id);
        loan.setReturnDate(LocalDate.now());

        Book book = loan.getBook();
        book.setQuantity(book.getQuantity() + 1);
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
}