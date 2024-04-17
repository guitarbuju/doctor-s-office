import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Doctors from "./pages/partnershipHub/doctors/Doctors";
import Patients from "./pages/patients/Patients";
import "./App.css";
import Welcome from "./pages/homePage/Welcome";
import PatientSearchByDni from "./pages/patients/PatientSearchByDni";
import AppoinmentList from "./pages/appointments/search/AppoinmentList.jsx";
import AppointmentsWrapper from "./pages/appointments/create/AppointmentsWrapper.jsx";
import Collaborators from "./pages/partnershipHub/collaborators/CollaboratorsForm.jsx";
import PartnerSearch from "./pages/partnershipHub/PartnerSearch.jsx";
import SwitchBoard from "./pages/administration/SwitchBoard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index={true} element={<Welcome />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/collaborators" element={<Collaborators/>} />
        <Route path="/collaborators/search" element={<PartnerSearch/>} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/dni" element={<PatientSearchByDni />} />
        <Route path="/appointments" element={<AppointmentsWrapper/>} />
        <Route path="/appointments/list" element={<AppoinmentList />} />
        <Route path="/administration" element={<SwitchBoard/>} />
      </Routes>
      
    </>
  );
}

export default App;
