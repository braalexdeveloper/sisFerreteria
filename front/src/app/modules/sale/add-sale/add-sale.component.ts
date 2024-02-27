import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../client/service/client.service';
import { ProductService } from '../../product/service/product.service';
import { SaleService } from '../service/sale.service';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {
  @Output() SaleC:EventEmitter<any>=new EventEmitter();

  sale_date: string = '2045-05-15';
  total: number = 0;

  ClientId: string = '';
  dni: string = '';
  ruc: string = '';
  name: string = '';
  lastName: string = '';

  client: any = {};

  ProductId:string='';
  nameProduct:string='';
  price:number=0;
  stock:number=0;
  quantity:number=1;

  product:any={};
  productsSelected:any=[];

  txtSearch: string = '';
  txtSearchProduct:string='';


  constructor(
    public activeModal: NgbActiveModal,
    private _clientService: ClientService,
    private _productService:ProductService,
    private _saleService:SaleService,
    private alertify:AlertifyService
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


  getProduct(){
    if (this.txtSearchProduct === "") {
      this.nameProduct = '';
      this.price = 0;
      this.stock = 0;
      this.ProductId = '';
      return false;
    } else {
    return this._productService.allProducts(this.txtSearchProduct).subscribe({

      next: (data) => {
        if (data.products.length > 0) {
          this.product = data.products[0];
          this.nameProduct = this.product.name;
          this.price = this.product.price;
          this.stock = this.product.stock;
          this.ProductId = this.product.id;
        } else {
          
          this.nameProduct= '';
          this.price  = 0;
          this.stock = 0;
          this.ProductId = '';
        }


      },
      error: (error) => {
        console.log(error)
      }

    });
  }
  }

  addProduct(){
    let product={
      ProductId:this.ProductId,
      nameProduct:this.nameProduct,
      price:this.price,
      stock:this.stock,
      quantity:this.quantity,
      subTotal:this.price*this.quantity
    }
    this.productsSelected.push(product);
    this.total+=product.subTotal;
    this.txtSearchProduct="";

    this.nameProduct = '';
    this.price = 0;
    this.stock = 0;
    this.quantity=0;
    this.ProductId = '';

  }

  deleteProduct(id:string){
   this.total=0;
    this.productsSelected=this.productsSelected.filter((item:any)=>item.ProductId!==id);
    this.productsSelected.forEach((element:any) => {
       this.total+=element.subTotal;
    });
  }

  createVenta() {
    let sale={
    sale_date:new Date(),
    total:this.total,
    ClientId:this.ClientId,
    saleDetails:this.productsSelected
  }

    return this._saleService.createSale(sale).subscribe({

      next: (data) => {
        this.SaleC.emit(data.sale);
        this.activeModal.close();
        this.alertify.success(data.message);
       console.log(data)
      },
      error: (error) => {
        console.log(error)
      }

    });
  }

}
