import { Coach } from "./coach";
import { Comment } from "./comment";

export interface Announcement {
    id?: string;
    title: string;
    urlVideo: string;
    description: string;
    coach: Coach;
    comments: Comment[];

    createdAt: string;
    modifiedAt: string;
}
