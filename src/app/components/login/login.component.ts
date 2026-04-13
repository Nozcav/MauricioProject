import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../navbar/navbar.css']
})
export class LoginComponent implements OnInit {
  mostrarRegistro = false;
  loginEmail = '';
  loginPassword = '';
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tienda']);
    }
  }

  async onLogin(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    const loginSuccess = await this.authService.login(this.loginEmail, this.loginPassword);
    if (!loginSuccess) {
      this.errorMessage = 'Email o contraseña inválidos. Intenta de nuevo o crea una cuenta.';
      return;
    }

    this.successMessage = 'Inicio de sesión exitoso. Redirigiendo a la tienda...';
    setTimeout(() => this.router.navigate(['/tienda']), 300);
  }

  async onRegistro(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    const result = await this.authService.register(
      this.registerName,
      this.registerEmail,
      this.registerPassword,
      this.registerConfirmPassword
    );

    if (result !== 'success') {
      this.errorMessage = result;
      return;
    }

    this.successMessage = 'Cuenta creada correctamente. Bienvenido/a a Luxe Joyas.';
    setTimeout(() => this.router.navigate(['/tienda']), 400);
  }

  toggleForm(): void {
    this.mostrarRegistro = !this.mostrarRegistro;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
