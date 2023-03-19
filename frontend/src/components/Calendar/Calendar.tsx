import React, { useState } from 'react';
import './Calendar.scss'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { ModalInfosEventCalendar } from "./modules/modals/CreateEventModal";
import { useDisclosure } from "@hooks/useDiscloure";
import { updateEventCalendar } from "@services/eventCalendarApi";
import { toast } from "react-toastify";
import { getAllEventsCalendar } from '@services/eventCalendarApi';
import DraggableEvents from './modules/DraggableEvents/DraggableEvents';
import CreateEvent from './modules/CreateEvent/CreateEvent';
import { IsMobile } from './../../utils/Environment/IsMobile';

const Calendar = () => {
    const [eventInfos, setEventInfos] = useState();
    const [isEditCard, setIsEditCard] = useState<boolean>(false);

    const weekends = {
        weekendsVisible: true,
        currentEvents: [],
    };

    const modalInfosEvent = useDisclosure(false);

    const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
        setIsEditCard(false);
        setEventInfos(selectInfo);
        console.log(selectInfo);

        modalInfosEvent.handleOpen();
    };

    const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
        setIsEditCard(true);
        setEventInfos(clickInfo);
        modalInfosEvent.handleOpen();
    };

    const handleUpdateEventSelect = async (changeInfo: any) => {
        try {
            const eventCalendarUpdated = {
                eventCalendar: {
                    _id: changeInfo.event.id,
                    title: changeInfo.event.title,
                    start: changeInfo.event.startStr,
                    end: changeInfo.event.endStr,
                    backgroundColor: changeInfo.event.backgroundColor,
                    textColor: changeInfo.event.textColor,
                },
            };

            await updateEventCalendar(eventCalendarUpdated);
        } catch (err) {
            toast.error('Error al actualizar');
        }
    };

    return (
        <div className='container-calendar'>
            {!IsMobile() && (
                <div className='col-md-3'>
                    <DraggableEvents />
                    <CreateEvent />
                </div>
            )}
            <div className={IsMobile() ? 'col-md-12' : 'col-md-9'} id='calendar'>
                <div className='card'>
                    <FullCalendar
                        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        select={handleAddEventSelectAndOpenModal}
                        eventClick={handleEditEventSelectAndOpenModal}
                        eventChange={handleUpdateEventSelect}
                        initialEvents={getAllEventsCalendar}
                        locale="es"
                        weekends={weekends.weekendsVisible}
                        firstDay={1}
                        longPressDelay={1}
                        // eventLongPressDelay={1}
                        // selectLongPressDelay={1}
                        selectable={true}
                        dayMaxEvents={true}
                        allDaySlot={false}
                        editable={true}
                        // height="700px"
                        buttonText={{
                            today: "Hoy",
                            month: "Mes",
                            week: "Semana",
                            day: "Día",
                            list: "Lista",
                        }}
                    />
                </div>
            </div>

            <ModalInfosEventCalendar
                open={modalInfosEvent.isOpen}
                handleClose={modalInfosEvent.handleClose}
                eventInfos={eventInfos}
                isEditCard={isEditCard}
            />
        </div>
    );
};

export default Calendar;