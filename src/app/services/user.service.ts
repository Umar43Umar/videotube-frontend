import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  public user$: Observable<any> = this.userSubject.asObservable();

  private url = '/api/v1/users';

  constructor(private http: HttpClient) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn && isLoggedIn === 'true') {
      this.isLoggedIn.next(true); // Set initial login state
      this.getUser().subscribe(
        (res) => {
          this.userSubject.next(res.data); // Set initial user data if available
        },
        (error) => {
          console.error('Error fetching initial user data', error);
        }
      );
    }
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.url}/register`, userData, { withCredentials: true });
  }

  loginUser(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(
      `${this.url}/login`,
      { username: usernameOrEmail,email:usernameOrEmail, password },
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.isLoggedIn.next(true); // Update login status
        localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
        this.getUser().subscribe(
          (res) => {
            this.userSubject.next(res.data); // Update user data after successful login
          },
          (error) => {
            console.error('Error fetching user data after login', error);
          }
        );
      })
    );
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.url}/current-user`, { withCredentials: true }).pipe(
      tap((user) => {
        this.userSubject.next(user); // Update user data
      })
    );
  }
  
  getUserChannel(username){
    return this.http.get(`${this.url}/channel/${username}`, { withCredentials: true });
  }

  logoutUser(): Observable<any> {
    return this.http.post(`${this.url}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isLoggedIn.next(false); // Update login status
        localStorage.removeItem('isLoggedIn'); // Clear login status from localStorage
        this.userSubject.next(null); // Clear user data
      })
    );
  }
}
