import React, { useState, useRef } from 'react';
import { Draggable } from '@fullcalendar/interaction';

import Icon from '@components/Icon/Icon';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import colors from '../../conf/colors';

const CreateEvent: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState('rgb(0, 123, 255)');
    const [eventTitle, setEventTitle] = useState('');
    const eventInputRef = useRef<HTMLInputElement>(null);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleAddEventClick = () => {
        if (eventInputRef.current && eventTitle && selectedColor) {
            const externalEvents = document.getElementById('external-events');
            const newEvent = document.createElement('div');
            newEvent.className = 'external-event';
            newEvent.innerText = eventTitle;
            newEvent.style.backgroundColor = selectedColor;

            // Agrega el data-event-object al nuevo evento
            const eventObject = {
                title: eventTitle,
                backgroundColor: selectedColor,
            };
            newEvent.dataset.eventObject = JSON.stringify(eventObject);

            // Añade el nuevo evento al contenedor
            externalEvents?.prepend(newEvent);

            // Hace que el nuevo evento sea arrastrable
            new Draggable(newEvent, {
                eventData: (eventEl) => {
                    return JSON.parse(eventEl.dataset.eventObject || '');
                },
            });

            // setEventTitle('');
            // setSelectedColor('');
        }
    };


    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventTitle(event.target.value);
    };

    return (
        <div className="card new-event">
            <div className="card-header">
                <h3 className="card-title">Create Event</h3>
            </div>
            <div className="card-body">
                <div className="btn-group" style={{ marginBottom: '10px', width: '100%' }}>
                    <ul className="fc-color-picker" id="color-chooser">
                        <li>
                            <a className="text-primary" href="#">
                                <i className="fas fa-square"></i>
                            </a>
                        </li>
                        {colors.map((color: string) => (
                            <a key={color} onClick={() => handleColorSelect(color)}>
                                <Icon icon={'square'} color={color} className="icon-event" />
                            </a>
                        ))}
                    </ul>
                </div>
                <div className="input-group">
                    <Input
                        id='new-event'
                        type='alphanumeric'
                        placeholder='Título del evento'
                        value={eventTitle}
                        onChange={handleTitleChange}
                        ref={eventInputRef}
                    />
                    <div className="input-group-append">                        
                        <Button
                            id='add-new-event'
                            className='btn-blue'
                            style={{ backgroundColor: selectedColor, borderColor: selectedColor }}
                            onClick={handleAddEventClick}
                            text='Añadir'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
