import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import allLocales from '@fullcalendar/core/locales-all'
import './Calendar.css'
import moment from 'moment/moment'
import 'moment/locale/es'
// import useCalendar from '../../store/Calendar'
// import { createEventId } from '../../data'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import axios from 'axios'
import {
  saveCalendarTitle,
  getAllEvents
} from './LogicCalendar'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 230,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const styleEditable = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 230,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const Calendar = () => {
  // url base api
  const url = import.meta.env.VITE_API_BASE_URL

  const [eventsBD, setEventsBD] = useState([])
  const [selectInfo, setSelectInfo] = useState({})
  const [editable, setEditable] = useState('')

  useEffect(() => {
    console.log('entramos a useEffect')
    getAllEvents()
      .then((res) => {
        setEventsBD(res)
      })
  }, [])

  const [calendarApi, setCalendarApi] = useState()
  // const [events, setEvents] = useState({})

  console.log(eventsBD)

  const handleEvents = async (selectInfo) => {
    // events.preventDefault()
    console.log(selectInfo.extendedProps)
    // await Promise.resolve(setEventsBD(events))
  }

  const handleDateSelect = (selectInfo) => {
    // eslint-disable-next-line no-undef
    console.log(selectInfo.view.calendar)
    // eslint-disable-next-line no-const-assign
    setCalendarApi(selectInfo.view.calendar)
    setSelectInfo(selectInfo)
    // setEventsBD(selectInfo)
    handleOpen()
  }

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.id)
    handleOpenEditable()
    setEditable(clickInfo.event)
    setSelectInfo(clickInfo)
  }

  // eliminamos el evento
  const handleEventRemove = async (id) => {
    try {
      const response = await axios.post(url + 'api/deleteEvent', { id }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // eslint-disable-next-line no-undef
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response)
      selectInfo.event.remove()
    } catch (error) {
      console.log(error)
    }
    handleCloseEditable()
  }

  const saveEventCalendar = (events) => {
    events.preventDefault()
    const title = document.getElementById('title').value

    calendarApi.unselect()

    if (title) {
      const addEvent = {
        id: selectInfo.id,
        title,
        start: moment(selectInfo.start).format('YYYY-MM-DD'),
        end: moment(selectInfo.end).format('YYYY-MM-DD'),
        allDay: moment(selectInfo.allDay).format('YYYY-MM-DD')
      }
      saveCalendarTitle(addEvent).then((res) => {
        console.log(res)
        setEventsBD(res)
      })
      calendarApi.addEvent(addEvent)
    }
    handleClose()
  }

  // save modal
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // edit modal
  const [openEditable, setOpenEditable] = React.useState(false)
  const handleOpenEditable = () => setOpenEditable(true)
  const handleCloseEditable = () => setOpenEditable(false)

  return (
    <div className='calendar-container'>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              <strong>Añada un nuevo evento</strong>
            </Typography>
            <form onSubmit={saveEventCalendar}>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <textarea rows={2} type='text' id='title' style={{ width: '100%', padding: '5px' }} placeholder='Añada un evento' />
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <button type='submit' className='btn btn-primary'>Guardar</button>
              </Typography>
            </form>
          </Box>
        </Modal>

        <Modal
          open={openEditable}
          onClose={handleCloseEditable}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={styleEditable}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              <strong>Evento</strong>
            </Typography>
            <form>
              <p>
                {editable.title}
              </p>
              <span>
                Fecha: {moment(editable.start).format('YYYY-MM-DD')}
              </span>

              {/* <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <input type='date' value={moment(editable.start).format('YYYY-MM-DD')} placeholder='editar fecha' />
              </Typography> */}
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <a className='btn btn-danger' style={{ marginRight: '10px' }} onClick={() => { handleEventRemove(editable.id) }}>Eliminar</a>

                {/* <button type='submit' className='btn btn-primary'>Editar</button> */}
              </Typography>
            </form>
          </Box>
        </Modal>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          locales={allLocales}
          locale='es'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'

          }}

          // eslint-disable-next-line react/jsx-props-no-multi-spaces
          allDaySlot={false}
          initialView='dayGridMonth'
          slotDuration='01:00:00'
          selectable
          selectMirror
          dayMaxEvents
          weekends
          nowIndicator
          events={eventsBD}
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  )
}

export default Calendar
