import React, { useState, useEffect } from 'react'
import { groupNumber, ordersData } from '../../data'
import css from './Orders.module.css'
import Badge from 'react-bootstrap/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import axios from 'axios'

const Orders = () => {

    const url = import.meta.env.VITE_API_BASE_URL
    const [workOrders, setWorkOrders] = useState([])

    useEffect(() => {
        getWorksToday()
    }, [])

    const getWorksToday = async () => {
        const response = await axios.get(url + 'api/getWorksToday', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        })
        setWorkOrders(response.data)
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
                <span>OT de Hoy {workOrders.length}</span>
            </div>

            <div className={`grey-container ${css.stat}`}>
                <span>Total</span>
                {
                    workOrders.length > 0 ? 
                    <span>$ {groupNumber((workOrders.reduce((a,v) =>  a = a + v.total_a_pagar , 0 )))}</span>
                    :
                    <span>$ {groupNumber(0)}</span>
                }
                
            </div>

            <div className={css.orders}>
                {
                    workOrders.length > 0 ?
                    workOrders.map((order, index) => (
                        <div key={index} className={css.order}>
                            <div className='m-0'>
                                <span>#Orden de trabajo {order.uuid}</span>
                                <Badge className='text-white p-1 m-1' bg="success">
                                ${groupNumber(order.total_a_pagar)}
                                </Badge>
                            </div>
                            <Stack direction="row" spacing={1}>
                                <Chip className='text-white pl-0' label={order.fecha_creada} />
                            </Stack>
                            <div>
                                <span>{order.type}</span>
                                <HtmlTooltip className='w-25'
                                    title={
                                    <React.Fragment>
                                        <Typography color="inherit" className='text-center p-2'>Detalle</Typography>
                                        {
                                            
                                            order.trabajos_realizados.map((trabajo, index) => (
                                                <ul key={index}>
                                                    <li className='text-black'>{trabajo['trabajo']}</li>
                                                    <li className='text-black'>Valor: ${groupNumber(trabajo['costo'])} </li>
                                                    <hr />
                                                </ul>
                                            ))
                                        }
                                    </React.Fragment>
                                    }
                                >
                                    <Badge bg="warning" text="dark">
                                        Trabajos realizados: <span className='text-black'>{order.trabajos_realizados.length}</span>
                                    </Badge>
                                </HtmlTooltip>
                            </div>
                            <hr className='mt-3  mb-0' />
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
        </div>
    )
}

export default Orders