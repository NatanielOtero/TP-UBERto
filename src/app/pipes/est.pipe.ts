import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'est'
})
export class EstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let retorno ;
   if(value == 1)
   {
     retorno = "Pendiente";
   }
   if(value==2)
   {
    retorno = "En Curso";
   }
   if(value==3)
   {
    retorno = "Finalizado";
   }

   return retorno;
  }

}
