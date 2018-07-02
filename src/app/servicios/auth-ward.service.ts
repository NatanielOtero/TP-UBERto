import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthWardService implements CanActivate {
 
  helper = new JwtHelperService();
  token = null;
  user;
   
  
  canActivate() {
   
    if(this.user != null)
    {
      return true;
    }
    return false;
  }


  constructor() { 
    this.token = localStorage.getItem("token");    
    let datos = this.helper.decodeToken(this.token);
    this.user = datos.data;
    

  }
}
