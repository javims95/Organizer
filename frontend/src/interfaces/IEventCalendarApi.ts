export interface ICreateEventCalendar {
    eventCalendar: {
        title: string;
        end: string | null;
        start: string;
        allDay: boolean;
        backgroundColor: string;
        textColor: string;
    };
}

export interface IUpdateEventCalendar {
    eventCalendar: {
        _id: string;
        title: string;
        end: string;
        start: string;
        backgroundColor: string;
        textColor: string;
    };
}

export interface IDeleteEventCalendar {
    id: string;
}