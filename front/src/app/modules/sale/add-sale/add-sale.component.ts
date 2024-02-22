import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../client/service/client.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {
  sale_date: string = '2045-05-15';
  total: number = 0;

  ClientId: string = '';
  dni: string = '';
  ruc: string = '';
  name: string = '';
  lastName: string = '';

  client: any = {};

  txtSearch: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private _clientService: ClientService
  ) {

  }

  ngOnInit(): void {

  }

  getClient() {
    if (this.txtSearch === "") {
      this.name = '';
      this.dni = '';
      this.ruc = '';
      this.lastName = '';
      this.ClientId = '';
      return false;
    } else {
      return this._clientService.allClients(this.txtSearch).subscribe({

        next: (data) => {
          if (data.clients.length > 0) {
            this.client = data.clients[0];
            this.name = this.client.name;
            this.dni = this.client.dni;
            this.ruc = this.client.ruc;
            this.lastName = this.client.lastName;
            this.ClientId = this.client.id;
          } else {
            this.name = '';
            this.dni = '';
            this.ruc = '';
            this.lastName = '';
            this.ClientId = '';
          }


        },
        error: (error) => {
          console.log(error)
        }

      });
    }

  }

  createVenta() {

  }

}
