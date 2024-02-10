import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleService } from '../service/role.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit{
@Input() ROLE:any;
@Output() RoleE:EventEmitter<any>=new EventEmitter();

name:any='';

  constructor(
    private _roleService:RoleService,
    public activeModal:NgbActiveModal,
    private alertify:AlertifyService
  ){

  }

  ngOnInit(): void {
    this.name=this.ROLE.name;
  }

  editRole(){
    return this._roleService.update(this.ROLE.id,{name:this.name}).subscribe({
      next:(data)=>{
       this.RoleE.emit(data.role);
       this.activeModal.close();
       this.alertify.success(data.message);
       console.log(data)
      },
      error:(err)=>{
        console.log(err)
      }
     })
  }
}
