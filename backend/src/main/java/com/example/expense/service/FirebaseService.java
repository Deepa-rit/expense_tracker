package com.example.expense.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.stereotype.Service;
import java.io.FileInputStream;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;

@Service
public class FirebaseService {

    @PostConstruct
    public void initialize() {

        try {

            if (FirebaseApp.getApps().isEmpty()) {
                FileInputStream serviceAccount =
    new FileInputStream("/etc/secrets/firebase-key.json");
                

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setDatabaseUrl("https://expense-tracker-c09b9-default-rtdb.asia-southeast1.firebasedatabase.app")
                        .build();

                FirebaseApp.initializeApp(options);

                System.out.println("Firebase Connected Successfully");

            }

        } catch (Exception e) {

            e.printStackTrace();

        }

    }

    public FirebaseDatabase getDatabase() {

        return FirebaseDatabase.getInstance();

    }

}
