import React from 'react'
import { formatDate, Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './conf/event'
import Draggable from 'react-draggable';

export default class DemoApp extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: []
    }

    constructor() {
        super();
        this.state = {
            events: [
                { id: 1, title: 'Evento 1' },
                { id: 2, title: 'Evento 2' },
                { id: 3, title: 'Evento 3' }
            ]
        };
        this.handleStop = this.handleStop.bind(this);
        this.calendarApi = null;
        this.draggableRef = React.createRef();
    }

    handleStop(event, data) {
        if (this.calendarApi) {
            console.log('Se soltó un evento');
            const calendarDate = this.calendarApi.getDate(); // obtener la fecha actual del calendario
            const newEvent = {
                id: createEventId(),
                title: event.target.innerText, // el título es el texto del elemento arrastrable
                start: calendarDate,
                allDay: true
            };
            this.calendarApi.addEvent(newEvent); // añadir el evento al calendario
        }
    }

    render() {
        const { events } = this.state;
        return (
            <div className='calendar'>
                {/* {this.renderSidebar()} */}
                <div id="external-events">
                    {events.map(event => (
                        <Draggable
                            key={event.id}
                            onStop={this.handleStop}
                        >
                            <div className="fc-event">
                                {event.title}
                            </div>
                        </Draggable>
                    ))}
                </div>
                <div className='calendar-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        ref={(ref) => { this.calendarApi = ref && ref.getApi(); }}
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                    />
                </div>
            </div>
        )
    }

    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}