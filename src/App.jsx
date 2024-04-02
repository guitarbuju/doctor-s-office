
import { Route, Routes } from 'react-router-dom';
import Home from './pages/homePage/Home';
import Doctors from './pages/doctors/Doctors';
import Patients from './pages/patients/Patients';
import Appointments from './pages/appoinments/Appointments';
import './App.css';
import Welcome from './pages/homePage/Welcome';
import PatientSearchByDni from './pages/patients/PatientSearchByDni';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route index={true}  element={<Welcome/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/patients' element={<Patients/>}/>
        <Route path='/patients/dni' element={<PatientSearchByDni/>}/>
        <Route path = '/appointments' element ={<Appointments/>}/>
      </Routes>
    </>
  )
}

export default App
