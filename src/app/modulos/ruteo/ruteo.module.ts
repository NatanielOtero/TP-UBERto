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
import { ClientesComponent } from '../../componentes/cli/clientes/clientes.component';
import { AuthCliService } from '../../servicios/auth-cli.service';
import { MenuClientComponent } from '../../componentes/cli/menu-client/menu-client.component';
import { PedirViajeComponent } from '../../componentes/cli/pedir-viaje/pedir-viaje.component';
import { CliViajesComponent } from '../../componentes/cli/cli-viajes/cli-viajes.component';
import { ModificarViajeComponent } from '../../componentes/cli/modificar-viaje/modificar-viaje.component';
import { ListadoVehiculosComponent } from '../../componentes/administrador/listado-vehiculos/listado-vehiculos.component';
import { HistorialViajesComponent } from '../../componentes/administrador/historial-viajes/historial-viajes.component';




const MiRuteo = [
  {path: '' , component: InicioComponent},
  {path: 'Login' , component: LoginComponent},  
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Principal' ,component: MenuPrincipalComponent, canActivate: [AuthWardService]},
  {path: 'AdminPrin' ,component: MenuAdminComponent, canActivate: [AuthAdminService],
    children:[
     {path:'',component: AdministracionComponent , canActivate: [AuthAdminService]},
     {path:'ListViaje',component:ListadoVehiculosComponent,canActivate:[AuthAdminService]},
     {path:'HistViaje',component:HistorialViajesComponent,canActivate:[AuthAdminService]}
  
  ]},
  {path: 'CliPrin',component: MenuClientComponent,canActivate: [AuthCliService],
    children:[
      {path:'',component:ClientesComponent,canActivate:[AuthCliService]},
      {path:'Viaje',component:PedirViajeComponent,canActivate:[AuthCliService]},
      {path:'CliViaje',component:CliViajesComponent,canActivate:[AuthCliService]},
      {path:'ModViaje',component:ModificarViajeComponent,canActivate:[AuthCliService]}
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
    AuthWardService,
    AuthAdminService,
    AuthCliService
  ],
  declarations: []
})
export class RuteoModule {

  
 }
