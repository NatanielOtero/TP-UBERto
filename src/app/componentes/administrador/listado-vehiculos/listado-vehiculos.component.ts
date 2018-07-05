import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';
import { AutheService } from '../../../servicios/authe.service';
import { Viaje } from '../../../clases/viaje';
import {ConfirmationService} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { viajeCHofer } from '../../../clases/viaje-chofer';

@Component({
  selector: 'app-listado-vehiculos',
  templateUrl: './listado-vehiculos.component.html',
  styleUrls: ['./listado-vehiculos.component.css']
})
export class ListadoVehiculosComponent implements OnInit {
 
  viajes:any[];
  viajeAsig = new viajeCHofer();
  cols: any[];
  info : boolean = false;
  msg : string;
  modo: SelectItem[];
  op : boolean = false;
  asig = false;
  remiserosAcordes:any[];
  constructor(public service : ViajesService,public aux : AutheService,public users : UsuariosService,public authe : AutheService,private confirmationService: ConfirmationService, private router : Router, route: ActivatedRoute, ) { 
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
        if(viaje.comodidad == element.comodidad && element.estado == 1)
        {
          this.remiserosAcordes.push(element);
        }
      });
      if(this.remiserosAcordes.length == 0)
      {
        this.confirmationService.confirm({
          message: "No hay remiseros que cumplan con los requisitos, desea asignar el viaje a otro remisero? ",
          accept: () => {
            data.forEach(element => {
              if(element.estado == 1)
              {
                this.remiserosAcordes.push(element);
              }
            });
            this.viajeAsig.cod_Viaje = cod_viaje;
            this.viajeAsig.estado = 2;
            this.asig = true;  
          }
        });
       
       
      }else
      {
        this.viajeAsig.cod_Viaje = cod_viaje;
        this.viajeAsig.estado = 2;
        this.asig = true;
      }
     } 
    ).catch(err=>{console.log(err)});
 
    console.log(viaje);
    console.log(this.remiserosAcordes);
    

  }
  asignarChofer(chofer)
  {
    this.viajeAsig.chofer = chofer;
    this.viajeAsig.estado = 2;
    console.log(this.viajeAsig);
    
    
    this.service.asignarViaje(this.viajeAsig).then(
      data => {
        if(data)
        {
          this.service.cambiarEstado(this.viajeAsig).then(
            data2 => {
              if(data2)
              {
                this.info = true;
                this.msg = "Viaje asignado a: " + chofer;
                this.asig = false;
                this.aux.pausa(5000);
                window.location.reload();
                
                
              }
              else
              {
                this.info = true;
                this.msg = "Viaje no asignado";
              }

            }
          )
         
          
        }
        else
        {
          this.info = true;
          this.msg = "Viaje no asignado";
        }
      }
    )
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
