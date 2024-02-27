import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interface/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  api:string="http://localhost:3001/";

  httpHeaders:any='';

  constructor(
    private http:HttpClient
  ) { }

  headers(){
    let userData=JSON.parse(localStorage.getItem('user') || '[]')
    this.httpHeaders=new HttpHeaders().set('Authorization','Bearer '+userData.token);
    return this.httpHeaders;
    }
    
  allClients(dni:string=''):Observable<any>{
    return this.http.get(this.api+"clients?textSearch="+dni,{headers:this.headers()});
  }

  createClient(client:Client):Observable<any>{
   return this.http.post(this.api+"clients",client,{headers:this.headers()});
  }

  updateClient(id:string,client:Client):Observable<any>{
   return this.http.put(this.api+"clients/"+id,client,{headers:this.headers()});
  }

  deleteClient(id:string):Observable<any>{
    return this.http.delete(this.api+"clients/"+id,{headers:this.headers()});
  }
}
