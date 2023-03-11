import React, { useState, useRef } from 'react';
import './Calendar.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DraggableEvents from './modules/DraggableEvents/DraggableEvents';
import CreateEvent from './modules/CreateEvent/CreateEvent';
import CreateEventModal from './modules/modals/CreateEventModal';

const CalendarComponent: React.FC = () => {
    const calendarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const handleDrop = (dropInfo: any) => {
        const { draggedEl } = dropInfo;

        if ((document.getElementById('drop-remove') as HTMLInputElement).checked) {
            draggedEl.parentNode.removeChild(draggedEl);
        }
    };

    const handleDateClick = (e: any) => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='container-calendar'>
            <div className='col-md-3'>
                <DraggableEvents />
                <CreateEvent />
            </div>
            <div className='col-md-9' id='calendar'>
                <div className='card'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        buttonText={{
                            today: 'hoy',
                            day: 'día',
                            week: 'semana',
                            month: 'mes',
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        droppable={true}
                        drop={handleDrop}
                        dateClick={handleDateClick}
                        ref={calendarRef}
                        timeZone='Europe/Madrid'
                        locale='es'
                        firstDay={1}
                    />
                </div>
            </div>
            <CreateEventModal 
                title='Crear nuevo evento'
                isOpen={showModal}
                setIsOpen={handleCloseModal}
            />
        </div>
    );
};

export default CalendarComponent;
