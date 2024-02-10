import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api:string="http://localhost:3001/";
  httpHeaders:any='';

  constructor(
    private http:HttpClient
  ) { }

  headers(){
   let userData=JSON.parse(localStorage.getItem('user') || '[]')
   this.httpHeaders=new HttpHeaders().set('Authorization','Bearer '+userData.token);
   return this.httpHeaders;
   }

  allUsers():Observable<any>{
     return this.http.get<any>(this.api+"users",{headers:this.headers()})
  }

}
