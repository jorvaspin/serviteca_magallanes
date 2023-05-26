import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const StatisticsChart = () => {
  const [lastWeekData, setLastWeekData] = useState([])
  const [lastWeekDays, setLastWeekDays] = useState([])
  const url = import.meta.env.VITE_API_BASE_URL
  // importamos navigate para redireccionar
  const navigate = useNavigate()

  useEffect(() => {
    getLastWeekData()
  }, [])

  const getLastWeekData = async () => {
    try {
      const response = await axios.get(url + 'api/getLastWeekData', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // eslint-disable-next-line no-undef
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setLastWeekDays(response.data.date_array.reverse())
      setLastWeekData(response.data.total_array.reverse())
      console.log(response.data)
    } catch (error) {
      toast.warning('La sesión se ha cerrado, inicie sesión nuevamente.', {
        position: toast.POSITION.TOP_RIGHT
      })
      console.log(error)
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
      backgroundColor: 'rgba(0, 0, 0, 0.59)',
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
    <ReactECharts option={option} />
  )
}

export default StatisticsChart
