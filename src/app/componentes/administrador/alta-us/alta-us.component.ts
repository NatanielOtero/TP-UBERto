import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario, Chofer } from '../../../clases/usuario';
import { UsuariosService } from '../../../servicios/usuarios.service';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-alta-us',
  templateUrl: './alta-us.component.html',
  styleUrls: ['./alta-us.component.css']
})
export class AltaUsComponent implements OnInit {

  types: SelectItem[];
  typesComo: SelectItem[];
  usuario : Usuario;
  error  = false;
  acierto  = false;
  errMsg = ""; 
  msg = ""; 
  isChofer = true;
  comodidad : number;
  constructor(private builder : FormBuilder,public servicio : UsuariosService,public router : Router, public routes : ActivatedRoute) {
    this.usuario = new Usuario();
    this.types = [
      {label: 'Administrador', value: '1'},
      {label: 'Chofer', value: '2'}     
    ];
    this.typesComo = [
      {label: 'Lujo bajo', value: '1'},
      {label: 'Lujo medio', value: '2'},  
      {label: 'Lujo alto', value: '3'}  
    ];
   }

  ngOnInit() {
  }

  user = new FormControl('',[
    Validators.required    
  ]);
  clave = new FormControl('',[
    Validators.required,
    Validators.minLength(6),

  ]);
  nivel = new FormControl('',[
    Validators.required,   

  ]);
  

  registroForm : FormGroup = this.builder.group({
    user : this.user,
    clave : this.clave,
    nivel : this.nivel,
    
 
  })

  verificarChofer()
  {
    let nivel = this.registroForm.get('nivel').value;
    if(nivel == 2)
    {
      this.isChofer = false;
    }
    else{
      this.isChofer = true;
    }

  }

  Registrar()
  {
    let us = this.registroForm.get('user').value;
    let pass = this.registroForm.get('clave').value;   
    this.usuario.user = us;
    this.usuario.pass = pass;
    this.usuario.nivel = this.registroForm.get('nivel').value;
    let respuesta;
  
    respuesta = this.servicio.RegistroUsuario(this.usuario)
    .then( data => {
      if(data)
      {    
        console.log(respuesta);     
                  // 
           
          //  
          if(this.isChofer == false)
          {
            let chofer = new Chofer();
            chofer.user = this.usuario.user;
            chofer.comodidad = this.comodidad;
           this.servicio.AltaChofer(chofer).then(
             
             data => {console.log(data)}
              
             
           );
          }
       
        
        this.acierto = true;
        this.msg = "Usuario Agregado";

          
      }
      else
      {
        console.log(respuesta);
        this.error = true;
        this.errMsg = "Usuario en uso";
      } 
    })
    .catch( err => { console.error(err); this.errMsg = "Error de conexion"});
   
    


  }

}
