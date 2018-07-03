import { Component, OnInit } from '@angular/core';
//import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectItem} from 'primeng/api';
import { Viaje, ViajeMod } from '../../../clases/viaje';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ViajesService } from '../../../servicios/viajes.service';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var google: any;

@Component({
  selector: 'app-modificar-viaje',
  templateUrl: './modificar-viaje.component.html',
  styleUrls: ['./modificar-viaje.component.css']
})
export class ModificarViajeComponent implements OnInit {

  latitude : number = -34.60373560654476;
  longitude : number = -58.38157296180725;
  seleccioneLocalizacion : boolean = false;
  latitudeUno : number = 0;
  longitudeUno : number = 0;
  seleccioneLocalizacionUno : boolean = false;
  latitudeDos : number = 0;
  longitudeDos : number = 0;
  seleccioneLocalizacionDos : boolean = false;
  dir = undefined;
  dirLista = false;
  opcionPunto : string = "";
  primeraParte : boolean = false;
  segundaParte : boolean = true;
  info = false;
  msg : string;
  ds = new google.maps.DirectionsService();
  dr = new google.maps.DirectionsRenderer();

  op: SelectItem[];
  tipoPago : SelectItem[];
  nivelComo : SelectItem[];
  viaje : ViajeMod;
  user : string;

  helper = new JwtHelperService();
  viajeMod : ViajeMod;
  constructor(private route: ActivatedRoute, private router : Router,private builder : FormBuilder,public serv : ViajesService) {
    
    this.viajeMod = this.route.params["_value"];
    
    console.log(this.viaje);

    let token = localStorage.getItem('token');
    let datos = this.helper.decodeToken(token);
    this.user = datos.data.user;
    this.viaje = new ViajeMod();
    this.op = [
      {label:'Seleccione origen y destino...', value:null},   
      {label:'Origen', value:"O"},
      {label:'Destino', value:"D"}
      
    ];
    this.tipoPago  = [
      {label: 'Paypal', value: 'PayPal', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Visa', value: 'Visa', icon: 'fa fa-fw fa-cc-visa'},
      {label: 'MasterCard', value: 'MasterCard', icon: 'fa fa-fw fa-cc-mastercard'}
    ];
    this.nivelComo  = [
      {label: 'Lujo minimo', value: 1, },
      {label: 'Lujo medio', value: 2, },
      {label: 'Lujo alto', value: 3, }
    ];
   }

   fecha = new FormControl('',[
    Validators.required
  ]);
  pago = new FormControl('',[
    Validators.required
  ]);
  comodidad = new FormControl('',[
   Validators.required


 ]);
 viajeForm : FormGroup = this.builder.group({
   
   fecha : this.fecha,
   pago : this.pago,
   comodidad : this.comodidad
 })

 Viajar()
 {
   this.viaje.comodidad = this.viajeForm.get('comodidad').value;
   this.viaje.fecha = this.viajeForm.get('fecha').value;
   this.viaje.pago = this.viajeForm.get('pago').value;   
   this.viaje.latOr = this.latitudeUno;
   this.viaje.lonOr = this.longitudeUno;
   this.viaje.latDes = this.latitudeDos;
   this.viaje.lonDes = this.longitudeDos;
   this.viaje.user = this.user;
   this.viaje.cod_Viaje = this.viajeMod.cod_Viaje;

   console.log(this.viaje);
   console.log(this.viajeMod);
   
   
    let respuesta;
    respuesta = this.serv.ModViaje(this.viaje)
   .then( data => {
     if(data)
     {    
       console.log(respuesta);     
                 // 
          
         //  
         this.msg = "Viaje modificado con exito";
         this.info = true;
         this.router.navigate(['/CliPrin/CliViaje'])
         
         
       
     }
     else
     {
       console.log(respuesta);
       this.msg = "Error al modificar el viaje";
       this.info = true;
     } 
   })
   .catch( err => { 
     console.error(err);
     this.info = true;
     this.msg = "Error de conexion"});

     this.primeraParte = false;
     this.segundaParte = true;   
         
 }
  Siguiente()
  {
    if(this.dir != undefined)
    {
     this.primeraParte = true;
     this.segundaParte = false;
    }
    else
    {
     this.msg = "Elija el origen y el destino";
     this.info = true;
    }
   
  }
 
 
 onChooseLocation(event)
 {
   if(this.opcionPunto == null)
   {
     this.msg = "Seleccione una opcion";
     this.info = true;
   }
   else
   {
     if (this.opcionPunto == "O") 
     {
       this.latitudeUno = event.coords.lat;
       this.longitudeUno = event.coords.lng;
       this.seleccioneLocalizacionUno = true;   
     } 
     else 
     {
       this.latitudeDos = event.coords.lat;
       this.longitudeDos = event.coords.lng;
       this.seleccioneLocalizacionDos = true;
     }
   }

   if(this.latitudeUno != 0 && this.latitudeDos != 0)
   { 
     this.getDirection()
   }

   console.log(this.dir);
 }
 
  getDirection() {

    this.dir = {
      origin: { lat: this.latitudeUno, lng: this.longitudeUno },
      destination: { lat: this.latitudeDos, lng: this.longitudeDos }
    }
  }

  posicionActual()
  {
    navigator.geolocation.getCurrentPosition(posicion => {
      this.latitude = posicion.coords.latitude;
      this.longitude = posicion.coords.longitude;
    })
  }



 ngOnInit() {
   this.posicionActual();
 }

}
