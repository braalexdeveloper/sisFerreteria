import { Component, EventEmitter, Output } from '@angular/core';
import { Client } from 'src/app/interface/client';
import { ClientService } from '../service/client.service';
import { AlertifyService } from 'src/app/service/alertify.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {

  @Output() ClientC:EventEmitter<any>=new EventEmitter();

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
    public activeModal:NgbActiveModal,
    private alertify:AlertifyService
  ){

  }


  createClient(){

    if(!this.client.name || !this.client.lastName || !this.client.dni ||  !this.client.email ||  !this.client.phone || !this.client.address){
      return this.alertify.error("Debe rellenar todos los campo obligatorios");
    }

   return this._clientService.createClient(this.client).subscribe({
    next:(data)=>{
     this.ClientC.emit(data.client);
     this.alertify.success(data.message);
     this.activeModal.close();
    },
    error:(err)=>{
    this.alertify.error(err.message);
    console.log(err);
    }
   });
  }

}
