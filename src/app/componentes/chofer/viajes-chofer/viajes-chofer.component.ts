import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';
import { AutheService } from '../../../servicios/authe.service';
import { viajeCHofer } from '../../../clases/viaje-chofer';
import { ConfirmationService } from 'primeng/api';
import { Viaje } from '../../../clases/viaje';
import { MapsAPILoader } from '@agm/core';
import {  } from '@types/googlemaps';

@Component({
  selector: 'app-viajes-chofer',
  templateUrl: './viajes-chofer.component.html',
  styleUrls: ['./viajes-chofer.component.css']
})
export class ViajesChoferComponent implements OnInit {

  user : string;
  viajesP:any[];
  viajes = new Array<any>();
  viajeAsig = new viajeCHofer();
  cols: any[];
  info : boolean = false;
  msg : string;
  verDir = false;  
  latitudeUno : number = 0;
  longitudeUno : number = 0; 
  latitudeDos : number = 0;
  longitudeDos : number = 0; 
  lat = 0;
  lng = 0;
  dir = undefined;
  origin = null;
  destination = null;
  constructor(public mapsApiLoeader : MapsAPILoader,public service : ViajesService,public authe : AutheService,private confirmationService: ConfirmationService) { 
   
  }
  posicionActual()
  {
    navigator.geolocation.getCurrentPosition(posicion => {
      this.lat = posicion.coords.latitude;
      this.lng = posicion.coords.longitude;
    })
  }
  VerViaje(viaje)  
  {
    this.mapsApiLoeader.load();
    this.posicionActual();
    this.service.Viajes().then(data=>{
      data.forEach(element => {
        if(viaje == element.cod_Viaje)
        {
          this.latitudeUno = parseFloat(element.latOr);
          this.longitudeUno = parseFloat(element.lonOr);
          this.latitudeDos = parseFloat( element.latDes);
          this.longitudeDos =  parseFloat(element.lonDes);
          this.origin = { lat: this.latitudeUno , lng: this.longitudeUno  };
          this.destination = { lat: this.latitudeDos, lng:  this.longitudeDos };
          console.log(element);
          
        }
       
      });    
      if(this.latitudeUno != 0 || this.latitudeDos != 0)
      {
        this.dir = {
          origin: { lat: this.latitudeUno, lng: this.longitudeUno },
          destination: { lat: this.latitudeDos, lng: this.longitudeDos }
        }
        this.verDir = true;
        console.log(this.dir.origin + "ver ruta");
       
      }
      else
      {
        this.info = true;
        this.msg = "No se puede mostrar el viaje";
      }
    })
    
  }

  Completar(viaje)
  {
    this.confirmationService.confirm({
      message: 'Desea dar como terminado el viaje?',
      accept: () => {
        this.viajeAsig.cod_Viaje = viaje;
        this.viajeAsig.estado = 4;        
        this.service.completarViaje(this.viajeAsig).then(
          
            data =>{
              if(data){
               
                let viajeFin = new Viaje();
                let date = new Date();
                console.log(date + "algo");
                viajeFin.cod_Viaje = viaje;
                viajeFin.fin = date;
                this.service.finHora(viajeFin).then(data=>{
                 if(data)
                 {
                 
                 }

                 
                });
                this.info = true;
                this.msg = "Viaje terminado";
                this.authe.pausa(5000);
                window.location.reload();
             
              }
              else
              {
                this.info = true;
                this.msg = "Error al terminar el viaje";
    
              }
            }
          
        );
        console.log(viaje);
      }
  });

 

   
  }
      Aceptar(viaje){
        this.confirmationService.confirm({
          message: 'Desea aceptar el viaje?',
          accept: () => {
            this.viajeAsig.cod_Viaje = viaje;
            this.viajeAsig.estado = 3;
            this.service.completarViaje(this.viajeAsig).then(
              
                data =>{
                  if(data){
                    this.info = true;
                    this.msg = "Viaje aceptado";
                    this.authe.pausa(5000);
                    window.location.reload();
                  }
                  else
                  {
                    this.info = true;
                    this.msg = "Error al aceptar el viaje";
        
                  }
                }
              
            );
            console.log(viaje);
          }
      });
    }
    
  ngOnInit() {
    
    this.viajesP = new Array<any>();
   
    this.user = this.authe.getUser();
    let respuesta = this.service.ViajesChofer().then(
      data => {
        data.forEach(element => {
          if(element.user == this.user && element.estado != 4 && element.estado != 1 && element.estado != 5)
          {
            this.viajesP.push(element);
          }         
        });
      }
    );
  }

}
