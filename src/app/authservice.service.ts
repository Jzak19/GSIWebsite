import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';  // Import the initializeApp function
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, signInAnonymously, UserCredential} from 'firebase/auth';  // Import Authentication methods
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

  logout(): Promise<void> {
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
        .then(() => {
          resolve(); 
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}