import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'km'
})
export class KmPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dist = value;
    dist = (dist / 1000);
    return dist + " KM";
  }

}
