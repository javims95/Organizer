import React, { Component } from 'react';
import './Calendar.scss'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DraggableEvents from './modules/DraggableEvents/DraggableEvents';
import CreateEvent from './modules/CreateEvent/CreateEvent';

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
    }

    componentDidMount() {
    }

    handleDrop = (dropInfo) => {
        const { draggedEl } = dropInfo;

        if (document.getElementById('drop-remove').checked) {
            draggedEl.parentNode.removeChild(draggedEl);
        }
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
                            initialView="dayGridMonth"
                            editable={true}
                            droppable={true}
                            drop={this.handleDrop}
                            ref={this.calendarRef}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarComponent;
