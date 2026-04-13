import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HttpClientModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-proyecto');
  
  protected readonly searchQuery = signal('');
  protected readonly suggestions = [
    'Smartphones',
    'Laptops',
    'Auriculares',
    'Ropa deportiva',
    'Zapatillas'
  ];

  protected onSearch(): void {
    console.log('Buscando:', this.searchQuery());
  }

  protected clearSearch(): void {
    this.searchQuery.set('');
  }

  protected selectSuggestion(suggestion: string): void {
    this.searchQuery.set(suggestion);
    this.onSearch();
  }
}
