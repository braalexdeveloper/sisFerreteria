import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { RoleComponent } from 'src/app/modules/role/role.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserComponent } from 'src/app/modules/user/user.component';


@NgModule({
  declarations: [
    RoleComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    
  ]
})
export class HomeModule { }
