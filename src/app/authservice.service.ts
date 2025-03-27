import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';  // Import the initializeApp function
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, signInAnonymously, UserCredential, setPersistence, browserLocalPersistence, browserSessionPersistence} from 'firebase/auth';  // Import Authentication methods
import firebaseConfig from '../environment';  // Your Firebase config

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private auth;

  constructor() {
    // Initialize Firebase
    initializeApp(firebaseConfig);
    this.auth = getAuth()
  }

  login(email: string, password: string): Promise<User> {
    return setPersistence(this.auth, browserLocalPersistence)  // Set persistence first
      .then(() => {
        return signInWithEmailAndPassword(this.auth, email, password);  // Then sign in
      })
      .then((userCredential) => {
        // Store the user if needed (Optional step)
        console.log('User signed in:', userCredential.user);
        return userCredential.user;
      })
      .catch((error) => {
        console.error("Error during login:", error);
        throw error;
      });
  }
  
  register(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      });
  }

  logout(): Promise<void> {
    sessionStorage.removeItem('userUID')
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  signInAsGuest(): Promise<void> {
    return new Promise((resolve, reject) => {
      signInAnonymously(this.auth)
        .then((userCredential) => {
          localStorage.setItem('userUID', userCredential.user.uid);
          resolve(); 
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAuth() {
    return this.auth;
  }
}