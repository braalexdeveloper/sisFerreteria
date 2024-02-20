import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userLog:any='';
 constructor(
  private authService:AuthService,
  private router:Router
 ){
  this.userLog=JSON.parse(localStorage.getItem('user') || '[]');
  console.log(this.userLog);
 }

 logout(){
   let data=JSON.parse(localStorage.getItem('user') || '[]');
   localStorage.removeItem('user');
   return this.authService.logout(data.user.id).subscribe({
    next: (data) => {
      
      console.log(data)
      this.router.navigate(['/login']);
    },
    error: (error) => {
      console.log(error)
    
    }
  })
 }
}
