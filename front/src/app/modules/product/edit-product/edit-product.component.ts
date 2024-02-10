import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ProductService } from '../service/product.service';
import { Categorie } from 'src/app/interface/categorie';
import { CategorieService } from '../../categorie/service/categorie.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  @Output() ProductE:EventEmitter<any>=new EventEmitter();
  @Input() PRODUCT:any;

  name:string='';
  description:string='';
  stock:number=1;
  price:number=0;
  image:any|File='';
  pathImg:string='';
  idCategory:string='';

  categories:Categorie[]=[];

  constructor(
    private _productService:ProductService,
    private _categorieService:CategorieService,
    public activeModal:NgbActiveModal,
    private alertify:AlertifyService
  ){

  }

  ngOnInit(): void {
    this.name=this.PRODUCT.name;
    this.description=this.PRODUCT.description;
    this.stock=this.PRODUCT.stock;
    this.price=this.PRODUCT.price;
    this.pathImg=this.PRODUCT.image;
    this.idCategory=this.PRODUCT.CategoryId;

    this.getCategories();
  }
  editProduct(){
   
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('stock', this.stock.toString());
    formData.append('price', this.price.toString());
    formData.append('image', this.image); // Agrega la imagen al FormData
    formData.append('CategoryId',this.idCategory);

    return this._productService.update(this.PRODUCT.id,formData).subscribe({
      next: (data) => {
        console.log(data)
        this.ProductE.emit(data.product);
        this.alertify.success(data.message);
        this.activeModal.close();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  handleFileInput(event:any) {
   const file:File=event.target.files[0];
   this.image=file;
    console.log(this.image)
  }

  getCategories(){
    return this._categorieService.allCategories().subscribe((data)=>{
        this.categories=data.categories;
        
    })
  }
}
