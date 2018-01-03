import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sort'})
export class SortPipe implements PipeTransform {
    private asc: boolean;
    constructor(){
        console.log('construct');
    }

    transform(objects: any[], param: string, asc: boolean): any {
        if(objects){
            if(param == 'date'){
                objects = objects.sort((a, b) => {return (a.endDate > b.endDate) ? 1 : (a.endDate < b.endDate ? -1 : 0)});
                this.asc = asc;
                return this.asc ? objects : objects.reverse();
            } else if(param == 'price'){
                objects.sort((a, b) => {return (a.currentPrice > b.currentPrice) ? 1 : 0});
                this.asc = asc;
                return this.asc ? objects : objects.reverse();
            }
        }
        return objects;
    }
}