package com.example.bookworm.backend.service;

import com.example.bookworm.backend.exception.BookNotFoundException;
import com.example.bookworm.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.bookworm.backend.model.Book;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Highlighted: Changed method signature to support pagination
    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));
    }

    public Book createBook(Book book) {
        Optional<Book> existingBook = bookRepository.findByIsbn(book.getIsbn());
        if (existingBook.isPresent()) {
            Book bookToUpdate = existingBook.get();
            bookToUpdate.setQuantity(bookToUpdate.getQuantity() + book.getQuantity());
            return bookRepository.save(bookToUpdate);
        } else {
            return bookRepository.save(book);
        }
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = getBookById(id);
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setQuantity(bookDetails.getQuantity());
        book.setGenre(bookDetails.getGenre());
        book.setYear(bookDetails.getYear());
        book.setLostQuantity(bookDetails.getLostQuantity());
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
    }

    public Optional<Book> getBookByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn);
    }

    public List<Book> getBooksByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }

    public List<Book> getBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenreContainingIgnoreCase(genre);
    }

    public void decrementQuantity(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + bookId));
        if (book.getQuantity() > 0) {
            book.setQuantity(book.getQuantity() - 1);
            bookRepository.save(book);
        } else {
            throw new RuntimeException("No more copies available");
        }
    }

    public void incrementQuantity(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + bookId));
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);
    }

    public void incrementLostQuantity(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + bookId));
        book.setLostQuantity(book.getLostQuantity() + 1);
        bookRepository.save(book);
    }

    // Highlighted: Added search method
    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingOrAuthorContainingOrGenreContainingIgnoreCase(query, query, query);
    }

}

