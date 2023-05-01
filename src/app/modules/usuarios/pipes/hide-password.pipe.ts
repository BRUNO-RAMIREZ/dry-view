import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassword'
})
export class HidePasswordPipe implements PipeTransform {

  transform(value: string): string {
    let hidePassword: string = '';
    for (const caracter of value) {
      hidePassword += '*';
    }
    return hidePassword;
  }

}
