import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../../servicios/encuesta.service';
import { SelectItem } from 'primeng/api';
import { ViajesService } from '../../../servicios/viajes.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  modo: SelectItem[];
  op : string; 
  data: any;
  constructor(public encuestas : EncuestaService, public viajes : ViajesService) { 
    this.modo = [
      {label:'Comodidad de los viajes', value:"A"},
      {label:'Viajes Cancelados', value:"C"}, 
      {label:'Niveles de satisfaccion', value:"S"},      
    ];    
    
    
  }
  update($event)
  {
    if(this.op == "C")
    {
      this.viajes.ViajesAdmin().then(
        data=>{
          let c = 0;
          let t = 0;
          data.forEach(element => {
            if(element.estado == 5)
            {
              c = c + 1;
            }
            else
            {
              if(element.estado == 4)
              {
                t = t+1;
              }
            }
          });
          this.data = {
            labels: ['Terminados','Cancelados'],
            datasets: [
                {
                    data: [t, c],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                        

                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"                        
                    ]
                }]    
            };
  
        }
      )
    }
    if(this.op == "A")
    {
      this.viajes.ViajesAdmin().then(
        data=>{
          let c = 0;
          let t = 0;
          let a = 0;
          data.forEach(element => {
            if(element.comodidad == 1)
            {
              c = c + 1;
            }
            else
            {
              if(element.comodidad == 2)
              {
                t = t+1;
              }
              else
              {
                if(element.comodidad == 3)
                {
                  a = a+1;
                }
              }
            }
          });
          this.data = {
            labels: ['Poco Lujo','Lujo Medio','Lujo alto'],
            datasets: [
                {
                    data: [t, c, a],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };
          }
      )
    }
    if(this.op == "S")
    {
      this.encuestas.TraerEncuestas().then(
        data=>{
          let a = 0;
          let b = 0;
          let c = 0;
          let d = 0;
          let e = 0;
          let f = 0;
       
          data.forEach(element => {
            if(element.val7 == 0)
            {
              a = a + 1;
            }
            if(element.val7 == 1)
            {
                b = b + 1;
            }
            if(element.val7 == 2)
            {
                c = c + 1;
            }
            if(element.val7 == 3)
            {
                d = d + 1;
            }
            if(element.val7 == 4)
            {
                e = e + 1;
            }
            if(element.val7 == 5)
            {
                f = f + 1;
            }
           
          });
          this.data = {
            labels: ['Nula','Muy baja','Baja','Media','Alta','Muy alta'],
            datasets: [
                {
                    data: [a, b ,c , d , e , f],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#1CC7BE",
                        "#520ED1",
                        "#13B94B"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#1CC7BE",
                        "#520ED1",
                        "#13B94B"
                    ]
                }]    
            };
  
        }
      )
    }
  }
  ngOnInit() {
  }

}
