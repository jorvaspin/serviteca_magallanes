import React, { useState } from 'react'
import css from './Sidebar.module.css'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiOutlineTable } from 'react-icons/ai'
import { GiCarWheel } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  // variable para acivar el menu
  const [active, setActive] = useState('dashboard')
  // activamos el menu
  const activate = (isActive, path, activeStyle, nonActiveStyle) => {
    console.log(active)
    if (isActive) {
      setActive(path)
      return activeStyle
    }
    return nonActiveStyle
  }

  return (
    <div className={css.container}>

      <img src='https://res.cloudinary.com/dr3zgzxx0/image/upload/v1684513017/logo_magallanes_bvqpva.png' alt='logo' className={css.logo} />
      {/* escondemos los menu si el token es invalido */}

      {
        // eslint-disable-next-line no-undef
        localStorage.getItem('token')
          ? (
            <div className={css.menu}>
              <NavLink
                to='dashboard'
                className={css.item}
                title='Dashboard'
                style={(activeNav) => activate(activeNav.isActive, 'dashboard')}
              >
                <MdSpaceDashboard size={30} />
                <span className='title-sidebar'>Dashboard</span>
              </NavLink>

              <NavLink
                to='ordenes'
                className={css.item}
                title='Ordenes de trabajo'
                style={(activeNav) => activate(activeNav.isActive, 'ordenes')}
              >
                <AiOutlineTable size={30} />
                <span className='title-sidebar'>Ordenes de trabajo</span>
              </NavLink>

              <NavLink
                to='productos'
                className={css.item}
                title='Productos'
                style={(activeNav) => activate(activeNav.isActive, 'productos')}
              >
                <GiCarWheel size={30} />
                <span className='title-sidebar'>Productos</span>
              </NavLink>
            </div>
            )
          : null
      }
    </div>
  )
}

export default Sidebar
