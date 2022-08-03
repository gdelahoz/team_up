import { Announcement } from './announcement';
import { Coach } from "./coach";
import { Player } from "./player";

export interface Team {
    id?: string;
    
    announcements?: Announcement;

    name: string;
    imgLogo?: string;
    imgBanner?: string;
    description?: string;
    country: string;
    campus: string;
    birthday: string;
}
