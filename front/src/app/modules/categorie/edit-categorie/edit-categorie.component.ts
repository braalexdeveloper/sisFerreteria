import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorieService } from '../service/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categorie } from 'src/app/interface/categorie';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit{
  @Output() CategoryC:EventEmitter<any>=new EventEmitter();
  @Input() CATEGORY:any;

  name:string='';
  description:string='';
 
 
   constructor(
     private _categoryService:CategorieService,
     public activeModal:NgbActiveModal,
     private alertify:AlertifyService
   ){

   }

   ngOnInit(): void {
    this.name=this.CATEGORY.name;
    this.description=this.CATEGORY.description;
   }
 
   editCategorie(){
 
     if(!this.name || this.name===''){
       this.alertify.error("El campo nombre es obligatorio");
       return false;
     }else{
       let category:Categorie={
         name:this.name,
         description:this.description
       }
       return this._categoryService.updateCategory(this.CATEGORY.id,category).subscribe({
         next: (data) => {
           console.log(data)
           this.CategoryC.emit(data.category);
           this.alertify.success(data.message);
           this.activeModal.close();
         },
         error: (error) => {
           console.log(error)
         }
       });
     }
     
   }
}
