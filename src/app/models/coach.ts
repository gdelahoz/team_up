import { Team } from './team';
import { UserI } from './user';
export interface Coach {
    id?: string;
    userId?: string;
    teamId: string;

    typeCoach?: string;
}
