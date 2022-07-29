import { Coach } from "./coach";
import { Comment } from "./comment";
import { Timestamp } from 'firebase/firestore';

export interface Announcement {
    id?: string;
    teamId?: string;
    coachId?: string;
    
    title: string;
    description: string;
    autor: string;
    //comments?: Comment[];

    createdAt?: Timestamp;
}
