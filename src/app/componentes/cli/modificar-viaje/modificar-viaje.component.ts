import { Component, ElementRef, NgZone, OnInit, ViewChild, Input } from '@angular/core';
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
  selector: 'app-modificar-viaje',
  templateUrl: './modificar-viaje.component.html',
  styleUrls: ['./modificar-viaje.component.css']
})
export class ModificarViajeComponent implements OnInit {

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
  @Input() viajeMod : Viaje;
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
        this.viaje = this.viajeMod;
        this.viaje.comodidad = this.viajeForm.get('comodidad').value;
        this.viaje.fecha = this.viajeForm.get('fecha').value;
        this.viaje.pago = this.viajeForm.get('pago').value;  
        this.viaje.user = this.user;  
     
        console.log(this.viaje);
        this.isLoca = true; 
      
        this.viajeService.ModViaje(this.viaje).then(data => 
          {
            if(data.respuesta)
            {  
               
              window.location.reload();
              
            }
            else
            {
              
              this.msg = "Error al modificar el viaje";
              this.info = true;
              this.aux.pausa(5000);
              window.location.reload();
            } 

          }).catch(err =>{
            console.log(err)
          }); 
          
     
        
      }
  
    ngOnInit() {
     
    }
    
    
   
   

}
