import { Component, OnInit } from '@angular/core';
import { SaleService } from '../service/sale.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSaleComponent } from '../add-sale/add-sale.component';
import { ViewDetailComponent } from '../view-detail/view-detail.component';
import { ExportService } from 'src/app/service/export.service';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit{

  sales:any=[];
  p:number=1;
  columns = ['sale_date','total','status','clientName','category'];

  constructor(
    private _saleService:SaleService,
    private modal:NgbModal,
    private exportService:ExportService
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


  createSale(){
    const modalRef=this.modal.open(AddSaleComponent, { size: 'lg' });
    modalRef.componentInstance.SaleC.subscribe((sale:any)=>{
     this.sales.unshift(sale);
    });
  }

  viewDetail(id:string){
    return this._saleService.getSale(id).subscribe({
      next:(data)=>{
        const modalRef=this.modal.open(ViewDetailComponent,{size:'lg'});
        modalRef.componentInstance.detailSale=data.sale;
      },
      error:(error)=>{
        console.log(error)
      }
    });
    
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.sales, this.columns, 'reporte ','Factura');
  }

  pdfFactura(id:string){
    return this._saleService.getSale(id).subscribe({
      next:(data)=>{
        
        this.exportService.exportToPDFFactura(data.sale);
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }

}
