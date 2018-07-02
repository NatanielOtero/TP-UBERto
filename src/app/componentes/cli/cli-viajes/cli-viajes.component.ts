import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';
import { AutheService } from '../../../servicios/authe.service';

@Component({
  selector: 'app-cli-viajes',
  templateUrl: './cli-viajes.component.html',
  styleUrls: ['./cli-viajes.component.css']
})
export class CliViajesComponent implements OnInit {


  user : string;
  viajes:any[];
  cols: any[];

  constructor(public service : ViajesService,public authe : AutheService ) { 
    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'comodidad', header: 'Comodidad' },
      { field: 'estado', header: 'Estado' }     
  ];

  }
  
  ngOnInit() {
    this.viajes = new Array<any>();
    this.user = this.authe.getUser();
    let respuesta = this.service.ViajesUser().then(
      data => {
        data.forEach(element => {
          if(element.user == this.user)
          {
            this.viajes.push(element);
          }
        });
      }
    );

  }

}
