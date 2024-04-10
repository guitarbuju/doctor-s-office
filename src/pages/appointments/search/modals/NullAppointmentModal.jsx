import { Dialog } from "@headlessui/react";
import { patchData } from "../../../../api/fetchData.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NullAppointmentModal({
  isNullerOpen,
  setIsNullerOpen,
  admissionId,
  getPatientsAppointment,
  foundAppointmentForModal,
}) {
    
    //State Variables  
  const [isResponseVisible, setIsResponseVisible] = useState(false) ; 
  const navigate=useNavigate() 
  /////
  const urlPatch = `${import.meta.env.VITE_BASE_URL}/appointments/complete`;
  console.log("found app modal", foundAppointmentForModal);

  const nullAppointment = async (id) => {
    try {
      const postIdforAnullment = await patchData(urlPatch, id);
      console.log(postIdforAnullment);
      getPatientsAppointment();
      setIsResponseVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModals =()=>{
    setIsNullerOpen(false);
    setIsResponseVisible(false);
  }
  const closeAndReeschedule =()=>{
    setIsNullerOpen(false);
    setIsResponseVisible(false);
    navigate('/appointments')
  }

  return (
    <Dialog
      open={isNullerOpen}
      onClose={() => setIsNullerOpen(false)}
      className="relative z-50 border-blue-700  p-10 text-sm "
    >
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-52">
          <Dialog.Title className='mt-8'>
             Appoinment for {foundAppointmentForModal.patient_full_name}{" "}
            with Dr.{foundAppointmentForModal.doctor_full_name} on date {foundAppointmentForModal.appointment_date}
          </Dialog.Title>
        { !isResponseVisible ?
          <Dialog.Description
          className="text-lg font-medium leading-6 text-gray-900 mt-2">
            Are you sure you want to anull this appointment?
            <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
          onClick={() => nullAppointment(admissionId)}>Anull Appoinment
          </button>
          <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2 ml-2"
              onClick={() => closeModals()}
            >
              Close
            </button>
          </Dialog.Description>
          :''}
          {
            isResponseVisible ?
            <Dialog.Description>
            <span className="text-lg font-medium leading-6 text-gray-900">
              Apointment anulled successfully...
            </span> <br />
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
              onClick={() => closeModals()}
            >
              No Reeschedule
            </button>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2 ml-2"
              onClick={() => closeAndReeschedule()}
            >
              Reeschedule
            </button>
          </Dialog.Description>
          :''}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default NullAppointmentModal;
