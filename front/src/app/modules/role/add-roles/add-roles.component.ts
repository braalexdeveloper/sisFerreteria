import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../service/role.service';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent {
@Output() RoleC:EventEmitter<any>=new EventEmitter();
  
  name:any='';


  constructor(
    public activeModal:NgbActiveModal,
    private _roleService:RoleService,
    private alertify:AlertifyService
  ){}
  close(){
 this.activeModal.close()
  }

  createRole(){
   return this._roleService.create({name:this.name}).subscribe({
    next:(data)=>{
      this.RoleC.emit(data.role);
      this.close();
      this.alertify.success(data.message)
     console.log(data)
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }
}
