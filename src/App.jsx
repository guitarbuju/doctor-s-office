import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Doctors from "./pages/partnershipHub/doctors/Doctors";
import Patients from "./pages/patients/Patients";
import "./App.css";
import PatientSearchByDni from "./pages/patients/PatientSearchByDni";
import AppoinmentList from "./pages/appointments/search/AppoinmentList.jsx";
import AppointmentsWrapper from "./pages/appointments/create/AppointmentsWrapper.jsx";
import Collaborators from "./pages/partnershipHub/collaborators/CollaboratorsForm.jsx";
import PartnerSearch from "./pages/partnershipHub/PartnerSearch.jsx";
import SwitchBoard from "./pages/administration/SwitchBoard.jsx";
import ServiceForm from "./pages/medicalServices/ServiceForm.jsx";
import NotFound from "./api/NotFound.jsx";
import AdmissionsList from "./pages/admissions/AdmissionsList.jsx";
import AdmissionCharger from "./pages/admissions/AdmissionCharger.jsx";
import InvoiceCharter from "./pages/invoices/InvoiceCharter.jsx";
import InputChargeForm from "./pages/invoices/InputChargeForm.jsx";
import InvoiceList from "./pages/invoices/InvoiceList.jsx";
import DiscountVoucher from "./pages/receivables/DiscountVoucher.jsx";
import CreditCardVoucher from "./pages/receivables/CreditCardVoucher.jsx";
import DirectPaymentVoucher from "./pages/receivables/DirectPaymentVoucher.jsx"
import Authorization from "./pages/homePage/Authorization";
import ProtectedRoute from "./pages/homePage/ProtectedRoute.jsx";
import Header from "./api/Header.jsx";
import Loggedin from "./pages/homePage/Loggedin.jsx";
import Footer from "./api/Footer.jsx";
import Gateway from "./pages/doctor's area/Gateway.jsx";


function App() {
  return (
    
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index={true} element={<Loggedin />} />
        <Route path="/authorization" element={<Authorization />} />
       
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Authorization />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/collaborators/search" element={<PartnerSearch />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/dni" element={<PatientSearchByDni />} />
          <Route path="/appointments" element={<AppointmentsWrapper />} />
          <Route path="/appointments/list" element={<AppoinmentList />} />
          <Route path="/admissions" element={<AdmissionsList />} />
          <Route path="/charges" element={<AdmissionCharger />} />
          <Route path="/charges/add" element={<InputChargeForm />} />
          <Route path="/invoices" element={<InvoiceCharter />} />
          <Route path="/invoices/list" element={<InvoiceList />} />
          <Route path="/discounts" element={<DiscountVoucher />} />
          <Route path="/payments" element={<CreditCardVoucher />} />
          <Route path="/direct_payments" element={<DirectPaymentVoucher />} />
          <Route path="/administration" element={<SwitchBoard />} />
          <Route path="/services" element={<ServiceForm />} />
          <Route path="/doctorcheckin" element={<Gateway />} />

        </Route>

        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
