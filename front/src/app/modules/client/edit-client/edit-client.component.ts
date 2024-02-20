import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientService } from '../service/client.service';
import { AlertifyService } from 'src/app/service/alertify.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/interface/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit{

  @Output() ClientE:EventEmitter<any>=new EventEmitter();
  @Input() CLIENT:any;

  client:Client={
    name:'',
    lastName:'',
    dni:'',
    ruc:'',
    email:'',
    phone:'',
    address:''
  }
  
  constructor(
    private _clientService:ClientService,
    private alertify:AlertifyService,
    public activeModal:NgbActiveModal
  ){
   
  }

  ngOnInit(): void {
    this.client.name=this.CLIENT.name
    this.client.lastName=this.CLIENT.lastName
    this.client.dni=this.CLIENT.dni
    this.client.ruc=this.CLIENT.ruc
    this.client.email=this.CLIENT.email
    this.client.phone=this.CLIENT.phone
    this.client.address=this.CLIENT.address
  }


  updateClient(){
   return this._clientService.updateClient(this.CLIENT.id,this.client).subscribe({
    next:(data)=>{
      this.ClientE.emit(data.client);
      this.alertify.success(data.message);
      this.activeModal.close();
    },
    error:(err)=>{
      this.alertify.error(err.message);
    }
   });
  }

}
