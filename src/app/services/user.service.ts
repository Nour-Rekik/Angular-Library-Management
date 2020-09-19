 /*
  createNewUser(user : Auth): Observable<Auth> {
    //this.users.push(user);
    //this.emitUsers();
    const token = localStorage.getItem('token');
   //  const headers = new HttpHeaders().set(
     //  'authorization', token
    // );
  return this.http.post<Auth>(LINK  , user ,/*{headers});
 }   */
 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 
 import { User } from '../models/user';
import { Observable } from 'rxjs';
const apiUrl='http://localhost:3000/api/Users'
 
 @Injectable({ providedIn: 'root' })
 export class UserService {
     constructor(private http: HttpClient) { }
 
     getAll() : Observable<User[]>{
         return this.http.get<User[]>(apiUrl);
     }
 
     register(user: User) :Observable<User> {
         return this.http.post<User>(apiUrl, user);
     }
 
     delete(id: number) {
         return this.http.delete(apiUrl+`/${id}`);
     }
 }