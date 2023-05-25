import React, { useState, useEffect } from 'react'
import css from './Statistics.module.css'
import { BsArrowUpShort } from 'react-icons/bs'
import { groupNumber } from '../../data'
import StatisticsChart from '../StatisticsChart/StatisticsChart'
import axios from 'axios'

const Statistics = () => {

    const [lastWorksCompleted, setLastWorksCompleted] = useState([])
    const [loading, setLoading] = useState(true)
    const url = import.meta.env.VITE_API_BASE_URL
    useEffect(() => {
        getLastWorksCompleted()
    }, [])

    const getLastWorksCompleted = async () => {
        const response = await axios.get(url + 'api/getLastWorksCompleted', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        })

        setLastWorksCompleted(response.data)
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
                        <span>Número de OT</span><span>#{lastWorksCompleted.uuid}</span>
                    </div>
                </div>

                <div className={css.card}>
                    <span>Trabajos</span>
                    {
                        loading ? <span>Cargando...</span> :
                        lastWorksCompleted.trabajos_realizados.map((trabajo, index) => (
                            <span key={index}>{trabajo.trabajo}</span>
                        ))
                    }
                </div>

                <div className={css.card}>
                <span>Total OT</span>
                    {
                        loading ? <span>Cargando...</span> :
                        <span>${groupNumber(lastWorksCompleted.total_a_pagar)}</span>
                    }
                    
                </div>
            </div>


            <StatisticsChart/>
        </div>
    )
}

export default Statistics