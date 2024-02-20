import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ListClientComponent } from './list-client/list-client.component';

const routes: Routes = [
  {
    path:'',
    component:ClientComponent,
    children:[
      {
        path:'',
        component:ListClientComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
