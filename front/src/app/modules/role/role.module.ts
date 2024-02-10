import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';




@NgModule({
  declarations: [
    ListRolesComponent,
    AddRolesComponent,
    EditRolesComponent
  ],
  imports: [
   
    HttpClientModule,
    CommonModule,
    RoleRoutingModule,
    FormsModule,
  ]
})
export class RoleModule { }
