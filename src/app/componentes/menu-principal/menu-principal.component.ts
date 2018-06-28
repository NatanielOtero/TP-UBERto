import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
//import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AutheService } from '../../servicios/authe.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../clases/usuario';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  token : string;
  usuario = new Usuario();
  helper = new JwtHelperService();
  constructor (public serv : UsuariosService,public tokenServ : AutheService,public router : Router,public routes : ActivatedRoute) {
    this.token = this.tokenServ.getToken();
    let payload = this.helper.decodeToken(this.token);
    this.usuario = payload.data;
    let nivel = this.usuario.nivel;
    switch (nivel) {
      case 1:  
        this.router.navigate(['/AdminPrin']);  
        break;
      case 2:

        break;
      case 3:

        break;
    
      default:
        break;
    }
  }
  ngOnInit() {
    
  }
  probando(){
    let usuarios ;
    usuarios = this.serv.ObtenerUsuarios().then(data => {console.log(data)});
    console.log(usuarios);
  }
  /*public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
   
  public origin: {}
  public destination: {}

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

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
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
   
    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }*/

}
