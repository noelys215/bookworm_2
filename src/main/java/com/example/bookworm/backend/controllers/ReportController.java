package com.example.bookworm.backend.controllers;

import com.example.bookworm.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/monthly")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getMonthlyReport(@RequestParam int year, @RequestParam int month) {
        return reportService.generateMonthlyReport(year, month);
    }
}
