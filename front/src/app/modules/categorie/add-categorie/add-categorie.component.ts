import { Component, EventEmitter, Output } from '@angular/core';
import { CategorieService } from '../service/categorie.service';
import { User } from 'src/app/interface/user';
import { Categorie } from 'src/app/interface/categorie';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {
 name:string='';
 description:string='';

 @Output() CategoryC:EventEmitter<any>=new EventEmitter();

  constructor(
    private _categoryService:CategorieService,
    public activeModal:NgbActiveModal,
    private alertify:AlertifyService
  ){

  }

  createCategorie(){

    if(!this.name || this.name===''){
      this.alertify.error("El campo nombre es obligatorio");
      return false;
    }else{
      let category:Categorie={
        name:this.name,
        description:this.description
      }
      return this._categoryService.createCategorie(category).subscribe({
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
