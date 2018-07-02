import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'est'
})
export class EstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let retorno ;
   if(value == 1)
   {
     retorno = "Pendiente de asignar";
   }
   if(value==2)
   {
    retorno = "Viaje ya asignado";
   }

   return retorno;
  }

}
