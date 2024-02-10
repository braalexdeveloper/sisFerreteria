import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/interface/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
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

  allRoles():Observable<any>{
 return this.http.get(this.api+"roles",{headers:this.headers()});
  }

  create(Role:any):Observable<any>{
    return this.http.post(this.api+"roles",Role,{headers:this.headers()});
  }

  update(id:any,Role:Role):Observable<any>{
    return this.http.put(this.api+"roles/"+id,Role,{headers:this.headers()});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(this.api+"roles/"+id,{headers:this.headers()});
  }
}
