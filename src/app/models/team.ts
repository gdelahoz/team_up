import { Coach } from "./coach";
import { Player } from "./player";

export interface Team {
    id?: string;
    name: string;
    imgLogo: string;
    country: string;
    players: Player[];
    coachs: Coach[];
    campus: string;
    birthday: string;

    createdAt: string;
    modifiedAt: string;
}
