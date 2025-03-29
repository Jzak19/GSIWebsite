import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDocs} from 'firebase/firestore';
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
}