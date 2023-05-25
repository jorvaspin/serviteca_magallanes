import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { get, useFieldArray, useForm, useWatch } from "react-hook-form";
import './Login.css';
import email from "../../../public/email.jpeg";
import pass from "../../../public/pass.png";

function Login() {

    // inicializamos con el getOrderId
    useEffect(() => {
        validateSession()
    }, [])
  // importamos navigate para redireccionar
  const navigate = useNavigate()
  // importamos la url base de la api
  const url = import.meta.env.VITE_API_BASE_URL

    // funcion para validar la sesion
    const validateSession = async () => {
        localStorage.getItem('token') ? navigate('/login') : console.log('no hay token')
    }

  // funcion para crear la orden de trabajo desde el formulario
  const onSubmit = async(data) => {
    console.log(data)
    const response = await axios.post(url + 'api/login', { email: data['email'], password: data['password'] } ,{
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  
      }
  })
  console.log(response.data.data)
  localStorage.setItem('token', response.data.data.token)

  navigate('/dashboard')
  }

  // inicializamos el useForm
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control
  } = useForm({})

  return (
    <div className="main-login">
     <div className="sub-main-login">
       <div>
         <div className="imgs-login">
           <div className="container-image-login">
             <img src="./logo.png" alt="profile" className="profile-login"/>

           </div>


         </div>
         <form onSubmit={handleSubmit(onSubmit)}>
           <h1>Login Page</h1>
           <div className='input-form'>
             <img src={email} alt="email" className="email-login"/>
             <input type="text" {...register('email')} placeholder="Ingrese su email" className="name-login"/>
           </div>
           <div className="second-input-login input-form">
             <img src={pass} alt="pass" className="email-login"/>
             <input type="password" {...register('password')} placeholder="Ingrese su password" className="name-login"/>
           </div>
          <div className="login-button-login mt-5">
          <button className='btn btn-primary w-50' type='submit'>Iniciar Sesión</button>
          </div>
         </form>
       </div>
       

     </div>
    </div>
  );
}

export default Login;