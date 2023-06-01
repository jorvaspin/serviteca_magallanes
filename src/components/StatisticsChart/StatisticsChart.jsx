import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StatisticsChart.css'
import Loading from 'react-fullscreen-loading'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const StatisticsChart = () => {
  const [lastWeekData, setLastWeekData] = useState([])
  const [lastWeekDays, setLastWeekDays] = useState([])
  // estado para el loading
  const [loading, setLoading] = useState(false)
  const [alignment, setAlignment] = useState('center')

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  const url = import.meta.env.VITE_API_BASE_URL
  // importamos navigate para redireccionar
  const navigate = useNavigate()

  useEffect(() => {
    getLastWeekData()
  }, [])

  const getLastWeekData = async (taller = 0) => {
    try {
      setLoading(true)
      const response = await axios.get(url + 'api/getLastWeekData/' + taller, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // eslint-disable-next-line no-undef
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setLastWeekDays(response.data.date_array.reverse())
      setLastWeekData(response.data.total_array.reverse())
      setLoading(false)
    } catch (error) {
      // eslint-disable-next-line no-undef
      localStorage.clear()
      navigate('/login')
    }
  }

  const option = {
    color: ['var(--orange)'],

    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: '#fff',
      borderWidth: 0
    },
    grid: {
      left: '2%',
      right: '5%',
      bottom: '2%',
      containLabel: true,
      show: false
    },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: lastWeekDays
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 191, 0)'
            },
            {
              offset: 1,
              color: '#F450D3'
            }
          ]),
          width: 4
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            {
              offset: 0,
              color: '#FE4C00'
            },
            {
              offset: 1,
              color: 'rgba(255,144,70,0.1)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        showSymbol: false,
        data: lastWeekData
      }
    ]
  }

  return (
    <div className='relative'>
      {
        loading ? <Loading loading background='#0000008c' loaderColor='#fff' /> : null
      }
      <div className='btn_workshops'>
        {/* creamos 2 botones para cada taller */}
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label='text alignment'
        >
          <ToggleButton value='left' onClick={() => { getLastWeekData(1) }} style={{ fontWeight: 'bold', padding: '0px 10px 0px 10px', fontSize: '10px', height: '35px' }} className='btn btn-primary' aria-label='left aligned'>
            Taller Santa Rosa
          </ToggleButton>
          <ToggleButton value='center' onClick={() => { getLastWeekData(0) }} style={{ fontWeight: 'bold', padding: '0px 10px 0px 10px', fontSize: '10px', height: '35px' }} className='btn btn-primary' aria-label='left aligned'>
            Ambos
          </ToggleButton>
          <ToggleButton value='rigth' onClick={() => { getLastWeekData(2) }} style={{ fontWeight: 'bold', padding: '0px 10px 0px 10px', fontSize: '10px', height: '35px' }} aria-label='centered'>
            Taller Tocornal
          </ToggleButton>
        </ToggleButtonGroup>
        {/* <button className='btn btn-primary' style={{ fontSize: '12px' }} onClick={() => { getLastWeekData(1) }}>Taller Santa Rosa</button>
        <button className='btn btn-primary' style={{ fontSize: '12px' }} onClick={() => { getLastWeekData(2) }}>Taller Tocornal</button> */}
      </div>
      <ReactECharts option={option} />
    </div>

  )
}

export default StatisticsChart
