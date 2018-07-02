import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  url : string = "http://localhost/Api/Rest";
  //url : string = "http://localhost:8080/Api/Rest";
  constructor(public http : MiHttpService ) { }

  PedirViaje(viaje)
  {
    return  this.http.Alta(this.url + "/Usuario/PedirViaje" , viaje);   
  } 
  ViajesUser()
  {
    return  this.http.traer(this.url + "/Usuario/ViajesUsuario");
      
  }
}
