import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:any[] , term:string): any[] {
    return products.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()))
  }

}
