import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import './Calendar.css'
import useCalendar from '../../store/Calendar'
import { createEventId } from '../../data'

const Calendar = () => {
  const { currentEvents, setCurrentEvents } = useCalendar()

  const handleEvents = async (events) => {
    await Promise.resolve(setCurrentEvents(events))
  }

  const handleDateSelect = (selectInfo) => {
    // eslint-disable-next-line no-undef
    const title = prompt('Ingrese un nuevo evento')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    if (
      // eslint-disable-next-line no-undef
      confirm('Seguro que desea eliminar el evento ' + clickInfo.event.title + '?')

    ) {
      clickInfo.event.remove()
    }
  }

  return (
    <div className='calendar-container'>

      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{

            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'

          }}

          // eslint-disable-next-line react/jsx-props-no-multi-spaces
          allDaySlot={false}
          initialView='timeGridWeek'
          slotDuration='01:00:00'
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends
          nowIndicator
          initialEvents={currentEvents}
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  )
}

export default Calendar
