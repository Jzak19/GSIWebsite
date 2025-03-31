import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDocs, getDoc, updateDoc, arrayUnion, setDoc, deleteDoc} from 'firebase/firestore';
import firebaseConfig from '../environment';

@Injectable({
  providedIn: 'root',
})
export class DatabasecommsService {
  private db;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);


  }

  async uploadProduct(
    category: string,  
    model: string,
    description: string,
    year?: number,
    reviews: any[] = [],
    size?: string,  
  ): Promise<void> {
    try {
      let docData: any;
  
      if (category === 'cars') {
        docData = {
          model,
          description,
          year,
          reviews
        };
      } else if (category === 'clothes') {
        docData = {
          model,
          description,
          year,
          reviews,
          size,
        };
      } else if (category === 'household') {
        docData = {
          model,
          description,
          reviews,
        };
      } else {
        throw new Error('Invalid category');
      }

      // Get a reference to the parent document (e.g., 'products/cars')
      const productDocRef = doc(this.db, 'products', category);

      // Get a reference to the sub-collection (e.g., 'products/cars')
      const productCollection = collection(productDocRef, 'items'); // 'items' is the sub-collection
      const docRef = await addDoc(productCollection, docData);
      
      console.log(`${category.charAt(0).toUpperCase() + category.slice(1)} product added with ID:`, docRef.id);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async getProducts(category: string): Promise<any[]> {
    try {
      if (!['cars', 'clothes', 'household'].includes(category)) {
        throw new Error('Invalid category');
      }

      const productDocRef = doc(this.db, 'products', category);
      const productCollection = collection(productDocRef, 'items');
      const querySnapshot = await getDocs(productCollection);

      const products = querySnapshot.docs.map(doc => ({
        docID: doc.id,
        ...doc.data()
      }));

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  

  async getProductReviews(productId: string, docId: string): Promise<any> {
    try {
      const productDocRef = doc(this.db, `products/${productId}/items/${docId}`);
      const productDocSnap = await getDoc(productDocRef);
  
      if (productDocSnap.exists()) {

        const reviews = productDocSnap.data()?.['reviews'] || [];
        const updatedReviews = reviews.map((review: any) => ({
          ...review,
          username: review.username || 'Guest user',
        }));
  
        return updatedReviews;
      } else {
        console.log('No such document!');
        return [];
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return [];
    }
  }

  async postReview(productType: string, productID: string, review: any): Promise<any> {
    try{
      const productRef = doc(this.db, `products/${productType}/items/${productID}`)
      await updateDoc(productRef, {reviews: arrayUnion(review)})
      console.log("Review submitted")
    } catch (error) {
      console.log(error)
    }
  }

  async createUserStorage(userID: string, imageURL: string) {
    try {
      const userDocRef = doc(collection(this.db, 'users'), userID);
      const docSnapshot = await getDoc(userDocRef);
  
      if (!docSnapshot.exists()) {
        await setDoc(userDocRef, {
          imageUrl: imageURL,
        });
        console.log("User storage created successfully with image URL");
      } else {
        console.log("User already exists, skipping creation");
      }
    } catch (error) {
      console.error("Error creating user storage:", error);
    }
  }


  async getUserImageURL(userID: string) {
    console.log("Getting user image")


    const imageRef = doc(this.db, `users/${userID}`)
    const imageSnap = await getDoc(imageRef)

    if (imageSnap.exists()) {
      const url = imageSnap.data()?.['imageUrl']
      return url
    } else {
      return 'No image URL found'
    }


  }

  async removeUser(userID: string) {
    try {
      const userDocRef = doc(this.db, 'users', userID);
      await deleteDoc(userDocRef);
      console.log(`User document with ID ${userID} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user document:", error);
    }
  }
}