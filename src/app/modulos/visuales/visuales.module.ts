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
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RatingModule} from 'primeng/rating';
import {ChartModule} from 'primeng/chart';

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
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    RatingModule,
    ChartModule
    
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
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    RatingModule,
    ChartModule
  ],  
  declarations: []
})
export class VisualesModule { }
