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
import { AuthChofService } from '../../servicios/auth-chof.service';
import { MenuChoferComponent } from '../../componentes/chofer/menu-chofer/menu-chofer.component';
import { ChoferesComponent } from '../../componentes/chofer/choferes/choferes.component';
import { ViajesChoferComponent } from '../../componentes/chofer/viajes-chofer/viajes-chofer.component';
import { UsuariosComponent } from '../../componentes/administrador/usuarios/usuarios.component';
import { InformesComponent } from '../../componentes/administrador/informes/informes.component';




const MiRuteo = [
  {path: '' , component: InicioComponent},
  {path: 'Login' , component: LoginComponent},  
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Principal' ,component: MenuPrincipalComponent, canActivate: [AuthWardService]},
  {path: 'AdminPrin' ,component: MenuAdminComponent, canActivate: [AuthAdminService],
    children:[
     {path:'',component: AdministracionComponent , canActivate: [AuthAdminService]},
     {path:'ListViaje',component:ListadoVehiculosComponent,canActivate:[AuthAdminService]},
     {path:'HistViaje',component:HistorialViajesComponent,canActivate:[AuthAdminService]},
     {path:'Usuarios',component:UsuariosComponent,canActivate:[AuthAdminService]},
     {path:'Informes',component:InformesComponent,canActivate:[AuthAdminService]}
  
  ]},
  {path: 'CliPrin',component: MenuClientComponent,canActivate: [AuthCliService],
    children:[
      {path:'',component:ClientesComponent,canActivate:[AuthCliService]},
      {path:'Viaje',component:PedirViajeComponent,canActivate:[AuthCliService]},
      {path:'CliViaje',component:CliViajesComponent,canActivate:[AuthCliService]},
      {path:'ModViaje',component:ModificarViajeComponent,canActivate:[AuthCliService]}
  ]},
  {path: 'ChofPrin',component: MenuChoferComponent,canActivate: [AuthChofService],
    children:[
      {path:'',component:ChoferesComponent,canActivate:[AuthChofService]},
      {path:'ChofViaje',component:ViajesChoferComponent,canActivate:[AuthChofService]},
     
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
    AuthCliService,
    AuthChofService
  ],
  declarations: []
})
export class RuteoModule {

  
 }
