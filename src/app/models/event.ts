import { Timestamp } from "firebase/firestore";

export interface Event {
    id?: string;
    teamId?: string;
    type: string;
    date: string;
    imgPlace: string;
    place: string;
    info: string;
    startTime: string;
    endTime: string;
    numAttendance?: string;
    numAbsence?: string;

    createdAt: Timestamp;
    updatedAt: string;
}
