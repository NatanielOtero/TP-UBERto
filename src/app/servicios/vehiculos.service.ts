import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  url : string = "http://localhost/Api/Rest";
  //url : string = "http://localhost:8080/Api/Rest";
  constructor(public http : MiHttpService ) { }

  AltaVehiculo(vehiculo)
  {
    return  this.http.Alta(this.url + "/Administrador/AltaVehi" , vehiculo);   
  } 
}
