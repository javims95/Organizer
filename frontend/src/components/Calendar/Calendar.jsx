import React, { Component } from 'react';
import './Calendar.scss'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DraggableEvents from './modules/DraggableEvents/DraggableEvents';
import CreateEvent from './modules/CreateEvent/CreateEvent';
import Modal from '../Modal/Modal'

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.handleDateClick = this.handleDateClick.bind(this);
        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
    }

    handleDrop = (dropInfo) => {
        const { draggedEl } = dropInfo;

        if (document.getElementById('drop-remove').checked) {
            draggedEl.parentNode.removeChild(draggedEl);
        }
    };

    handleDateClick(e) {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div className='container-calendar'>
                <div className='col-md-3'>
                    <DraggableEvents />
                    <CreateEvent />
                </div>
                <div className='col-md-9' id="calendar">
                    <div className="card">
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
                            initialView="dayGridMonth"
                            editable={true}
                            droppable={true}
                            drop={this.handleDrop}
                            dateClick={this.handleDateClick}
                            ref={this.calendarRef}
                            timeZone='Europe/Madrid'
                            locale='es'
                            firstDay='1'
                        />
                    </div>
                </div>
                <Modal
                    title='Crear nuevo evento'
                    isOpen={this.state.showModal}
                    setIsOpen={this.handleCloseModal}
                >
                    <p>Esto es un contenido de pruebas. Solo queremos ver como se ve el contenido de dentro de la modal.</p>
                </Modal>
            </div>
        );
    }
}

export default CalendarComponent;
