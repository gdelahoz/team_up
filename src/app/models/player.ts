import { Team } from './team';
import { UserI } from './user';
export interface Player {
    id?: string;
    userId?: string;
    teamId?: string;

    weight: string;
    height: string;
    position: string;
    secondPosition?: string;
    dorsal?: string;
    attendance?: string | number;
}
