import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Usuario } from '../../../clases/usuario';
import { AutheService } from '../../../servicios/authe.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  info = false;
  msg : string;
  usuarios = new Array<any>();
  constructor(public servicio : UsuariosService, public aux : AutheService) {
    servicio.ObtenerUsuarios().then(data=>{
      data.forEach(element => {
        if(element.nivel != 1)
        {
          this.usuarios.push(element);
        }        
      });
    })
   }

  ngOnInit() {
  }
  Suspender(user)
  {
    let userMod : Usuario;
    this.usuarios.forEach(element => {
      if(element.user == user)
      {
        userMod = element;
      }
    });
    userMod.estado = 2;
    if(userMod.nivel == 2)
    {
      this.servicio.ModUs(userMod).then(data=>{
        if(data)
        {
          this.servicio.ModChof(userMod).then(
            data2 =>{
              if(data2)
              {
                this.info = true;
                this.msg = "Chofer suspendido";
                /*this.aux.pausa(5000);
                window.location.reload();*/
              }
            }
          );
        }
      });
      
    }else
    {
      this.servicio.ModUs(userMod).then(data=>{
        if(data)
        {
                this.info = true;
                this.msg = "Usuario suspendido";
                /*this.aux.pausa(5000);
                window.location.reload();*/
        }
      });
    }
  }
  Habilitar(user)
  {
    let userMod : Usuario;
    this.usuarios.forEach(element => {
      if(element.user == user)
      {
        userMod = element;
      }
    });
    userMod.estado = 1;
    if(userMod.nivel == 2)
    {
      this.servicio.ModUs(userMod).then(data=>{
        if(data)
        {
          this.servicio.ModChof(userMod).then(
            data2 =>{
              if(data2)
              {
                this.info = true;
                this.msg = "Chofer Habilitado";
                this.aux.pausa(5000);
                window.location.reload();
              }
            }
          );
        }
      });
      
    }else
    {
      this.servicio.ModUs(userMod).then(data=>{
        if(data)
        {
                this.info = true;
                this.msg = "Usuario Habilitado";
                this.aux.pausa(5000);
                window.location.reload();
        }
      });
    }
  }
}
