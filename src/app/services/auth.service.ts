import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_LINK = 'http://localhost:3000/api/Users/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  users : User[] =[];
  userSubject = new Subject<User[]>();
  constructor(private http: HttpClient) {}



userIsLogged() {
  return !!localStorage.getItem('token');
}

loginUser(credentials) {
  return this.http.post(API_LINK, credentials).pipe(map(user => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('token', JSON.stringify(user));
    this.userSubject.next(this.users);
    return user;
}));;
}

logoutUser() {
  localStorage.removeItem('token');
}
 
}
