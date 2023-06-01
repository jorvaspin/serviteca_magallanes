import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import Calendario from './pages/Calendar/Calendar'
import Dashboard from './pages/Dashboard/Dashboard'
import DataGrid from './pages/DataGrid/DataGrid'
import { CreateNewOT } from './pages/DataGrid/Form/CreateNewOT'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div id='dashboard'>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='calendario' element={<Calendario />} />
            <Route path='createOT' element={<CreateNewOT />} />
            <Route path='ordenes'>
              <Route index element={<DataGrid />} />
              <Route path='createOT' element={<CreateNewOT />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
