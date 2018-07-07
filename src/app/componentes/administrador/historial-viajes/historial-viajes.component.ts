import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../servicios/viajes.service';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.css']
})
export class HistorialViajesComponent implements OnInit {
  viajes:any[];
  cols: any[];
  constructor(public service : ViajesService) { }
  exportarPDF()
  {
    var doc = new jsPDF();
    
    doc.fromHTML((<HTMLInputElement>document.getElementById('dt')),1,1)  
  
    doc.save('Viajes.pdf');
  }
  ngOnInit() {
    this.viajes = new Array<any>();  
    this.cols = [
      { field: 'cod_Viaje', header: 'Numero viaje' },
      { field: 'fecha', header: 'Fecha Pedido' },
      { field: 'fechaFin', header: 'Fecha completado' },
      { field: 'user', header: 'Cliente' }, 
      { field: 'costo', header: 'Costo' }, 
      { field: 'pago', header: 'Medio de pago' },     
    ];    
  
    let respuesta = this.service.ViajesAdmin().then(
      data => {
        data.forEach(element => {
         
            this.viajes.push(element);
               
        });
      }
    );
  }
   onRowSelect(event) {


  }

}
