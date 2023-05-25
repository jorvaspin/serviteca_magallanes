import React, { useState, useEffect } from 'react'
import { groupNumber, ordersData } from '../../data'
import OrdersPieChart from '../OrdersPieChart/OrdersPieChart'
import css from './Orders.module.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios'

const Orders = () => {

    const url = import.meta.env.VITE_API_BASE_URL
    const [ordenTrabajo, setOrdenTrabajo] = useState([])
    const [uuid, setUuid] = useState('')
    const [patente, setPatente] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [kilometraje, setKilometraje] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [mecanico, setMecanico] = useState('')
    const [formaPago, setFormaPago] = useState('')
    const [totalAPagar, setTotalAPagar] = useState('')
    const [trabajosRealizados, setTrabajosRealizados] = useState([])
    const [operation, setOperation] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getOrdenTrabajo()
    }, [])

    const getOrdenTrabajo = async () => {
        const response = await axios.get(url + 'api/getOrdenTrabajosHoy', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+import.meta.env.VITE_API_TOKEN
            }
        })
        setOrdenTrabajo(response.data)
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }));

    return (
        <div className={`${css.container} theme-container`}>
            <div className={css.head}>
                <img src="./logo.png" alt="logo" />
                <span>OT de Hoy {ordenTrabajo.length}</span>
            </div>

            <div className={`grey-container ${css.stat}`}>
                <span>Total</span>
                {
                    ordenTrabajo.length > 0 ? 
                    <span>$ {groupNumber((ordenTrabajo.reduce((a,v) =>  a = a + v.total_a_pagar , 0 )))}</span>
                    :
                    <span>$ {groupNumber(0)}</span>
                }
                
            </div>

            <div className={css.orders}>
                {
                    ordenTrabajo.length > 0 ?
                    ordenTrabajo.map((order, index) => (
                        <div key={index} className={css.order}>
                            <div>
                                <span>#Orden de trabajo {order.uuid}</span>
                                <span>${groupNumber(order.total_a_pagar)}</span>
                            </div>
                            <div>
                                <span>{order.type}</span>
                                <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <Typography color="inherit">Detalle</Typography>
                                        {
                                            
                                            order.trabajos_realizados.map((trabajo, index) => (
                                                <ul key={index}>
                                                    <li>{trabajo['nombre_trabajo']}</li>
                                                    <li>{trabajo['precio']}</li>
                                                    <hr />
                                                </ul>
                                            ))
                                        }
                                    </React.Fragment>
                                    }
                                >
                                    <span>Trabajos realizados: {order.trabajos_realizados.length}</span>
                                </HtmlTooltip>
                            </div>
                        </div>
                    ))
                    :
                        <div key='0'>
                            <div>
                                <h6>Aún no se realizan trabajos el día de hoy</h6>
                            </div>
                        </div>
                }
            </div>


            {/* <div className={css.orderChart}>
                <span>Split by orders</span>
                <OrdersPieChart/>
            </div> */}
        </div>
    )
}

export default Orders