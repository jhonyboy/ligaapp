// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ-LLnLLzfG7avZSGI9naGVlHcOqNHbqE",
  authDomain: "ligaapp-3592d.firebaseapp.com",
  projectId: "ligaapp-3592d",
  storageBucket: "ligaapp-3592d.firebasestorage.app",
  messagingSenderId: "35471652641",
  appId: "1:35471652641:web:a17a1c7f44b539c2a47060",
  measurementId: "G-YRP67CJ8EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);