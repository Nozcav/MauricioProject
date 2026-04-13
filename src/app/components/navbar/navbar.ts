import { Component } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  searchQuery = '';
  searchResults: any[] = [];
  showDropdown = false;

  constructor(
    public dataService: DataService,
    private productService: ProductService,
    public authService: AuthService,
    private router: Router
  ) {}

  goToAccount(): void {
    this.router.navigate(['/mi-cuenta']);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    this.searchQuery = query;
    
    if (query.length >= 2) {
      this.searchResults = this.productService.searchProductos(query);
      this.showDropdown = this.searchResults.length > 0;
    } else {
      this.searchResults = [];
      this.showDropdown = false;
    }
  }

  selectProduct(product: any): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdown = false;
    console.log('Navigating to producto:', product.id);
    this.router.navigate(['/producto', product.id]);
  }

  onSearchSubmit(): void {
    console.log('Submitting search:', this.searchQuery);
    if (this.searchQuery.trim()) {
      this.router.navigate(['/tienda'], { queryParams: { busqueda: this.searchQuery } });
    }
    this.showDropdown = false;
  }

  logout(): void {
    this.authService.logout();
  }

  onFocus(): void {
    if (this.searchResults.length > 0) {
      this.showDropdown = true;
    }
  }

  onBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  highlightMatch(text: string): string {
    if (!this.searchQuery) return text;
    const regex = new RegExp(`(${this.escapeRegExp(this.searchQuery)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
