import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-DAHkhQKNyTRgYso-8lZgKW6gBm9cRzw",
  authDomain: "expense-tracker-c09b9.firebaseapp.com",
  databaseURL: "https://expense-tracker-c09b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-tracker-c09b9",
  storageBucket: "expense-tracker-c09b9.firebasestorage.app",
  messagingSenderId: "505543590660",
  appId: "1:505543590660:web:72ac3e5f586e9afbb04651"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);