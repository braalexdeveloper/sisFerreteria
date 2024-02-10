import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      {path:'',component:DashboardComponent},
      {
        path:'roles',
        loadChildren:()=>
        import('../../modules/role/role.module').then((m)=>m.RoleModule)
      },
      {
        path:'users',
        loadChildren:()=>
        import('../../modules/user/user.module').then((m)=>m.UserModule)
      }
      ,
      {
        path:'categories',
        loadChildren:()=>
        import('../../modules/categorie/categorie.module').then((m)=>m.CategorieModule)
      }
      ,
      {
        path:'products',
        loadChildren:()=>
        import('../../modules/product/product.module').then((m)=>m.ProductModule)
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
