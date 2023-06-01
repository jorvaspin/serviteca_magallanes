/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Login.css'
import email from '../../../public/email.jpeg'
import pass from '../../../public/pass.png'
import { toast } from 'react-toastify'
import Loading from 'react-fullscreen-loading'

function Login () {
  // inicializamos con el getOrderId
  useEffect(() => {
    validateSession()
  }, [])
  // importamos navigate para redireccionar
  const navigate = useNavigate()
  // importamos la url base de la api
  const url = import.meta.env.VITE_API_BASE_URL

  // estado para el loading
  const [loading, setLoading] = useState(false)

  // funcion para validar la sesion
  const validateSession = async () => {
    localStorage.getItem('token') ? navigate('/dashboard') : console.log('no hay token')
  }

  // funcion para crear la orden de trabajo desde el formulario
  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true)
    try {
      const response = await axios.post(url + 'api/login', { email: data.email, password: data.password }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      toast.success('Sesión iniciada correctamente.', {
        position: toast.POSITION.TOP_RIGHT
      })
      setLoading(false)
      // una vez iniciado limpiamos el registro del formulario
      register('email', '')
      register('password', '')

      localStorage.setItem('token', response.data.data.token)
      navigate('/dashboard')
    } catch (error) {
      setLoading(false)
      localStorage.clear()
      navigate('/login')
    }
  }

  // inicializamos el useForm
  const {
    register,
    handleSubmit
  } = useForm({})

  return (
    <div className='main-login'>
      {
        loading ? <Loading loading background='#0000008c' loaderColor='#fff' /> : null
      }
      <div className='sub-main-login'>
        <div>
          <div className='imgs-login mb-4'>
            <div className='container-image-login'>
              <img src='./logo.png' alt='profile' className='profile-login' />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-form'>
              <img src={email} alt='email' className='email-login' />
              <input type='text' {...register('email')} placeholder='Ingrese su email' className='name-login' />
            </div>
            <div className='second-input-login input-form'>
              <img src={pass} alt='pass' className='email-login' />
              <input type='password' {...register('password')} placeholder='Ingrese su password' className='name-login' />
            </div>
            <div className='login-button-login mt-5'>
              <button className='btn btn-primary w-50' type='submit'>Iniciar Sesión</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
