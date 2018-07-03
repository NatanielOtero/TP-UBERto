import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';
import { AutheService } from '../../../servicios/authe.service';
import { Viaje } from '../../../clases/viaje';
import {ConfirmationService} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../servicios/usuarios.service';

@Component({
  selector: 'app-listado-vehiculos',
  templateUrl: './listado-vehiculos.component.html',
  styleUrls: ['./listado-vehiculos.component.css']
})
export class ListadoVehiculosComponent implements OnInit {
 
  viajes:any[];
  
  cols: any[];
  info : boolean = false;
  msg : string;
  modo: SelectItem[];
  op : boolean = false;
  remiserosAcordes:any[];
  constructor(public service : ViajesService,public users : UsuariosService,public authe : AutheService,private confirmationService: ConfirmationService, private router : Router, route: ActivatedRoute, ) { 
    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'comodidad', header: 'Comodidad' },
      { field: 'estado', header: 'Estado' }     
  ];
  this.modo = [
    {label:'Viajes Pendientes', value:false},
    {label:'Viajes Realizados', value:true},    
  ];
  }

  asignarViaje(cod_viaje)
  {
    let viaje = new Viaje();
    this.remiserosAcordes = new Array<any>();
    this.viajes.forEach(element => {
      if(element.cod_Viaje == cod_viaje)
      {
        viaje = element;
      }
    });
    this.users.traerChoferes().then(
     data=>{
      data.forEach(element => {
        if(viaje.comodidad == element.comodidad)
        {
          this.remiserosAcordes.push(element);
        }
      });
     } 
    ).catch(err=>{console.log(err)});
    if(this.remiserosAcordes.length == 0)
    {
      this.info = true;
      this.msg = "No hay remiseros que cumplan con los requisitos";
    }
    console.log(viaje);
    console.log(this.remiserosAcordes);
    

  }

  ngOnInit() {
    this.crearTabla();

  }

  crearTabla()
  {
    this.viajes = new Array<any>();  
   
    let respuesta = this.service.ViajesAdmin().then(
      data => {
        data.forEach(element => {
          if( element.estado == 1)
          {
            this.viajes.push(element);
          }          
        });
      }
    );
  }

}
