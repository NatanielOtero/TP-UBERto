import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usEst'
})
export class UsEstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let retorno ;
    if(value == 1)
    {
      retorno = "Activo";
    }
    if(value==2)
    {
     retorno = "Suspendido";
    }
    
 
    return retorno;
  }

}
