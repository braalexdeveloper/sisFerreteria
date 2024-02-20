import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interface/user';
import { UserService } from '../service/user.service';
import { AlertifyService } from 'src/app/service/alertify.service';
import { RoleService } from '../../role/service/role.service';
import { Role } from 'src/app/interface/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  @Output() UserC:EventEmitter<any>=new EventEmitter();

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

createUser(){
  const userData=new FormData();
  userData.append('name',this.user.name);
  userData.append('email',this.user.email);
  userData.append('password',this.user.password);
  
  if (this.user && this.user.image) {
    userData.append('avatar',this.user.image);
  }
  if (this.user && this.user.RoleId) {
    userData.append('RoleId', this.user.RoleId.toString());
  }
  

  return this._userService.createUser(userData).subscribe({
    next:(data)=>{
      this.UserC.emit(data.user);
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
