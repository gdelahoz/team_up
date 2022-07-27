import { Coach } from "./coach";
import { Player } from "./player";

export interface Team {
    id?: string;
    
    players?: Player[];
    coaches?: Coach[];

    name: string;
    imgLogo?: string;
    description?: string;
    country: string;
    campus: string;
    birthday: string;
}
