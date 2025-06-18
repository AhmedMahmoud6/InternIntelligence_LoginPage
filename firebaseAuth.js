// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYxZC5VY-QnKMoyTIot0_H7ENIT1rddv8",
  authDomain: "internintelligence-login-4d9ee.firebaseapp.com",
  projectId: "internintelligence-login-4d9ee",
  storageBucket: "internintelligence-login-4d9ee.firebasestorage.app",
  messagingSenderId: "292817019100",
  appId: "1:292817019100:web:d6d9ccd8f51191a1015419",
  measurementId: "G-RYKX3ZQB7Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered:", userCredential.user);
  } catch (error) {
    console.error("Registration error:", error.message);
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user.email);
  } catch (error) {
    console.error("Login error:", error.message);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
}

export function observeAuthChange(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}
