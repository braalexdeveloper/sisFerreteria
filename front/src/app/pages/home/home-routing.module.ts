import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { RoleGuard } from 'src/app/utils/role.guard';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      {path:'',component:DashboardComponent},
      {
        path:'roles',
        canActivate:[RoleGuard],
        loadChildren:()=>
        import('../../modules/role/role.module').then((m)=>m.RoleModule)
      },
      {
        path:'users',
        canActivate:[RoleGuard],
        loadChildren:()=>
        import('../../modules/user/user.module').then((m)=>m.UserModule)
      }
      ,
      {
        path:'categories',
        canActivate:[RoleGuard],
        loadChildren:()=>
        import('../../modules/categorie/categorie.module').then((m)=>m.CategorieModule)
      }
      ,
      {
        path:'products',
        canActivate:[RoleGuard],
        loadChildren:()=>
        import('../../modules/product/product.module').then((m)=>m.ProductModule)
      },
      {
        path:'clients',
        loadChildren:()=>
        import('../../modules/client/client.module').then((m)=>m.ClientModule)
      },
      {
        path:'sales',
        loadChildren:()=>
        import('../../modules/sale/sale.module').then((m)=>m.SaleModule)
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
