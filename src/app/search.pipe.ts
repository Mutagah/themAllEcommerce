import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchText: any): any {
    if(!searchText){
      return products;
    }
    return products.filter((product:any) => {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    })
  }

}
