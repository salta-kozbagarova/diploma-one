import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sort'})
export class SortPipe implements PipeTransform {
    private asc: boolean;
    constructor(){
        this.asc = false;
        console.log('construct');
    }

    transform(objects: any[], arg: string): any {
        if(objects){
            if(arg == 'date'){
                objects = objects.sort((a, b) => {return (a.endDate > b.endDate) ? 1 : (a.endDate < b.endDate ? -1 : 0)});
                this.asc = !this.asc;
                return this.asc ? objects : objects.reverse();
            } else if(arg == 'price'){
                objects.sort((a, b) => {return (a.currentPrice > b.currentPrice) ? 1 : 0});
                this.asc = !this.asc;
                return this.asc ? objects : objects.reverse();
            }
        }
        return objects;
    }
}