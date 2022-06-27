import { Coach } from "./coach";
import { Player } from "./player";

export interface Comment {
    id?: string;
    player: Player;
    coach: Coach;
    description: string;

    createdAt: string;
    modifiedAt: string;
}
