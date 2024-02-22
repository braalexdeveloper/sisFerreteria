import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { ListSalesComponent } from './list-sales/list-sales.component';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { AditSaleComponent } from './adit-sale/adit-sale.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListSalesComponent,
    AddSaleComponent,
    AditSaleComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class SaleModule { }
