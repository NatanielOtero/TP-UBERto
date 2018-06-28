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
    AltaVehiComponent
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
      config:{
        tokenGetter : () => {
          let token;
          token  = localStorage.getItem('token');
          console.log(token);
          return token;
        },
      whitelistedDomains: ['localhost' , 'localhost:8080' , 'localhost:4200']  
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGcPKjwDCPtMSuDd7KhNT9EB1lKcUcxQ0',
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    AgmDirectionModule 

    
  
  ],
  providers: [UsuariosService, MiHttpService,
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
