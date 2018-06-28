import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from '../../componentes/inicio/inicio.component';
import { LoginComponent } from '../../componentes/login/login.component';
import { RegistroComponent } from '../../componentes/registro/registro.component';
import { MenuPrincipalComponent } from '../../componentes/menu-principal/menu-principal.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthWardService } from '../../servicios/auth-ward.service';
import { MenuAdminComponent } from '../../componentes/administrador/menu-admin/menu-admin.component';
import { AuthAdminService } from '../../servicios/auth-admin.service';
import { AltaUsComponent } from '../../componentes/administrador/alta-us/alta-us.component';
import { AdministracionComponent } from '../../componentes/administrador/administracion/administracion.component';




const MiRuteo = [
  {path: '' , component: InicioComponent},
  {path: 'Login' , component: LoginComponent},  
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Principal' ,component: MenuPrincipalComponent, canActivate: [AuthWardService]},
  {path: 'AdminPrin' ,component: MenuAdminComponent, canActivate: [AuthAdminService],
    children:[
     {path:'',component: AdministracionComponent , canActivate: [AuthAdminService]},
     {path:'AltaUs',component: AltaUsComponent , canActivate: [AuthAdminService]}
  
  ]},



];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(MiRuteo),
   
      
  ],
  exports:[
    RouterModule,
    
  ],
  providers:[
    AuthWardService
  ],
  declarations: []
})
export class RuteoModule {

  
 }
