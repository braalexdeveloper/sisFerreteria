import { Component, OnInit } from '@angular/core';
import { SaleService } from '../service/sale.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSaleComponent } from '../add-sale/add-sale.component';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit{

  sales:any=[];
  p:number=1;
  columns = ['name','description','stock','price','category'];

  constructor(
    private _saleService:SaleService,
    private modal:NgbModal
  ){
    
  }

  ngOnInit(): void {
    this.allSales();
  }

  allSales(){
    return this._saleService.allSales().subscribe({
      next:(data)=>{
        this.sales=data.sales;
      },
      error:(error)=>{
 console.log(error)
      }
    });
  }


  createVenta(){
    const modalRef=this.modal.open(AddSaleComponent, { size: 'lg' });

  }

}
