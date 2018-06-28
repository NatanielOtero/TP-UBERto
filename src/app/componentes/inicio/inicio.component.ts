import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../clases/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  items: MenuItem[];
  displayLogin = false;
  displayRegistro = false;
  usuario = new Usuario();
  token : string;
  helper = new JwtHelperService();
  isLogged = false;
 
  constructor(public router : Router, public routes : ActivatedRoute, public servicio : UsuariosService) { }


  logout()
  {
    localStorage.removeItem("token");
    this.isLogged = false;
  }

  ngOnInit() {
    
    this.token = localStorage.getItem('token');
    if(this.token != null)
    {
      let datos = this.helper.decodeToken(this.token);
      console.log(datos);
      this.usuario = datos.data;
      console.log(this.usuario);
      if(this.usuario != null)
      {
        this.isLogged = true;
        this.router.navigate(['/Principal']);
        //navigate al infinito
      }
    }
    
  

  }
    showLogin() {
    
          this.displayLogin = true;
  
          
      }
      showRegistro() {
        this.displayRegistro = true;
    }
  

}
