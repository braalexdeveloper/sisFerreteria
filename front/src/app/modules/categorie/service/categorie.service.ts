import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/interface/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
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

  allCategories():Observable<any>{
     return this.http.get<any>(this.api+"categories",{headers:this.headers()})
  }

  createCategorie(categorie:Categorie):Observable<any>{
     return this.http.post(this.api+"categories",categorie,{headers:this.headers()});
  }

  updateCategory(id:string,categorie:Categorie):Observable<any>{
    return this.http.put<any>(this.api+"categories/"+id,categorie,{headers:this.headers()});
  }

  deleteCategory(categorie:Categorie):Observable<any>{
    return this.http.delete<any>(this.api+"categories/"+categorie.id,{headers:this.headers()});
  }

}
