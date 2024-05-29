package com.example.bookworm.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "loans")
public class Loan {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Getter
    @Setter
    @Column(nullable = false)
    private LocalDate loanDate;

    @Getter
    @Setter
    @Column
    private LocalDate returnDate;

    @Getter
    @Setter
    @Column(nullable = false)
    private boolean lost = false;

    @Getter
    @Setter
    @Column
    private LocalDate lostDate;

}