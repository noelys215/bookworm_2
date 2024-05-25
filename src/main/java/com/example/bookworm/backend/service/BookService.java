package com.example.bookworm.backend.service;

import com.example.bookworm.backend.exception.BookNotFoundException;
import com.example.bookworm.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.bookworm.backend.model.Book;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
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
        return bookRepository.findByAuthor(author);
    }

    public List<Book> getBooksByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
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
}

