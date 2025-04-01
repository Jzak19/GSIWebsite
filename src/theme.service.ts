import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
 private themeKey = 'theme';

  constructor() {
    this.loadTheme(); // Load theme on app start
  }

  toggleTheme() {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem(this.themeKey, 'light');
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem(this.themeKey, 'dark');
    }
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
}
