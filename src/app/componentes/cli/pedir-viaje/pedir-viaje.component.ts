import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {  } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectItem} from 'primeng/api';
import { Viaje } from '../../../clases/viaje';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ViajesService } from '../../../servicios/viajes.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AutheService } from '../../../servicios/authe.service';
import {ConfirmationService} from 'primeng/api';

declare var google: any;

@Component({
  selector: 'app-pedir-viaje',
  templateUrl: './pedir-viaje.component.html',
  styleUrls: ['./pedir-viaje.component.css']
})
export class PedirViajeComponent implements OnInit {

  

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number = 14;

  public latitude1: number;
  public longitude1: number;

  public latitude2: number;
  public longitude2: number;

  public lat: Number;
  public lng: Number;

  public dir: any = undefined;

  public OriplaceGmaps: google.maps.places.PlaceResult;
  public AuxPlaceGmaps: google.maps.places.PlaceResult;
  public DestplaceGmaps: google.maps.places.PlaceResult;

  originSet = false;
  destSet = false;

  user : string;
  viaje : Viaje;
  helper = new JwtHelperService();
  tipoPago : SelectItem[];
  nivelComo : SelectItem[];
  isLoca = false;
  info = false;
  msg : string;
  carga = false;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private confirmationService: ConfirmationService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private builder : FormBuilder,public viajeService : ViajesService,public aux : AutheService,public router : Router,) {

    let token = localStorage.getItem('token');
    let datos = this.helper.decodeToken(token);
    this.user = datos.data.user;
    this.viaje = new Viaje();
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
      Siguiente()
      {
        
        this.viaje.comodidad = this.viajeForm.get('comodidad').value;
        this.viaje.fecha = this.viajeForm.get('fecha').value;
        this.viaje.pago = this.viajeForm.get('pago').value;  
        this.viaje.user = this.user;       
        console.log(this.viaje);
        this.isLoca = true;  
      }
  
    ngOnInit() {
      //set google maps defaults
      // this.zoom = 4;
      //this.latitude = 39.8282;
      // this.longitude = -98.5795;
  
      //create search FormControl
      this.searchControl = new FormControl();
  
      //set current position
      this.setCurrentPosition();
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
  
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 15;
          });
        });
      });
    }
    private setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 15;
        });
      }
    }
    origen() {
      
      this.latitude1 = this.latitude;
      this.longitude1 = this.longitude;
      console.log("1. " + this.latitude1);
      console.log("1. " + this.longitude1);
      (<HTMLInputElement>document.getElementById('float-input')).value = " ";
      this.dir = {
        origin: { lat: this.latitude1, lng: this.longitude1 },
        destination: { lat: this.latitude2, lng: this.longitude2 }
      }
      this.originSet = true;
    }
    destino() {
      
      this.latitude2 = this.latitude;
      this.longitude2 = this.longitude;
      console.log("2. " + this.latitude2);
      console.log("2. " + this.longitude2);
      (<HTMLInputElement>document.getElementById('float-input')).value = " ";
      this.dir = {
        origin: { lat: this.latitude1, lng: this.longitude1 },
        destination: { lat: this.latitude2, lng: this.longitude2 }
      }
      this.destSet = true;
    }
    calcular() {
      this.carga = true;
      this.dir = {
        origin: { lat: this.latitude1, lng: this.longitude1 },
        destination: { lat: this.latitude2, lng: this.longitude2 }
      }

      //////////////////
      let servicio = new google.maps.DistanceMatrixService();
      let mode = google.maps.TravelMode['DRIVING'];
      let origen = new google.maps.LatLng(this.latitude1, this.longitude1);
      let destino = new google.maps.LatLng(this.latitude2, this.longitude2);
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
          console.log("TIEMPO EN SEGUNDOS: " + responseDis.rows[0].elements[0].duration.value);
          this.viaje.latOr = this.latitude1;
          this.viaje.latDes = this.latitude2;
          this.viaje.lonOr = this.longitude1;
          this.viaje.lonDes = this.longitude2;
          this.viaje.costo = costo;
          this.viaje.distancia = distancia;
          console.log(this.viaje);
          this.viajeService.PedirViaje(this.viaje).then(data => 
          {
            if(data.respuesta)
            {    
              
                        // 
                
                //
                this.carga = false;
                this.confirmationService.confirm({
                  message: 'Viaje pedido con exito',
                  accept: () => {
                      window.location.reload();
                  }
              });
              
               
                

              
              
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

          }).catch(err =>{

          });

          
          ////////////////
         
          //////////////////
        }
      });
      //////////////////
  
    }
    
  
     
  
  
    
  }


