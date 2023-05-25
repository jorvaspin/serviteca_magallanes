import React, { useState, useEffect } from 'react'
import css from './Statistics.module.css'
import { BsArrowUpShort } from 'react-icons/bs'
import { groupNumber } from '../../data'
import StatisticsChart from '../StatisticsChart/StatisticsChart'
import axios from 'axios'

const Statistics = () => {

    const [lastTrabajosRealizados, setLastTrabajosRealizados] = useState([])
    const [loading, setLoading] = useState(true)
    const url = import.meta.env.VITE_API_BASE_URL
    useEffect(() => {
        getLastTrabajosRealizados()
    }, [])

    const getLastTrabajosRealizados = async () => {
        const response = await axios.get(url + 'api/getLastTrabajosRealizados', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+import.meta.env.VITE_API_TOKEN
            }
        })

        setLastTrabajosRealizados(response.data)
        setLoading(false)
    }

    return (
        <div className={`${css.container} theme-container`}>
            <span className={css.title}>Últimos trabajos realizados</span>

            <div className={`${css.cards} grey-container`}>

                <div>
                    <div className={css.arrowIcon}>
                        <BsArrowUpShort />
                    </div>

                    <div className={css.card}>
                        <span>Número de OT</span><span>#{lastTrabajosRealizados.uuid}</span>
                    </div>
                </div>

                <div className={css.card}>
                    <span>Trabajos</span>
                    {
                        loading ? <span>Cargando...</span> :
                        lastTrabajosRealizados.trabajos_realizados.map((trabajo, index) => (
                            <span key={index}>{trabajo.nombre_trabajo}</span>
                        ))
                    }
                </div>

                <div className={css.card}>
                <span>Total OT</span>
                    {
                        loading ? <span>Cargando...</span> :
                        <span>${groupNumber(lastTrabajosRealizados.total_a_pagar)}</span>
                    }
                    
                </div>
            </div>


            <StatisticsChart/>
        </div>
    )
}

export default Statistics