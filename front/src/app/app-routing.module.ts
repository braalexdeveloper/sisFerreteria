import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './utils/auth.guard';
import { LoginGuard } from './utils/login.guard';

const routes: Routes = [
  {path:'',canActivate:[LoginGuard],component:LoginComponent},
  {path:'login',canActivate:[LoginGuard],component:LoginComponent},
  {path:'dashboard',
  canActivate:[AuthGuard],
  loadChildren:()=>
  import('./pages/home/home.module').then((m)=>m.HomeModule)
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
