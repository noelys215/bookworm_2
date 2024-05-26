package com.example.bookworm.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

public class LoanDetails {
    // Getters and Setters
    @Getter
    @Setter
    private String bookTitle;
    @Getter
    @Setter
    private String bookAuthor;
    @Getter
    @Setter
    private LocalDate loanDate;
    @Getter
    @Setter
    private LocalDate returnDate;
    @Getter
    @Setter
    private long loanDuration;
    private boolean isOverdue;
    @Getter
    @Setter
    private String userName;
    @Getter
    @Setter
    private String userEmail;

    public boolean isOverdue() {
        return isOverdue;
    }

    public void setOverdue(boolean overdue) {
        isOverdue = overdue;
    }

}
