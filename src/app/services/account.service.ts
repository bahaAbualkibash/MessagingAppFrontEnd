import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnInit {
  baseUrl = 'https://localhost:7173/api/account/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  constructor(private http: HttpClient) {}

  currentUser$ = this.currentUserSource.asObservable();

  ngOnInit(): void {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response) => {
        let user: User = <User>response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    console.log(localStorage.getItem('user'));

    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
