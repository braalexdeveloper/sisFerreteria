import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
users:User[]=[];
  constructor(
    private userService:UserService
  ){

  }

  ngOnInit(): void {
    this.allUsers()
  }

  allUsers(){
    return this.userService.allUsers().subscribe({
      next:(data)=>{
        this.users=data.users;
      },
      error:(err)=>{
console.log(err)
      }
    })
  }
}
