package com.example.bookworm.backend.service;

import com.example.bookworm.backend.dto.LoanDetails;
import com.example.bookworm.backend.model.Loan;
import com.example.bookworm.backend.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private LoanRepository loanRepository;

    public Map<String, Object> generateMonthlyReport(int year, int month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);

        List<Loan> loans = loanRepository.findAll().stream()
                .filter(loan -> loan.getLoanDate().isAfter(startOfMonth) && loan.getLoanDate().isBefore(endOfMonth))
                .collect(Collectors.toList());

        List<LoanDetails> loanDetails = loans.stream().map(loan -> {
            LoanDetails details = new LoanDetails();
            details.setBookTitle(loan.getBook().getTitle());
            details.setBookAuthor(loan.getBook().getAuthor());
            details.setLoanDate(loan.getLoanDate());
            details.setReturnDate(loan.getReturnDate());
            details.setLoanDuration(loan.getReturnDate() != null ? ChronoUnit.DAYS.between(loan.getLoanDate(), loan.getReturnDate()) : 0);
            details.setOverdue(loan.getReturnDate() == null && ChronoUnit.DAYS.between(loan.getLoanDate(), LocalDate.now()) > 21);
            details.setUserName(loan.getUser().getName());
            details.setUserEmail(loan.getUser().getEmail());
            return details;
        }).collect(Collectors.toList());

        long totalBooksTakenOut = loans.size();
        long totalBooksReturned = loans.stream().filter(loan -> loan.getReturnDate() != null).count();
        long totalBooksLost = loans.stream().filter(Loan::isLost).count();
        long totalBooksOnLoan = loans.stream().filter(loan -> loan.getReturnDate() == null).count();
        long totalOverdueBooks = loans.stream().filter(loan -> loan.getReturnDate() == null && ChronoUnit.DAYS.between(loan.getLoanDate(), LocalDate.now()) > 21).count();

        Map<String, Object> report = Map.of(
                "loans", loanDetails,
                "summary", Map.of(
                        "totalBooksTakenOut", totalBooksTakenOut,
                        "totalBooksReturned", totalBooksReturned,
                        "totalBooksLost", totalBooksLost,
                        "totalBooksOnLoan", totalBooksOnLoan,
                        "totalOverdueBooks", totalOverdueBooks
                )
        );

        return report;
    }
}
