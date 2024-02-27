import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from 'src/app/modules/client/service/client.service';
import { ProductService } from 'src/app/modules/product/service/product.service';
import { SaleService } from 'src/app/modules/sale/service/sale.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  countSales: number = 0;
  countClients: number = 0;
  countProducts:number=0;
  constructor(
    private _saleService: SaleService,
    private _clientService: ClientService,
    private _productService: ProductService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this._saleService.allSales().subscribe((data) => {
      this.countSales = data.sales.length;
    });

    this._clientService.allClients().subscribe((data) => {
      this.countClients = data.clients.length;
    });

    this._productService.allProducts().subscribe((data) => {
      this.countProducts = data.products.length;
    });

  }


  viewSales() {
    this.router.navigate(['/dashboard/sales']);
  }

  viewClients() {
    this.router.navigate(['/dashboard/clients']);
  }

  viewProducts() {
    this.router.navigate(['/dashboard/products']);
  }

}
