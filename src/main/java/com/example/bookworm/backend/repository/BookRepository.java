package com.example.bookworm.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.bookworm.backend.model.Book;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByIsbn(String isbn);

    // Highlighted: Changed methods to support partial matching
    List<Book> findByAuthorContainingIgnoreCase(String author);

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByGenreContainingIgnoreCase(String genre);

    // Highlighted: Added search method
    List<Book> findByTitleContainingOrAuthorContainingOrGenreContainingIgnoreCase(String title, String author, String genre);

    // Highlighted: Added pagination method
    Page<Book> findAll(Pageable pageable);
}
