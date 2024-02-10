import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../service/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AlertifyService } from 'src/app/service/alertify.service';
import { CategorieService } from '../../categorie/service/categorie.service';
import { Categorie } from 'src/app/interface/categorie';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  @Output() ProductC:EventEmitter<any>=new EventEmitter();

  name:string='';
  description:string='';
  stock:number=1;
  price:number=0;
  image:any|File='';
  idCategory:string='';
  categories:Categorie[]=[];

  constructor(
    private _productService:ProductService,
    private _categoryService:CategorieService,
    public activeModal:NgbActiveModal,
    private alertify:AlertifyService
  ){

  }

  ngOnInit(): void {
    this.getCategories();
  }
  createProduct(){
   if(!this.name || !this.stock || !this.price || !this.idCategory){
    return this.alertify.error("Rellena los campos obligatorios");
   }else{
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('stock', this.stock.toString());
    formData.append('price', this.price.toString());
    formData.append('image', this.image);
    formData.append('CategoryId',this.idCategory); // Agrega la imagen al FormData

    return this._productService.create(formData).subscribe({
      next: (data) => {
        console.log(data)
        this.ProductC.emit(data.product);
        this.alertify.success(data.message);
        this.activeModal.close();
      },
      error: (error) => {
        console.log(error)
      }
    })
   }
  }

  handleFileInput(event:any) {
   const file:File=event.target.files[0];
   this.image=file;
    console.log(this.image)
  }

  getCategories(){
    return this._categoryService.allCategories().subscribe((data)=>{
        this.categories=data.categories;
        
    })
  }

}
