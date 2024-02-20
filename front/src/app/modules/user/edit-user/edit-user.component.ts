import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/interface/role';
import { User } from 'src/app/interface/user';
import { AlertifyService } from 'src/app/service/alertify.service';
import { RoleService } from '../../role/service/role.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  @Output() UserE:EventEmitter<any>=new EventEmitter();
  @Input() USER:any;

  user:User={
    name:'',
    email:'',
    password:'',
    image:'',
    RoleId:''
  }

  roles:Role[]=[];

constructor(
  public activeModal:NgbActiveModal,
  private _userService:UserService,
  private alertify:AlertifyService,
  private _roleService:RoleService
){

}

ngOnInit(): void {
  this.allRoles();
  this.user.name=this.USER.name,
  this.user.email=this.USER.email,
  
  
  this.user.RoleId=this.USER.RoleId
}

allRoles(){
return this._roleService.allRoles().subscribe({
  next:(data)=>{
    this.roles=data.roles;
  },
  error:(error)=>{
   
console.log(error)
  }
});
}

updateUser(){
  const userData=new FormData();
  userData.append('name',this.user.name);
  userData.append('email',this.user.email);
  
  
  if (this.user && this.user.image) {
    userData.append('avatar',this.user.image);
  }
  if (this.user && this.user.RoleId) {
    userData.append('RoleId', this.user.RoleId.toString());
  }
  

  return this._userService.updateUser(this.USER.id,userData).subscribe({
    next:(data)=>{
      this.UserE.emit(data.user);
      this.activeModal.close();
      this.alertify.success(data.message);
    },
    error:(error)=>{
      this.alertify.error(error);
console.log(error)
    }
  });
}

  handleFileInput(event:any){
   const file=event.target.files[0];
   this.user.image=file;
  }
}
