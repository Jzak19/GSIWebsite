import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';  // Import the initializeApp function
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword} from 'firebase/auth';  // Import Authentication methods
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

  
  
  // Method to log in a user
  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      });
  }
  
  register(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      });
  }

  // Method to log out a user
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // Method to get the current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }
}