import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { VisualesModule } from './modulos/visuales/visuales.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosService } from './servicios/usuarios.service';
import { RuteoModule } from './modulos/ruteo/ruteo.module';
import { MiHttpService } from './servicios/mi-http.service';
import { HttpModule } from '@angular/http';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MenuBarComponent } from './componentes/menu-bar/menu-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction' 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './clases/token.interceptor';
import { MenuAdminComponent } from './componentes/administrador/menu-admin/menu-admin.component';
import { AltaUsComponent } from './componentes/administrador/alta-us/alta-us.component';
import { AdministracionComponent } from './componentes/administrador/administracion/administracion.component';
import { AltaVehiComponent } from './componentes/administrador/alta-vehi/alta-vehi.component';
import { ClientesComponent } from './componentes/cli/clientes/clientes.component';
import { PedirViajeComponent } from './componentes/cli/pedir-viaje/pedir-viaje.component';
import { MenuClientComponent } from './componentes/cli/menu-client/menu-client.component';
import { CliViajesComponent } from './componentes/cli/cli-viajes/cli-viajes.component';
import { ComodPipe } from './pipes/comod.pipe';
import { EstPipe } from './pipes/est.pipe';
import { ConfirmationService } from 'primeng/api';
import { ModificarViajeComponent } from './componentes/cli/modificar-viaje/modificar-viaje.component';
import { ListadoVehiculosComponent } from './componentes/administrador/listado-vehiculos/listado-vehiculos.component';
import { HistorialViajesComponent } from './componentes/administrador/historial-viajes/historial-viajes.component';
import { MenuChoferComponent } from './componentes/chofer/menu-chofer/menu-chofer.component';
import { ChoferesComponent } from './componentes/chofer/choferes/choferes.component';
import { ViajesChoferComponent } from './componentes/chofer/viajes-chofer/viajes-chofer.component';
import { UsuariosComponent } from './componentes/administrador/usuarios/usuarios.component';
import { UsEstPipe } from './pipes/us-est.pipe';
import { KmPipe } from './pipes/km.pipe';
import { EncuestaComponent } from './componentes/cli/encuesta/encuesta.component';
import { InformesComponent } from './componentes/administrador/informes/informes.component';

  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuPrincipalComponent,
    RegistroComponent,
    InicioComponent,
    MenuBarComponent,
    MenuAdminComponent,
    AltaUsComponent,
    AdministracionComponent,
    AltaVehiComponent,
    ClientesComponent,
    PedirViajeComponent,
    MenuClientComponent,
    CliViajesComponent,
    ComodPipe,
    EstPipe,
    ModificarViajeComponent,
    ListadoVehiculosComponent,
    HistorialViajesComponent,
    MenuChoferComponent,
    ChoferesComponent,
    ViajesChoferComponent,
    UsuariosComponent,
    UsEstPipe,
    KmPipe,
    EncuestaComponent,
    InformesComponent
  ],
  imports: [
    CommonModule, 
    BrowserAnimationsModule,
    BrowserModule, 
    RuteoModule,
    VisualesModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: GetToken,
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGcPKjwDCPtMSuDd7KhNT9EB1lKcUcxQ0',      
    }),
    ReactiveFormsModule,
    AgmDirectionModule 

    
  
  ],
  providers: [UsuariosService, MiHttpService, ConfirmationService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
export function GetToken()
{
    return localStorage.getItem('token');
}
