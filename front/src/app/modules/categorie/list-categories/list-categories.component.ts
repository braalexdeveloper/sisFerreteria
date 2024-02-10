import { Component } from '@angular/core';
import { Categorie } from 'src/app/interface/categorie';
import { CategorieService } from '../service/categorie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { EditCategorieComponent } from '../edit-categorie/edit-categorie.component';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ExportService } from 'src/app/service/export.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
  categories: Categorie[] = [];
  p: number = 1;
  columns = ['id', 'name','description'];

  constructor(
    private _categorieService: CategorieService,
    private modalService:NgbModal,
    private alertify:AlertifyService,
    private exportService:ExportService
  ) {
this.allCategories()
  }

  allCategories() {
    return this._categorieService.allCategories().subscribe({
      next: (data) => {
        this.categories=data.categories;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  createCategory(){
   const modalRef=this.modalService.open(AddCategorieComponent);
   modalRef.componentInstance.CategoryC.subscribe((Category:Categorie)=>{
    this.categories.unshift(Category);
   })
  }

  editCategory(category:Categorie){
    const modalRef=this.modalService.open(EditCategorieComponent);
    modalRef.componentInstance.CATEGORY=category;
    modalRef.componentInstance.CategoryC.subscribe((category:Categorie)=>{
      let index=this.categories.findIndex((item:Categorie)=>item.id===category.id);
      if(index!=-1){
        this.categories[index]=category;
      }
     })
  }

  deleteCategory(category:Categorie){
    this.alertify.confirm({title:"Eliminar Categoria",
    message:"Estas seguro de eliminar el categoria?",
    callback_delete:()=>{
      this._categorieService.deleteCategory(category.id).subscribe({
        next:(data)=>{
         this.categories=this.categories.filter((el:Categorie)=>el.id!==category.id);       
         console.log(data)
        },
        error:(err)=>{
          console.log(err)
        }
       })
    }
  }
    )
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.categories, this.columns, 'categories','Registro de Categorias');
  }

}
