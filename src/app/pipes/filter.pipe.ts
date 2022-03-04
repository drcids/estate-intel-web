import { Pipe, PipeTransform } from '@angular/core'; 
import { Item, Filter } from '../interface/items';

@Pipe({  
    name: 'filterRegion',  
    pure: false  
})  
  
export class FilterRegionPipe implements PipeTransform {  
    transform(items: Item[], filter: Filter): any {  
        if (!items || !filter || (filter.color.length < 1 && filter.shape.length < 1)) {  
            return items;  
        }  
        return items.filter(item => filter.color.includes(item.color) && filter.shape.includes(item.shape) );  
    }  
}  