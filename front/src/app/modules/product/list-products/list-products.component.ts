import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from '../service/product.service';
import { AlertifyService } from 'src/app/service/alertify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ExportService } from 'src/app/service/export.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
products:Product[]=[];
p:number=1;
columns = ['name','description','stock','price','category'];
txtSearch:string='';

constructor(
  private _productService:ProductService,
  private alertify:AlertifyService,
  public modalService:NgbModal,
  private exportService:ExportService
){

}
ngOnInit(): void {
  this.allProducts()
}

allProducts(){
  console.log(this.txtSearch)
  return this._productService.allProducts(this.txtSearch).subscribe({
    next:(data)=>{
      this.products=data.products;
  
    },
    error:(error)=>{
console.log(error)
    }
  });
}

createProduct(){
  const modalRef=this.modalService.open(AddProductComponent);
  modalRef.componentInstance.ProductC.subscribe((product:Product)=>{
  this.products.unshift(product);
  });
}

updateProduct(product:Product){
  const modalRef=this.modalService.open(EditProductComponent);
  modalRef.componentInstance.PRODUCT=product;
  modalRef.componentInstance.ProductE.subscribe((product:Product)=>{
  let index=this.products.findIndex((item:Product)=>item.id===product.id);
  if(index!=-1){
this.products[index]=product;
  }
  });
}

deleteProduct(id:any){
 this.alertify.confirm({
  title:"Eliminar Producto",
  message:"¿Estas seguro de eliminar el Producto?",
  callback_delete:()=>{
    this._productService.delete(id).subscribe({
      next:(data)=>{
       
       this.products= this.products.filter((el:Product)=>el.id!==id);       
       console.log(data)
      },
      error:(err)=>{
        console.log(err)
      }
     })
  }
 })
}

exportToPDF(): void {
  this.exportService.exportToPDF(this.products, this.columns, 'productos','Registro de Productos');
}

}
