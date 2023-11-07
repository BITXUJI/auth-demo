import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root' // Ensure the service is provided in the root module
})
export class AuthService {
  currentUser: any;

  constructor(public jwtHelper: JwtHelperService,
    private http: HttpClient) {
    let token = localStorage.getItem('token');
    if (token) {
      this.currentUser = this.jwtHelper.decodeToken(token);
    }
  }

  login(credentials: any) {
    return this.http.post<any>('/api/authenticate', credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.currentUser = this.jwtHelper.decodeToken(response.token);
          return true;
        } else return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
