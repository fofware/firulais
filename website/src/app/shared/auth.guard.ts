import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authServive: AuthService,
    private router: Router
  ){}

  canActivate(): boolean {
    if (this.authServive.loggedIn()) { return true; }
    this.router.navigate(['/signin']);
    return false;
  }
}
