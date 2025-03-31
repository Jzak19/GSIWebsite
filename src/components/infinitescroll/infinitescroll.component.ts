import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-infinitescroll',
  standalone: true,
  imports: [],
  templateUrl: './infinitescroll.component.html',
  styleUrl: './infinitescroll.component.css'
})
export class InfinitescrollComponent {
  users = ['John', 'Amy', 'Mike', 'Sarah', 'Robert', 'Emma', 'Chris', 'Olivia', 'James', 'Sophia'];
  cars = ['Toyota Camry', 'Honda Civic', 'Ford Mustang', 'Tesla Model 3', 'BMW X5'];
  clothes = ['Red T-shirt', 'Blue Jeans', 'Black Jacket', 'White Sneakers', 'Summer Dress'];
  household = ['Coffee Maker', 'Vacuum Cleaner', 'Air Fryer', 'Microwave Oven', 'Blender'];

  // Generate random star ratings from 1 to 5 using emojis
  getRandomStars(): string {
    const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
    return stars[Math.floor(Math.random() * stars.length)];
  }

  // Dummy reviews
// Reviews with corresponding star ratings
reviews = [
  { review: 'Absolutely love this product!', stars: '⭐⭐⭐⭐⭐' },
  { review: 'Pretty good, but could be better.', stars: '⭐⭐⭐⭐' },
  { review: 'Not worth the price.', stars: '⭐⭐' },
  { review: 'Exceeded my expectations!', stars: '⭐⭐⭐⭐⭐' },
  { review: 'Would not recommend.', stars: '⭐' },
  { review: 'Perfect for my needs.', stars: '⭐⭐⭐⭐⭐' },
  { review: 'Decent product for the price.', stars: '⭐⭐⭐⭐' },
  { review: 'Five stars all the way!', stars: '⭐⭐⭐⭐⭐' },
  { review: 'It broke after a week.', stars: '⭐' },
  { review: 'Highly recommend to others!', stars: '⭐⭐⭐⭐⭐' }
];

// Generate products with user data and reviews
items = Array.from({ length: 100 }, () => {
  const isCar = Math.random() < 0.33;
  const isClothing = !isCar && Math.random() < 0.5;
  const productName = isCar
    ? this.cars[Math.floor(Math.random() * this.cars.length)]
    : isClothing
      ? this.clothes[Math.floor(Math.random() * this.clothes.length)]
      : this.household[Math.floor(Math.random() * this.household.length)];

  const { review, stars } = this.reviews[Math.floor(Math.random() * this.reviews.length)];

  return {
    username: this.users[Math.floor(Math.random() * this.users.length)],
    product: productName,
    stars,
    review
  };
});

// Duplicate items for seamless infinite scroll
duplicatedItems = [...this.items, ...this.items];
}
