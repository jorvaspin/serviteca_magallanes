// import React, { useState } from 'react'
import css from './Sidebar.module.css'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiOutlineTable } from 'react-icons/ai'
import { GiCarWheel } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  // variable para acivar el menu
  // const [active, setActive] = useState('dashboard')

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
                title='Dashboard'
                // style={(activeNav) => activate(activeNav.isActive, 'dashboard')}
              >
                <MdSpaceDashboard size={30} />
                <span className='title-sidebar mt-2'>Dashboard</span>
              </NavLink>

              <NavLink
                to='ordenes'
                title='Ordenes de trabajo'
                // style={(activeNav) => activate(activeNav.isActive, 'ordenes')}
              >
                <GiCarWheel size={30} />

                <span className='title-sidebar mt-2'>Lista OT´s</span>
              </NavLink>

              <NavLink
                to='calendario'
                title='calendario'
                // style={(activeNav) => activate(activeNav.isActive, 'productos')}
              >
                <AiOutlineTable size={30} />
                <span className='title-sidebar mt-2'>Calendario</span>
              </NavLink>
            </div>
            )
          : null
      }
    </div>
  )
}

export default Sidebar
