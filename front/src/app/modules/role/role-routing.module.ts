import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { RoleComponent } from './role.component';

const routes: Routes = [
  {path:'',component:RoleComponent,
   children:[
    {path:'',component:ListRolesComponent},
   
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
