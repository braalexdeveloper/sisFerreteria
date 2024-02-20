import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from './sale.component';
import { ListSalesComponent } from './list-sales/list-sales.component';

const routes: Routes = [
  {
    path:'',
    component:SaleComponent,
    children:[{
      path:'',component:ListSalesComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
