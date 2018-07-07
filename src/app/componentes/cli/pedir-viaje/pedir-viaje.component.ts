import { Component, OnInit } from '@angular/core';
//import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectItem} from 'primeng/api';
import { Viaje } from '../../../clases/viaje';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ViajesService } from '../../../servicios/viajes.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AutheService } from '../../../servicios/authe.service';
import { CalcularPrecioService } from '../../../servicios/calcular-precio.service';

declare var google: any;

@Component({
  selector: 'app-pedir-viaje',
  templateUrl: './pedir-viaje.component.html',
  styleUrls: ['./pedir-viaje.component.css']
})
export class PedirViajeComponent implements OnInit {

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
  carga = false;
  op: SelectItem[];
  tipoPago : SelectItem[];
  nivelComo : SelectItem[];
  viaje : Viaje;
  user : string;

  helper = new JwtHelperService();

  constructor(private builder : FormBuilder,public serv : ViajesService,public router : Router,public aux : AutheService) {
    
    let token = localStorage.getItem('token');
    let datos = this.helper.decodeToken(token);
    this.user = datos.data.user;
    this.viaje = new Viaje();
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
      this.msg = "Viaje pedido con exito";
      this.carga = true;
      let servicio = new google.maps.DistanceMatrixService();
      let mode = google.maps.TravelMode['DRIVING'];
      let origen = new google.maps.LatLng(this.latitudeUno, this.longitudeDos);
      let destino = new google.maps.LatLng(this.latitudeDos, this.longitudeDos);
      servicio.getDistanceMatrix({
        origins: [origen],
        destinations: [destino],
        travelMode: mode,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
      }, (responseDis, status) => {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          console.log("error", status);
        } else {
          var distancia = responseDis.rows[0].elements[0].distance.value;
          var costo = (distancia / 1000) * 15;
          console.log(responseDis);
          console.log("DISTANCIA TEXTO: " + responseDis.rows[0].elements[0].distance.text);
          console.log("TIEMPO TEXTO: " + responseDis.rows[0].elements[0].duration.text);
          console.log("**");
          console.log("DISTANCIA EN METROS: " + responseDis.rows[0].elements[0].distance.value);
          console.log("DISTANCIA EN Kilometros: " + (responseDis.rows[0].elements[0].distance.value)/1000);
          console.log("TIEMPO EN SEGUNDOS: " + responseDis.rows[0].elements[0].duration.value);
          this.viaje.comodidad = this.viajeForm.get('comodidad').value;
          this.viaje.fecha = this.viajeForm.get('fecha').value;
          this.viaje.pago = this.viajeForm.get('pago').value;   
          this.viaje.latOr = this.latitudeUno;
          this.viaje.lonOr = this.longitudeUno;
          this.viaje.latDes = this.latitudeDos;
          this.viaje.lonDes = this.longitudeDos;
          this.viaje.costo = costo;
          this.viaje.distancia =  responseDis.rows[0].elements[0].distance.value;         
          this.viaje.costo = costo;
          this.viaje.user = this.user;
          console.log(this.viaje);
          
          this.primeraParte = false;
          this.segundaParte = true;   
          let respuesta;
          respuesta = this.serv.PedirViaje(this.viaje)
          .then( data => {
            if(data.respuesta)
            {    
              console.log(respuesta);     
                        // 
                
                //
                
               
                
                this.aux.pausa(5000).then(
                  data =>
                  {
                    this.info = true;
                    this.carga = false;
                    window.location.reload();
                  }                  
                );
              
              
            }
            else
            {
              console.log(data.mensaje);
              if(data.mensaje == "Usuario invalido")
              {
                this.msg=data.mensaje;
                this.info = true;
                localStorage.removeItem("token");
                this.aux.pausa(5000);          
                this.router.navigate(['/']);
              }
              this.msg = "Error al pedir el viaje";
              this.info = true;
              this.aux.pausa(5000);
              window.location.reload();
            } 
          })
          .catch( err => { 
            console.error(err);
            this.info = true;
            this.msg = "Error de conexion"}); 
         
          ////////////////      
          //////////////////
        }
      });
    
          
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
