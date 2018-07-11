import { Component, OnInit } from '@angular/core';
import { AutheService } from '../../servicios/authe.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



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
  
  helper = new JwtHelperService();

  constructor(public usuarioServ : UsuariosService, public router : Router, public routes : ActivatedRoute ) {
    this.usuario = new Usuario();

   }
   admin()
   {
      this.user = "admin";
      this.pass = "1234";
   }
   chofer()
   {
      this.user = "chofer";
      this.pass = "1234";
   }
   cliente()
   {
     this.user = "cliente";
     this.pass = "1234";
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
          if(data.error == "baneado")
          {
            this.isError = true;
            this.error = "El usuario se encuentra baneado";
            console.log("nada");
          }
          else
          {
            let datos = this.helper.decodeToken(data);
            if(datos.data.estado == 1)
            {
              console.log("ok");
              console.log(datos.data);
              localStorage.setItem("token",data);
               this.router.navigate(['/Principal'])
            }
            else
            {
              console.log("not ok");
              console.log(datos.data);
              this.isError = true;
              this.error = "Error del servidor";
            }
           
           /* ;*/
          }        
         
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
