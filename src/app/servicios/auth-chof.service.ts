import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthChofService {

  helper = new JwtHelperService();
  token = null;
  user;
   
  
  canActivate() {
   
    if(this.user != null)
    { 
      if(this.user.nivel == 2)
      {
        return true;
      }
      return false;
    }
    return false;
  }


  constructor() { 
    this.token = localStorage.getItem("token");
    console.log(this.token);
    let datos = this.helper.decodeToken(this.token);
    this.user = datos.data;
    console.log(this.user);

  }
}
