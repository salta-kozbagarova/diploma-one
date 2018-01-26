import { AdministrativeLevel } from "./";


export class AdministrativeDivision {
    id: number;
    name: string;
    parent_id: number;
    administrative_level_id: number;

    constructor(params?: any){
        if(params){
            this.id = params.id;
            this.name = params.name;
        }
    }
}
