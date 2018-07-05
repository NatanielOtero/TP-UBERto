import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {SelectItem} from 'primeng/api';
import { Vehiculo } from '../../../clases/vehiculo';
import { VehiculosService } from '../../../servicios/vehiculos.service';
import { UsuariosService } from '../../../servicios/usuarios.service';



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
  choferes : SelectItem[];
  constructor(private builder : FormBuilder,public servicio : VehiculosService,public usuarios : UsuariosService,public router : Router, public routes : ActivatedRoute) {
    this.vehiculo = new Vehiculo();
  
   }

  ngOnInit() {

    this.choferes = new Array<SelectItem>();
    this.usuarios.traerChoferes().then(data=>
    {
     for (let i = 0; i < data.length; i++) {
       if(data[i].estado == 1)
       {
         this.choferes.push({label: data[i].user,value:data[i].user});
       }
       
     }
    })
    console.log(this.choferes);

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
  chofer = new FormControl('',[
    Validators.required,   

  ]);

  vehiculoForm : FormGroup = this.builder.group({
    patente : this.patente,
    marca : this.marca,
    modelo : this.modelo,
    chofer: this.chofer
 
  })

  Registrar()
  {
    this.vehiculo.patente = this.vehiculoForm.get('patente').value;
    this.vehiculo.marca = this.vehiculoForm.get('marca').value;
    this.vehiculo.modelo = this.vehiculoForm.get('modelo').value;  
    this.vehiculo.chofer = this.vehiculoForm.get('chofer').value;  
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
