import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'src/app/interface/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
users:User[]=[];
  constructor(
    private userService:UserService,
    private modal:NgbModal,
    private alertify:AlertifyService
  ){

  }

  ngOnInit(): void {
    this.allUsers()
  }

  allUsers(){
    return this.userService.allUsers().subscribe({
      next:(data)=>{
        this.users=data.users;
      },
      error:(err)=>{
console.log(err)
      }
    })
  }

  createUser(){
    const modalRef=this.modal.open(AddUserComponent);
    modalRef.componentInstance.UserC.subscribe((user:User)=>{
     this.users.unshift(user);
    });
  }

  updateUser(user:User){
    const modalRef=this.modal.open(EditUserComponent);
    modalRef.componentInstance.USER=user;
    modalRef.componentInstance.UserE.subscribe((user:User)=>{
      let index=this.users.findIndex((item:User)=>item.id===user.id);
      if(index!=-1){
         this.users[index]=user;
      }
     });
  }


  deleteUser(id:any){
    this.alertify.confirm({
     title:"Eliminar Usuario",
     message:"¿Estas seguro de eliminar el Usuario?",
     callback_delete:()=>{
       this.userService.deleteUser(id).subscribe({
         next:(data)=>{
          
          this.users= this.users.filter((el:User)=>el.id!==id);       
          console.log(data)
         },
         error:(err)=>{
           console.log(err)
         }
        })
     }
    })
   }

}
