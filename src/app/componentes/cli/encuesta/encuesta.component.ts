import { Component, OnInit,Input } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';
import { Encuesta } from '../../../clases/encuesta';
import { Viaje } from '../../../clases/viaje';
import { EncuestaService } from '../../../servicios/encuesta.service';
import { AutheService } from '../../../servicios/authe.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  @Input() viaje : Viaje;

  viajes = new Array<any>();
  chofer ;
  info = false;
  msg : string;
  val1 = 0;
  val2 = 0;
  val3 = 0;
  val4 = 0;
  val5 = 0;
  val6 = 0;
  val7 = 0;
  val8 = 0;
  encuesta = new Encuesta();

  constructor(public service : ViajesService,public encuestaServ : EncuestaService,public aux : AutheService) {
     

   }
  
   Enviar()
   {    
     console.log(this.viaje);
      this.service.ViajesChoferUs().then(data=>{
      data.forEach(element => {
        if(element.cod_Viaje == this.viaje.cod_Viaje)
        {
          this.encuesta.chofer = element.user;
          this.encuesta.cod_Viaje = this.viaje.cod_Viaje;
          this.encuesta.user = this.viaje.user;
          this.encuesta.val1 = this.val1;
          this.encuesta.val2 = this.val2;
          this.encuesta.val3 = this.val3;
          this.encuesta.val4 = this.val4;
          this.encuesta.val5 = this.val5;
          this.encuesta.val6 = this.val6;
          this.encuesta.val7 = this.val7;
          this.encuesta.val8 = this.val8;
          console.log(this.encuesta.chofer + "encuesta");
          this.encuestaServ.ResponderEncuesta(this.encuesta).then(data2=>{
            if(data2)
            {
               this.info = true;
               this.msg = "Gracias por su opinion";
               this.aux.pausa(5000);
               window.location.reload();
            }
            else{
             this.info = true;
             this.msg = "Error";
             this.aux.pausa(5000);
             window.location.reload();
            }
          });
        }
      });
    })
          
    
     

   }

   getChofer()
   {

   }

  ngOnInit() {
  }

}
