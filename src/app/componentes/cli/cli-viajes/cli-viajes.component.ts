import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';
import { AutheService } from '../../../servicios/authe.service';
import { Viaje } from '../../../clases/viaje';
import {ConfirmationService} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import { Router, Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cli-viajes',
  templateUrl: './cli-viajes.component.html',
  styleUrls: ['./cli-viajes.component.css']
})
export class CliViajesComponent implements OnInit {


  user : string;
  viajesP:any[];
  viajesR:any[]; 
  cols: any[];
  info : boolean = false;
  msg : string;
  modo: SelectItem[];
  op : boolean = false; 
  encues = false;
  viajeEncuesta : Viaje;
  
  constructor(public service : ViajesService,public authe : AutheService,private confirmationService: ConfirmationService, private router : Router, route: ActivatedRoute, ) { 
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
  
  Eliminar(cod_Viaje)
  {
      this.confirmationService.confirm({
        message: 'Esta seguro de cancelar el viaje?',
        accept: () => {
          var viaje : Viaje = new Viaje();
          this.viajesP.forEach(element => {
            if(element.cod_Viaje == cod_Viaje)
            {
              console.log(element);
              viaje = element;
            }
          });
          viaje.estado = 5;
          console.log(viaje);
          if(viaje != null)
          {
            if(viaje.estado != 3)
            {
              this.service.BajaViaje(viaje);
              this.info = true;
              this.msg = "Viaje cancelado"; 
              this.authe.pausa(5000).then(data=>{
                console.log(data);
                window.location.reload();
              });
              

            }
            else
            {
              this.info = true;
              this.msg = "No se puede cancelar un viaje en curso";  
            }
                
                  
          }
        }
      });
    
  }
  Modificar(cod_Viaje)
  {
    
        var viaje : Viaje = new Viaje();
        this.viajesP.forEach(element => {
          if(element.cod_Viaje == cod_Viaje)
          {
            console.log(element);
            viaje = element;
          }
        });
        console.log(viaje);
        if(viaje != null)
        {
          if(viaje.estado == 1)
          {
           
            this.router.navigate(['/CliPrin/ModViaje',viaje]);
           
           
          }
          else
          {
            this.info = true;
            this.msg = "No se puede modificar un viaje en curso";  
          }
              
                
        }
      
    

  }
  
  ngOnInit() {
    this.crearTabla();

  }
  Encuesta(viaje)
  {
    this.encues = true;
    this.viajesR.forEach(element => {
      if(element.cod_Viaje == viaje)
      {
        this.viajeEncuesta = element;
      }
    });
    console.log(this.viajeEncuesta + "viaje comp");
  }
  crearTabla()
  {
    this.viajesP = new Array<any>();
    this.viajesR = new Array<any>();  
    
    this.user = this.authe.getUser();
    let respuesta = this.service.ViajesUser().then(
      data => {
        data.forEach(element => {
          if(element.user == this.user && element.estado != 4 && element.estado != 5)
          {
            this.viajesP.push(element);
          }
          if(element.user == this.user)
          {
            if( element.estado == 4 || element.estado == 5)
            {
              this.viajesR.push(element);
            }
          }
          
          
        });
      }
    );
  }

}
