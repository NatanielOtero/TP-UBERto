import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comod'
})
export class ComodPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let retorno ;
    if(value == 1)
    {
      retorno = "Lujo minimo";
    }
    if(value == 2)
    {
      retorno = "Lujo medio";
    }
    if(value == 3)
    {
      retorno = "Lujo maximo"; 
    }
    return retorno;
  }

}
