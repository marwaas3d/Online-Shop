import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
  standalone: true
})
export class CutTextPipe implements PipeTransform {

  transform(text:string): string {
    return text.split(" " , 4).join(' ');
  }

}
