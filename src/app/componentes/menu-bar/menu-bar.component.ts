import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  items : MenuItem[];
  usuario = new Usuario();
  token : string;
  helper = new JwtHelperService();
  name : string ;
  isLogged = false;
  showAlta = false;
  showVehi = false;
  showViaje = false;
  constructor(public router : Router, public routes : ActivatedRoute) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if(this.token != null)
    {
      let datos = this.helper.decodeToken(this.token);
     
      this.usuario = datos.data;
      this.name = datos.data.user;      
    
      if(this.usuario != null)
      {
        this.isLogged = true;       
       
      }
    }
    else
    {
      this.isLogged = false;
      this.router.navigate(['/']);
    }

    if(this.isLogged)
    {
      let nivel = this.usuario.nivel;
      switch (nivel) {
        case 1:
        this.items = [
          {
              label: 'Administracion',
              icon: 'fa fa-fw fa-plus',
              items: [
              {label: 'Alta Empleados',command: (event) => {
               this.showAlta = true;
               },
               icon: 'fa fa-fw fa-plus',},  
              {label: 'Alta Vehiculos',command: (event) => {
                this.showVehi = true;
                },
                icon: 'fa fa-fw fa-plus'},             
              ]
             
          },
          {
              label: 'Listado de Viajes',
              routerLink: '/AdminPrin/ListViaje'    
             
          },
          {
              label: 'Historial de Viajes', 
              routerLink: '/AdminPrin/HistViaje'   
             
          },
          {
            label: 'Listado de usuarios', 
            routerLink: '/AdminPrin/Usuarios' 
           
          },
          {
            label: 'Informes',  
               
           
          },
         ];
          break;
        case 2:
        this.items = [
          {
              label: 'Viajes asignados',
              routerLink: '/ChofPrin/ChofViaje'   
              
             
          }                  
         ];
          break;
        case 3:
        this.items = [
          {
              label: 'Solicitar viaje',
              routerLink: '/CliPrin/Viaje'
              
              
             
          },
          {
              label: 'Listado de Viajes', 
              routerLink: '/CliPrin/CliViaje'    
             
          }
         ];
          break;
      
        default:
          break;
      }
    }

  }

  logout()
  {
    localStorage.removeItem("token");
    this.isLogged = false;
    this.router.navigate(['/']);
  }

}
