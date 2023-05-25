import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Calendar from './pages/Calendar/Calendar';
import Dashboard from './pages/Dashboard/Dashboard';
import DataGrid from './pages/DataGrid/DataGrid';
import { CreateNewOT } from './pages/DataGrid/Form/CreateNewOT';

const App = () => {
  return <div id="dashboard">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="calendar" element={<Calendar/>}/>
          <Route path="createOT" element={<CreateNewOT/>} />
          <Route path="ordenes" element={<DataGrid/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
};

export default App;
