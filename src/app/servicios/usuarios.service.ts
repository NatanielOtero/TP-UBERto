import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url : string = "http://localhost/Api/Rest";
  //url : string = "http://localhost:8080/Api/Rest";
  constructor(public http : MiHttpService ) { }

   InciarSesion(usuario)
  {
    let respuesta;   
    respuesta =  this.http.login(this.url + "/Publico/Logear",usuario);   
    console.log(respuesta);   
  
    return respuesta;
  }
  RegistroUsuario(usuario)
  {
    return  this.http.Alta(this.url + "/Publico/Registro" , usuario);   
  } 
  AltaUsuarios(usuario)
  {
    return  this.http.Alta(this.url + "/Administrador/Alta" , usuario);   
  }   
     
  ObtenerUsuarios()
  {
    let respuesta;
    respuesta = this.http.traer(this.url +  "/Administrador/traer");
    console.log(respuesta);
    return respuesta;
  }
}
