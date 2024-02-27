import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  allProducts(textSearch:string=''):Observable<any>{
  return this.http.get(this.api+"products?textSearch="+textSearch,{headers:this.headers()})
  }

  create(product:FormData):Observable<any>{
    return this.http.post(this.api+"products",product,{headers:this.headers()})
  }

  update(id:string,product:FormData):Observable<any>{
    return this.http.put(this.api+"products/"+id,product,{headers:this.headers()})
  }

  delete(id:string):Observable<any>{
    return this.http.delete(this.api+"products/"+id,{headers:this.headers()})
  }

}
