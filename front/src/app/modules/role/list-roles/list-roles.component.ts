import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRolesComponent } from '../add-roles/add-roles.component';
import { Role } from 'src/app/interface/role';
import { EditRolesComponent } from '../edit-roles/edit-roles.component';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ExportService } from 'src/app/service/export.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit{
  
  columns = ['id', 'name'];

  roles:any={};
 

  pageSize: number = 4; // Número de elementos por página
  currentPage: number = 1; // Página actual
  

  constructor(
    private _roleService:RoleService,
    private modalService:NgbModal,
    private alertify:AlertifyService,
    private exportService:ExportService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.allRoles();
   
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.roles, this.columns, 'roles','Registro de Roles');
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPages(): number {
    return Math.ceil(this.roles.length / this.pageSize);
  }

  getCurrentPageItems(): any[] {
    const endIndex = this.currentPage*this.pageSize;
    const startIndex = endIndex-this.pageSize;
    
    return this.roles.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages()).fill(0).map((x, i) => i + 1);
  }

  allRoles(){
    this._roleService.allRoles().subscribe({
      next:(data)=>{
        console.log(data)
        this.roles=data.roles;
      },
      error:(err)=>{
        console.log(err)
        if(err.error.error.name=="TokenExpiredError"){
          this.router.navigate(['/login']);
        }
      }
    })
  }

  openCreateRole(){
    const modalRef=this.modalService.open(AddRolesComponent);
    modalRef.componentInstance.RoleC.subscribe((Role:any)=>{
     this.roles.unshift(Role);
     
    })
  }

  editRole(Role:Role){
    const modalRef=this.modalService.open(EditRolesComponent);
    modalRef.componentInstance.ROLE=Role;
    modalRef.componentInstance.RoleE.subscribe((dataRole:Role)=>{
     let index=this.roles.findIndex((item:Role)=>item.id===dataRole.id);
     if(index!=-1){
       this.roles[index]=dataRole;
     }
     
    })
  }


  deleteRole(role:Role){
    this.alertify.confirm({title:"Eliminar Rol",
    message:"Estas seguro de eliminar el rol?",
    callback_delete:()=>{
      this._roleService.delete(role.id).subscribe({
        next:(data)=>{
         this.roles=this.roles.filter((el:Role)=>el.id!==role.id);       
         console.log(data)
        },
        error:(err)=>{
          console.log(err)
        }
       })
    }
  }
    )
  }

}
