import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.css']
})
export class HistorialViajesComponent implements OnInit {
  viajes:any[];
  constructor(public service : ViajesService) { }

  ngOnInit() {
    this.viajes = new Array<any>();  
   
    let respuesta = this.service.ViajesAdmin().then(
      data => {
        data.forEach(element => {
         
            this.viajes.push(element);
               
        });
      }
    );
  }

}
