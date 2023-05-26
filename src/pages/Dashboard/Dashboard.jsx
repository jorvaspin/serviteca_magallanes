/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react'
import Orders from '../../components/Orders/Orders'
import Statistics from '../../components/Statistics/Statistics'
import { groupNumber } from '../../data'
import css from './Dashboard.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const url = import.meta.env.VITE_API_BASE_URL
  // importamos navigate para redireccionar
  const navigate = useNavigate()
  const [dataAdmin, setDataAdmin] = useState([])

  useEffect(() => {
    getDataAdmin('week')
  }, [])

  const [selected, setSelected] = useState('week')

  const handleChange = event => {
    console.log(event.target.value)
    getDataAdmin(event.target.value)
    setSelected(event.target.value)
  }

  const getDataAdmin = async (data) => {
    console.log(localStorage.getItem('token'))
    try {
      const response = await axios.get(url + 'api/getDataAdmin/' + data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setDataAdmin(response.data.workOrders)
    } catch (error) {
      toast.warning('La sesión se ha cerrado, inicie sesión nuevamente.', {
        position: toast.POSITION.TOP_RIGHT
      })
      console.log(error)
      localStorage.clear()
      navigate('/login')
    }
  }

  return (
    <div className={css.container}>

      {/* left side */}
      <div className={css.dashboard}>

        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>Administrador</span>

            <div className={css.durationButton}>
              <select value={selected} onChange={handleChange}>
                <option value='week'>Esta Semana</option>
                <option value='month'>Este Mes</option>
                <option value='year'>Este Año</option>
              </select>
            </div>
          </div>
          <div className={css.cards}>
            {
              <>
                <div className={css.dataAdmin}>
                  <div className={css.cardHead}>
                    <span>Ordenes de trabajo</span>
                    {/* <span>+{card.change}</span> */}
                  </div>

                  <div className={css.dataAdmin}>
                    <span>#</span>
                    <span>{groupNumber(dataAdmin.length)}</span>
                  </div>
                </div>

                <div className={css.ganacias}>
                  <div className={css.cardHead}>
                    <span>Ganancias</span>
                    {/* <span>+{card.change}</span> */}
                  </div>

                  <div className={css.ganacias}>
                    <span>$</span>
                    <span>{groupNumber((dataAdmin.reduce((a, v) => a = a + v.total_a_pagar, 0)))}</span>
                  </div>
                </div>

                <div className={css.productos}>
                  <div className={css.cardHead}>
                    <span>Trabajos Realizados</span>
                    {/* <span>+{card.change}</span> */}
                  </div>

                  <div className={css.productos}>
                    <span />
                    <span>{groupNumber((dataAdmin.reduce((a, v) => a = a + v.trabajos_counts, 0)))} trabajos</span>
                  </div>
                </div>
              </>
            }
          </div>
        </div>

        <Statistics />

      </div>

      <Orders />
    </div>
  )
}

export default Dashboard
