import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {SelectItem} from 'primeng/api';
import { Vehiculo } from '../../../clases/vehiculo';
import { VehiculosService } from '../../../servicios/vehiculos.service';



@Component({
  selector: 'app-alta-vehi',
  templateUrl: './alta-vehi.component.html',
  styleUrls: ['./alta-vehi.component.css']
})
export class AltaVehiComponent implements OnInit {

  types: SelectItem[];
  vehiculo : Vehiculo;
  error  = false;
  acierto  = false;
  errMsg = ""; 
  msg = ""; 
  constructor(private builder : FormBuilder,public servicio : VehiculosService,public router : Router, public routes : ActivatedRoute) {
    this.vehiculo = new Vehiculo();
   
   }

  ngOnInit() {
    
  }
  
  patente = new FormControl('',[
    Validators.required,    
    Validators.maxLength(6),
    Validators.minLength(6),
        
  ]);
  marca = new FormControl('',[
    Validators.required,
   

  ]);
  modelo = new FormControl('',[
    Validators.required,   

  ]);

  vehiculoForm : FormGroup = this.builder.group({
    patente : this.patente,
    marca : this.marca,
    modelo : this.modelo
 
  })

  Registrar()
  {
    this.vehiculo.patente = this.vehiculoForm.get('patente').value;
    this.vehiculo.marca = this.vehiculoForm.get('marca').value;
    this.vehiculo.modelo = this.vehiculoForm.get('modelo').value;
    let respuesta;
    respuesta = this.servicio.AltaVehiculo(this.vehiculo)
    .then( data => {
      if(data)
      {    
        console.log(respuesta);     
                  // 
           
          //  
        this.acierto = true;
        this.msg = "Vehiculo Agregado";
        
      }
      else
      {
        console.log(respuesta);
        this.error = true;
        this.errMsg = "Vehiculo ya agregado";
      } 
    })
    .catch( err => { console.error(err); this.errMsg = "Error de conexion"});
   
    


  }

}
