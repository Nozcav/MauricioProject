import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export interface AuthUser {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  fechaNacimiento: string;
  genero: string;
}

export interface AuthResponse {
  token: string;
  profile: AuthProfile;
}

export interface AuthProfile {
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  genero: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BACKEND_URL = 'http://localhost:8000';
  private readonly SESSION_KEY = 'luxe_session';
  private readonly PROFILE_KEY = 'luxe_profile';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  private storeSession(response: AuthResponse): void {
    localStorage.setItem(this.SESSION_KEY, response.token);
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(response.profile));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  currentUser(): AuthProfile | null {
    const profile = localStorage.getItem(this.PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.BACKEND_URL}/auth/login`, {
          email: email.trim().toLowerCase(),
          password
        })
      );
      this.storeSession(response);
      return true;
    } catch {
      return false;
    }
  }

  async register(nombre: string, email: string, password: string, confirmPassword: string): Promise<string> {
    if (!nombre || !email || !password || !confirmPassword) {
      return 'Completa todos los campos para crear tu cuenta.';
    }

    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden.';
    }

    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.BACKEND_URL}/auth/register`, {
          nombre: nombre.trim(),
          email: email.trim().toLowerCase(),
          password,
          confirmPassword
        })
      );
      this.storeSession(response);
      return 'success';
    } catch (error: any) {
      return error?.error?.detail || 'No se pudo crear la cuenta. Intenta de nuevo.';
    }
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.PROFILE_KEY);
    this.router.navigate(['/login']);
  }
}
