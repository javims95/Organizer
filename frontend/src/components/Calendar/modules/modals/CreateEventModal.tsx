import React, { useEffect, useState } from 'react';
import './CreateEventModal.scss'
import { CalendarApi } from '@fullcalendar/react';
import { toast } from 'react-toastify';

import Icon from '@components/Icon/Icon';
import Input from '@components/Input/Input';
import { BackgroundColorRounded, BoxContainer, SelectColors } from './styles';
import {
    createEventCalendar,
    deleteEventCalendar,
    updateEventCalendar,
} from '@services/eventCalendarApi';
import { IsMobile } from '@utils/Environment/IsMobile';
import colors from '../../conf/colors'

interface ICardColor {
    backgroundColor: string;
    textColor: string;
}

interface IModalInfosEventCalendaryProps {
    open: boolean;
    handleClose: () => void;
    eventInfos: any;
    isEditCard: boolean;
}

export const ModalInfosEventCalendar = ({
    handleClose,
    open,
    eventInfos,
    isEditCard,
}: IModalInfosEventCalendaryProps) => {
    const [title, setTitle] = useState<string>('');
    const [cardColor, setCardColor] = useState<ICardColor>({
        backgroundColor: '#039be5',
        textColor: '#ffffff',
    });

    // Ordenar
    type ColorsCard = {
        backgroundColor: string;
        textColor: string;
    };

    const ListColorsCard: ColorsCard[] = [
        { backgroundColor: '#007bff', textColor: '#ffffff' },
        { backgroundColor: '#0dcaf0', textColor: '#ffffff' },
        { backgroundColor: '#fd7e14', textColor: '#ffffff' },
        { backgroundColor: '#ffc107', textColor: '#000000' },
        { backgroundColor: '#28a745', textColor: '#ffffff' },
        { backgroundColor: '#20c997', textColor: '#ffffff' },
        { backgroundColor: '#dc3545', textColor: '#ffffff' },
        { backgroundColor: '#d63384', textColor: '#ffffff' },
        { backgroundColor: '#6610f2', textColor: '#ffffff' },
        { backgroundColor: '#6c757d', textColor: '#ffffff' },
    ];

    useEffect(() => {
        if (isEditCard) {
            setTitle(eventInfos?.event?.title);
            setCardColor({
                backgroundColor: eventInfos?.event?.backgroundColor,
                textColor: eventInfos?.event?.textColor,
            });
        } else {
            setTitle('');
            setCardColor({ backgroundColor: '#039be5', textColor: '#ffffff' });
        }
    }, [eventInfos, isEditCard]);

    const handleSelectCardColor = (color: ColorsCard) => {
        setCardColor({
            backgroundColor: color.backgroundColor,
            textColor: color.textColor,
        });
    };

    const handleAddedEvent = async () => {
        try {
            const calendarApi: CalendarApi = eventInfos.view.calendar;

            const eventCalendar = await createEventCalendar({
                eventCalendar: {
                    title: title === '' ? 'Sem título' : title,
                    start: eventInfos.startStr,
                    end: eventInfos.endStr,
                    backgroundColor: cardColor.backgroundColor,
                    textColor: cardColor.textColor,
                },
            });

            calendarApi.addEvent({
                id: eventCalendar._id,
                title: eventCalendar.title,
                start: eventCalendar.start,
                end: eventCalendar.endStr,
                backgroundColor: cardColor.backgroundColor,
                textColor: cardColor.textColor,
            });
        } catch (err) {
            toast.error('Houve um erro ao criar um evento');
        } finally {
            setTitle('');
            handleClose();
        }
    };

    const handleDeleteEvent = async () => {
        try {
            await deleteEventCalendar({ id: eventInfos.event.id });
            eventInfos.event.remove();
        } catch (error) {
            toast.error('Houve um erro ao deletar o evento');
        } finally {
            setTitle('');
            handleClose();
        }
    };

    const handleUpdatedEvent = async () => {
        try {
            const calendarApi: CalendarApi = eventInfos.view.calendar;

            const eventCalendarUpdated = {
                eventCalendar: {
                    _id: eventInfos.event.id,
                    title: title !== '' ? title : 'Sem título',
                    start: eventInfos.event.startStr,
                    end: eventInfos.event.endStr,
                    backgroundColor: cardColor.backgroundColor,
                    textColor: cardColor.textColor,
                },
            };

            const currentEvent = calendarApi.getEventById(eventInfos.event.id);

            if (currentEvent) {
                currentEvent.setProp('title', title !== '' ? title : 'Sem título');
                currentEvent.setProp('backgroundColor', cardColor.backgroundColor);
                currentEvent.setProp('textColor', cardColor.textColor);
            }

            await updateEventCalendar(eventCalendarUpdated);
        } catch (error) {
            toast.error('Houve um erro ao atualizar o evento');
        } finally {
            setTitle('');
            handleClose();
        }
    };

    // Modal
    if (!open) {
        return null;
    }

    return (
        <div
            className="create-event-modal"
            onClick={IsMobile() ? undefined : handleClose}
            onTouchEnd={!IsMobile() ? undefined : handleClose}
        >
            <div
                className="modal-dialog"
                onClick={IsMobile() ? undefined : (e) => e.stopPropagation()}
                onTouchEnd={!IsMobile() ? undefined : (e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Modal title</h1>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={IsMobile() ? undefined : handleClose}
                            onTouchEnd={!IsMobile() ? undefined : handleClose}
                        >
                            <Icon icon='xmark' className='svg-close' />
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* Terminar todos los elementos de la modal, colores, checkbox (allDay) */}
                        <Input placeholder='Inserte un título' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <div className='create-event-colors'>
                            {colors.map((color: string) => (
                                <a key={color} >
                                    <Icon icon={'square'} color={color} className="select-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};