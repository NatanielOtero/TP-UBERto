import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthCliService {

  helper = new JwtHelperService();
  token = null;
  user;
   
  
  canActivate() {
  
    if(this.user != null)
    { 
      if(this.user.nivel == 3)
      {
        return true;
      }
      return false;
    }
    return false;
  }


  constructor() { 
    this.token = localStorage.getItem("token");
   
    let datos = this.helper.decodeToken(this.token);
    if(datos != null)
    {
      this.user = datos.data;
    }
    else
    {
        this.user = null;
    }
 

  }
}
