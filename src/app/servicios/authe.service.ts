import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwt : JwtHelperService = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AutheService {



  
  constructor() {
    
   }
   public getUser() : string{
     

     let token = this.getToken();
     let datos = jwt.decodeToken(token);
     let user = datos.data.user;
     console.log(user + "autheServ");
     return user;
   }
   public getToken() : string {
     return localStorage.getItem('token');
   }
   public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return jwt.isTokenExpired(token);
  }

  
}
