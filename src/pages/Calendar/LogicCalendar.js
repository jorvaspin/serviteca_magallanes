import axios from 'axios'

// url base api
const url = import.meta.env.VITE_API_BASE_URL

// traemos todos los eventos de la base de datos
export const getAllEvents = async () => {
  try {
    const response = await axios.get(url + 'api/getAllEvents', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // eslint-disable-next-line no-undef
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const saveCalendarTitle = async (event) => {
  try {
    const response = await axios.post(url + 'api/saveEvent', event, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // eslint-disable-next-line no-undef
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
