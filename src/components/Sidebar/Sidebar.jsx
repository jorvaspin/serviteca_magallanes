import css from './Sidebar.module.css'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiOutlineTable } from 'react-icons/ai'
import { GiCarWheel } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className={css.container}>

      <img src='https://res.cloudinary.com/dr3zgzxx0/image/upload/v1684513017/logo_magallanes_bvqpva.png' alt='logo' className={css.logo} />
      {/* escondemos los menu si el token es invalido */}

      {
        // eslint-disable-next-line no-undef
        localStorage.getItem('token')
          ? (
            <div className={css.menu}>
              <NavLink to='dashboard' className={css.item} title='Dashboard'>
                <MdSpaceDashboard size={30} />
                <p>Dashboard</p>
              </NavLink>

              <NavLink
                to='ordenes'
                className={css.item}
                title='Ordenes de trabajo'
              >
                <AiOutlineTable size={30} />
                <p>Ordenes de trabajo</p>
              </NavLink>

              <NavLink
                to='productos'
                className={css.item}
                title='Productos'
              >
                <GiCarWheel size={30} />
                <p>Productos</p>
              </NavLink>
            </div>
            )
          : null
      }
    </div>
  )
}

export default Sidebar
