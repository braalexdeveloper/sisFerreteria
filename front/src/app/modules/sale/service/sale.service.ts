import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
 

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

  allSales():Observable<any>{
    return this.http.get(this.api+"sales");
  }

  createSale(sale:any):Observable<any>{
    return this.http.post(this.api+"sales",sale);
  }

  getSale(id:string):Observable<any>{
    return this.http.get(this.api+"sales/"+id);
  }
}
