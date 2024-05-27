package com.example.bookworm.backend.controllers;

import com.example.bookworm.backend.dto.LoanRequest;
import com.example.bookworm.backend.model.Loan;
import com.example.bookworm.backend.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        Loan loan = loanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> createLoan(@RequestBody LoanRequest loanRequest, Principal principal) {
        Loan loan = loanService.createLoan(loanRequest.getBookId(), principal.getName());
        return ResponseEntity.ok(loan);
    }

    @PutMapping("/return/{loanId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> returnLoan(@PathVariable Long loanId, Principal principal) {
        Loan returnedLoan = loanService.returnLoan(loanId, principal.getName());
        return ResponseEntity.ok(returnedLoan);
    }

    @PutMapping("/mark-lost/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Loan> markLoanAsLost(@PathVariable Long id) {
        Loan loan = loanService.markLoanAsLost(id);
        return ResponseEntity.ok(loan);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active")
    @PreAuthorize("isAuthenticated()")
    public List<Loan> getActiveLoans() {
        return loanService.getActiveLoans();
    }




}



