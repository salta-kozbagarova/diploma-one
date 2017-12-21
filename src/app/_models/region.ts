import { Country } from "./index";
import { City } from "./index";

export class Region {
    id: number;
    name: string;
    country: Country;
    cities: City[];
}
