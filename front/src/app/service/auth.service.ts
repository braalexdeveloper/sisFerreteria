import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Auth } from '../interface/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api:string='http://localhost:3001/'
  constructor(
    private http:HttpClient
  ) { }

  login(user:Auth):Observable<any>{
    return this.http.post(this.api+"auth/login",user);

  }

  logout(id:string):Observable<any>{
   return this.http.get(this.api+"auth/logout/"+id);
  }
}
