import api from './api';
import * as IEventCalendarApi from '@interfaces/IEventCalendarApi';
import {
    CREATE_EVENT_CALENDAR,
    DELETE_EVENT_CALENDAR,
    GET_ALL_EVENTS_CALENDAR,
    UPDATE_EVENT_CALENDAR,
} from './eventCalendarRoutes';

export const createEventCalendar = async (data: IEventCalendarApi.ICreateEventCalendar) => {
    try {
        const response = await api.post(CREATE_EVENT_CALENDAR, data);
        return response.data;
    } catch (err) {
        return err;
    }
};

export const getAllEventsCalendar = async () => {
    try {
        const response = await api.get(GET_ALL_EVENTS_CALENDAR);
        return response.data;
    } catch (err) {
        return err;
    }
};

export const updateEventCalendar = async (data: IEventCalendarApi.IUpdateEventCalendar) => {
    try {
        const response = await api.put(UPDATE_EVENT_CALENDAR, data);
        return response.data;
    } catch (err) {
        return err;
    }
};

export const deleteEventCalendar = async ({ id }: IEventCalendarApi.IDeleteEventCalendar) => {
    try {
        const response = await api.delete(DELETE_EVENT_CALENDAR(id));
        return response.data;
    } catch (err) {
        return err;
    }
};