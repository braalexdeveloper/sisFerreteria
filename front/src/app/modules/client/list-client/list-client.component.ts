import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interface/client';
import { ClientService } from '../service/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddClientComponent } from '../add-client/add-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ExportService } from 'src/app/service/export.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit{
  clients:Client[]=[];
  p:number=1;
  textSearch:string='';

  columns = ['name','lastName','dni','ruc','email','phone','address'];

  constructor(
private _clientService:ClientService,
private modalService:NgbModal,
private alertify:AlertifyService,
private exportService:ExportService
  ){}

  ngOnInit(): void {
    this.allClients();
  }
 

  allClients(){
    return this._clientService.allClients(this.textSearch).subscribe({
      next:(data)=>{
         this.clients=data.clients
      },
      error:(error)=>{
console.log(error)
      }
    })
  }

  createClient(){
   const modalRef=this.modalService.open(AddClientComponent);
   modalRef.componentInstance.ClientC.subscribe((client:Client)=>{
      this.clients.unshift(client);
   })
  }

  updateClient(client:Client){
   const modalRef=this.modalService.open(EditClientComponent);
   modalRef.componentInstance.CLIENT=client;
   modalRef.componentInstance.ClientE.subscribe((client:Client)=>{
     let index=this.clients.findIndex((el:Client)=>el.id===client.id);

     if(index!=-1){
       this.clients[index]=client;
     }
   })

  }

  deleteClient(id:string){
     this.alertify.confirm({
      title:"Eliminar Cliente",
      message:"¿Estas seguro de eliminar el Cliente?",
      callback_delete:()=>{
        return this._clientService.deleteClient(id).subscribe({
          next:(data)=>{
           
           this.clients= this.clients.filter((el:Client)=>el.id!==id);       
           console.log(data)
          },
          error:(err)=>{
            console.log(err)
          }
         });
      }
     });
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.clients, this.columns, 'Clientes','Registro de Productos');
  }
}
