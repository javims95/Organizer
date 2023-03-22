import React, { useEffect, useState } from 'react';
import './ModalInfoEvent.scss'
import { CalendarApi } from '@fullcalendar/react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Icon from '@components/Icon/Icon';
import Input from '@components/Input/Input';
import { createEventCalendar, deleteEventCalendar, updateEventCalendar, } from '@services/eventCalendarApi';
import { IsMobile } from '@utils/Environment/IsMobile';
import Checkbox from '@components/Checkbox/Checkbox';
import RangeTimePicker from '@components/RangeTimePicker/RangeTimePicker';
import Button from '@components/Button/Button';

interface ICardColor {
    backgroundColor: string;
    textColor: string;
}

interface IModalInfosEventCalendaryProps {
    open: boolean;
    handleClose: () => void;
    eventInfos: any;
    isEditCard: boolean;
    isAllDay: boolean;
    setIsAllDay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalInfoEvent: React.FC<IModalInfosEventCalendaryProps> = (props) => {

    const { handleClose, open, eventInfos, isEditCard, isAllDay, setIsAllDay } = props
    const [title, setTitle] = useState<string>('');
    const [cardColor, setCardColor] = useState<ICardColor>({
        backgroundColor: '#039be5',
        textColor: '#ffffff',
    });
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const ListColorsCard: ICardColor[] = [
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

    // startDate y endDate son undefined cuando se hace click en un evento ya creado, 
    // si se hace click en un nuevo evento no es undefined
    useEffect(() => {
        setTitle(isEditCard ? eventInfos?.event?.title : '');
        setCardColor({
            backgroundColor: isEditCard ? eventInfos?.event?.backgroundColor : '#039be5',
            textColor: isEditCard ? eventInfos?.event?.textColor : '#ffffff'
        });
        
        if(isEditCard) {
            console.log(eventInfos);
            
            setStartDate(eventInfos?.event.start);
            setEndDate(eventInfos?.event.end);
        } else {
            setStartDate(eventInfos?.start);
            setEndDate(eventInfos?.end);
        }    
    }, [eventInfos]);

    const handleSelectCardColor = (color: ICardColor) => {
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
                    title: title === '' ? 'Sin título' : title,
                    start: eventInfos.startStr,
                    end: isAllDay ? eventInfos.endStr : null,
                    allDay: isAllDay,
                    backgroundColor: cardColor.backgroundColor,
                    textColor: cardColor.textColor,
                },
            });
            console.log(eventCalendar);
            

            calendarApi.addEvent({
                id: eventCalendar._id,
                title: eventCalendar.title,
                start: eventCalendar.start,
                end: eventCalendar.end,
                allDay: eventCalendar.allDay,
                backgroundColor: cardColor.backgroundColor,
                textColor: cardColor.textColor,
            });

        } catch (err) {
            toast.error('Error al crear el evento');
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
            toast.error('Error al eliminar el evento');
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

    // Checkbox
    const handleCheckboxChange = (event) => {
        setIsAllDay(event);
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
                        <div className='form'>
                            <Input placeholder='Inserte un título' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form form__datepicker form-control">
                            {isAllDay ? (
                                // console.log('RENDER',startDate),                                
                                <>
                                    <DatePicker
                                        selected={startDate}
                                        startDate={startDate}
                                        endDate={endDate}
                                        className='not-border'
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        dateFormat='dd/MM/yyyy'
                                    />
                                    <span className='separator'>—</span>
                                    <DatePicker
                                        selected={endDate}
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        className='not-border'
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        dateFormat='dd/MM/yyyy'
                                    />
                                </>
                            ) : (
                                <>
                                    <DatePicker
                                        className='not-border'
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat='dd/MM/yyyy'
                                    />
                                    <RangeTimePicker />
                                </>
                            )}
                        </div>
                        <Checkbox id='allDay' text='Todo el día' checked={isAllDay} onChange={handleCheckboxChange} />
                        <div className='form'>
                            <span className='label'>Seleccione el color del evento</span>
                            <div className='create-event-colors'>
                                {ListColorsCard.map((color: ICardColor, index) => (
                                    <a key={index} onClick={() => handleSelectCardColor(color)} >
                                        <Icon
                                            icon={'square'}
                                            color={color.backgroundColor}
                                            className="select-colors"
                                            style={{
                                                stroke: cardColor?.backgroundColor === color.backgroundColor ? '#000000' : '',
                                            }}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {isEditCard ? (
                            <Button
                                text='Eliminar evento'
                                className='btn-red'
                                onClick={handleDeleteEvent}
                            />
                        ) : (
                            <Button
                                text='Cerrar'
                                className='btn-grey'
                                onClick={handleClose}
                            />
                        )}
                        <Button
                            text={isEditCard ? 'Actualizar evento' : 'Añadir evento'}
                            className='btn-blue'
                            onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalInfoEvent;