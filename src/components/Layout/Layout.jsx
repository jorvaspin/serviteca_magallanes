import moment from 'moment/moment'
import 'moment/locale/es'
import css from './Layout.module.css'
import Sidebar from '../Sidebar/Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const { pathname } = useLocation()
  moment.locale('es')

  return (
    <div className={css.container}>
      <Sidebar />

      {/* making the dashboard as the default route */}
      {pathname === '/' && <Navigate to='/login' />}

      <div className={css.dashboard}>

        {/* <div className={css.header}>

          <span>{moment().format("dddd, Do MMMM YYYY")}</span>

          <div className={css}>
            <img src="./logo.png" alt="logo" width={100} />
          </div>

          <div className={css.profile}>
            <img src="./profile.png" alt="person image" />
            <div className={css.details}>
              <span>Denis Steven</span>
              <span>devissteven@gmail.com</span>
            </div>
          </div>

        </div> */}

        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
