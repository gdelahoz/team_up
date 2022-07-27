import { Coach } from './coach';
import { Team } from './team';
import { Player } from './player';
export interface UserI {
    uid?: string;
    team?: Team;
    teamId?: string;
    player?: Player;
    playerId?: string;
    coach?: Coach;
    coachId?: string;

    name: string;
    lastName: string;
    email: string;
    tel: string;
    birthday: string;
    imgProfile?: string;
    rol: string;
}
