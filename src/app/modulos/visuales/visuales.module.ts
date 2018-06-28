import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CardModule} from 'primeng/card';
//import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenubarModule} from 'primeng/menubar';
import {MatButtonModule} from '@angular/material';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {SelectButtonModule} from 'primeng/selectbutton';


@NgModule({
  imports: [
    CommonModule,
    CardModule,
    //PasswordModule,
    InputTextModule,
    TabMenuModule,
    MenubarModule,
    MatButtonModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule
    
  ],
  exports:[
    CardModule,
    //PasswordModule,
    InputTextModule,
    TabMenuModule,
    MenubarModule,
    MatButtonModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule
  ],
  declarations: []
})
export class VisualesModule { }
