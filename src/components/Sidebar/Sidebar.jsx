import css from './Sidebar.module.css'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiOutlineTable } from 'react-icons/ai'
import { GiCarWheel } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className={css.container}>

      <img src='https://res.cloudinary.com/dr3zgzxx0/image/upload/v1684513017/logo_magallanes_bvqpva.png' alt='logo' className={css.logo} />

      <div className={css.menu}>
        <NavLink to='dashboard' className={css.item} title='Dashboard'>
          <MdSpaceDashboard size={30} />
        </NavLink>

        <NavLink
          to='ordenes'
          className={css.item}
          title='Ordenes de trabajo'
        >
          <AiOutlineTable size={30} />
        </NavLink>

        <NavLink
          to='productos'
          className={css.item}
          title='Productos'
        >
          <GiCarWheel size={30} />
        </NavLink>

        {/* <NavLink
          to='calendar'
          className={css.item}
          title='Calendar'
        >
          <AiFillCalendar size={30} />
        </NavLink> */}

        {/* <NavLink
                    to="board"
                    className={css.item}
                    title="Trello Board"
                >
                    <FaTasks size={30} />
                </NavLink> */}

      </div>
    </div>
  )
}

export default Sidebar
