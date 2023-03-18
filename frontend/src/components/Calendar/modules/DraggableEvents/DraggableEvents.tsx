import React, { useEffect } from 'react';
import './DraggableEvents.scss'
import { Draggable } from '@fullcalendar/interaction';
import Checkbox from '@components/Checkbox/Checkbox';

const DraggableEvents = () => {
    useEffect(() => {
        // Reemplazar por los datos de la BBDD
        const externalEvents = document.querySelectorAll('.external-event');

        for (let index = 0; index < externalEvents.length; index++) {
            const externalEvent = externalEvents[index] as HTMLElement;

            const eventObject = {
                title: externalEvent.innerText.trim(),
                backgroundColor: '#000000',
            };

            externalEvent.dataset.eventObject = JSON.stringify(eventObject);

            new Draggable(externalEvent, {
                eventData: (eventEl) => {
                    return JSON.parse(eventEl.dataset.eventObject);
                },
            });
        }
    }, []);

    return (
        <div className='card'>
            <div className='card-header'>
                <h4 className='card-title'>Eventos arrastrables</h4>
            </div>
            <div id="external-events" className='card-body'>
                <div className='external-event bg-red'>Evento de prueba</div>
                <Checkbox id='drop-remove' text='Remove after drop' />
            </div>
        </div>
    );
};

export default DraggableEvents;
