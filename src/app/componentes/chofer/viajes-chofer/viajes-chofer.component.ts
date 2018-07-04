import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';
import { AutheService } from '../../../servicios/authe.service';
import { viajeCHofer } from '../../../clases/viaje-chofer';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-viajes-chofer',
  templateUrl: './viajes-chofer.component.html',
  styleUrls: ['./viajes-chofer.component.css']
})
export class ViajesChoferComponent implements OnInit {

  user : string;
  viajesP:any[];
  viajeAsig = new viajeCHofer();
  cols: any[];
  info : boolean = false;
  msg : string;  
  
  constructor(public service : ViajesService,public authe : AutheService,private confirmationService: ConfirmationService) { }

  Completar(viaje)
  {
    this.confirmationService.confirm({
      message: 'Desea dar como terminado el viaje?',
      accept: () => {
        this.viajeAsig.cod_Viaje = viaje;
        this.viajeAsig.estado = 3;
        this.service.completarViaje(this.viajeAsig).then(
          
            data =>{
              if(data){
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
  ngOnInit() {
    this.viajesP = new Array<any>();
   
    this.user = this.authe.getUser();
    let respuesta = this.service.ViajesChofer().then(
      data => {
        data.forEach(element => {
          if(element.user == this.user && element.estado == 2)
          {
            this.viajesP.push(element);
          }         
        });
      }
    );
  }

}
