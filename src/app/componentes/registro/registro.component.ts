import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { UsuariosService } from '../../servicios/usuarios.service';

function copiaClave(input: FormControl) {

  if (input.root.get('clave') == null) {
    return null;
  }

  const verificar = input.root.get('clave').value === input.value;
  return verificar ? null : { mismaClave : true };
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario : Usuario;
  error  = false;
  errMsg = "";
  constructor(private builder : FormBuilder,public servicio : UsuariosService,public router : Router, public routes : ActivatedRoute) {
    this.usuario = new Usuario();
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
  copiaClave = new FormControl('', [
    Validators.required,
    copiaClave
  ]);

  registroForm : FormGroup = this.builder.group({
    user : this.user,
    clave : this.clave,
    copiaClave : this.copiaClave
  })

  Registrar()
  {
    let us = this.registroForm.get('user').value;
    let pass = this.registroForm.get('clave').value;   
    this.usuario.user = us;
    this.usuario.pass = pass;
    this.usuario.nivel = 3;
    let respuesta;
  
    respuesta = this.servicio.RegistroUsuario(this.usuario)
    .then( data => {
      if(data)
      {    
        console.log(respuesta);     
        let token = this.servicio.InciarSesion(this.usuario);    
        token.then( data => {      
            console.log(data);        
            if(data.error == "no se encuentra")
            {
                        
              console.log("nada");
            }else{
              console.log("ok");
              localStorage.setItem("token",data);
              this.router.navigate(['/Principal']);
            }
           // 
           
          //  
        }).catch( err => {
          console.error(err);
        });
        
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
