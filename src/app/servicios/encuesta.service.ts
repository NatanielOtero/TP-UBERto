import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
 // url : string = "http://localhost/Api/Rest";
  //url : string = "http://localhost:8080/Api/Rest";
  url = "http://natanielotero.esy.es/Api/Rest"
  constructor(public http : MiHttpService ) { }

  public ResponderEncuesta(encuesta)
  {
    return this.http.Alta(this.url + "/Usuario/AltaEncuesta",encuesta);
  }
  public TraerEncuestas()
  {
    return this.http.traer(this.url + "/Administrador/traerEncuestas");
  }
}
