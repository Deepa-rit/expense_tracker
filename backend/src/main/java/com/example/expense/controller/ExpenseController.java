package com.example.expense.controller;

import com.example.expense.service.FirebaseService;
import com.google.firebase.database.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@CrossOrigin
@RequestMapping("/expense")
public class ExpenseController {

    private final FirebaseService firebaseService;

    public ExpenseController(FirebaseService firebaseService) {
        this.firebaseService = firebaseService;
    }

    // ADD EXPENSE
    @PostMapping("/add")
    public String addExpense(@RequestBody Map<String, Object> expense) {

        DatabaseReference ref = firebaseService
                .getDatabase()
                .getReference("expenses")
                .push();

        ref.setValueAsync(expense);

        return "Expense Added";
    }

    // GET ALL EXPENSES
    @GetMapping("/all")
    public CompletableFuture<Object> getAllExpenses() {

        CompletableFuture<Object> future = new CompletableFuture<>();

        DatabaseReference ref = firebaseService
                .getDatabase()
                .getReference("expenses");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {

            @Override
            public void onDataChange(DataSnapshot snapshot) {
                future.complete(snapshot.getValue());
            }

            @Override
            public void onCancelled(DatabaseError error) {
                future.complete(error.getMessage());
            }

        });

        return future;
    }

    // UPDATE EXPENSE
    @PutMapping("/update/{id}")
    public String updateExpense(@PathVariable String id,
                                @RequestBody Map<String, Object> expense) {

        DatabaseReference ref = firebaseService
                .getDatabase()
                .getReference("expenses")
                .child(id);

        ref.setValueAsync(expense);

        return "Updated";
    }

    // DELETE EXPENSE
    @DeleteMapping("/delete/{id}")
    public String deleteExpense(@PathVariable String id) {

        DatabaseReference ref = firebaseService
                .getDatabase()
                .getReference("expenses")
                .child(id);

        ref.removeValueAsync();

        return "Deleted";
    }

}