import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
constructor(
  private authService:AuthService,private router:Router
){

}

  canActivate(){
    let userAuth = this.authService.isAuthenticated();
    if(userAuth){
     console.log("Autenticado");
     return true;
    }else{
    
      console.log("No autenticado");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
