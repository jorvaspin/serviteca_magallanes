import { useState, useEffect } from 'react'
import axios from 'axios'

export const EventsData = () => {
  const [events, setEvents] = useState([])
  const url = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    getAllEvents()
  }, [])

  const getAllEvents = async () => {
    try {
      const response = await axios.get(url + 'api/getAllEvents', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // eslint-disable-next-line no-undef
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response)
      setEvents(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return events
}
