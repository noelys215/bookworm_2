package com.example.bookworm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.bookworm.backend.model.Book;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIsbn(String isbn);
    List<Book> findByAuthor(String author);
    List<Book> findByTitle(String title);
    List<Book> findByGenre(String genre);
}
