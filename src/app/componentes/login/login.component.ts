import { Component, OnInit } from '@angular/core';
import { AutheService } from '../../servicios/authe.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  pass: string;
  usuario: Usuario;  
  isError = false;
  error : string = ""; 

  constructor(public usuarioServ : UsuariosService, public router : Router, public routes : ActivatedRoute ) {
    this.usuario = new Usuario();

   }
  
   iniciar() {
    this.usuario.pass = this.pass;
    this.usuario.user = this.user;
    console.log(this.usuario);
    let token = this.usuarioServ.InciarSesion(this.usuario);
    
    token.then( data => {      
        console.log(data);        
        if(data.error == "no se encuentra")
        {
          this.isError = true;
          this.error = "El usuario y/o la contraseña son erroneos";
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

  ngOnInit() {
  }

}
