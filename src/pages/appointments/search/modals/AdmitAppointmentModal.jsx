import { Dialog } from "@headlessui/react";
import { postPersonDni } from "../../../../api/fetchData.js";
import { useState } from "react";

function AdmitAppointmentModal({
  isOpen,
  setIsOpen,
  admissionId,
  getPatientsAppointment,
  foundAppointmentForModal,
}) {
    
    //State Variables  
  const [isResponseVisible, setIsResponseVisible] = useState(false) ; 

  /////
  const urlPatch = `${import.meta.env.VITE_BASE_URL}/admissions`;
  console.log("found app modal", foundAppointmentForModal);

  const admitPatient = async (id) => {
    try {
      const postIdforAdmmission = await postPersonDni(urlPatch, id);
      console.log(postIdforAdmmission);
      getPatientsAppointment();
      setIsResponseVisible(true)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 border-blue-700  p-10 text-sm"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title>
             Admission for {foundAppointmentForModal.patient_full_name}{" "}
            with Dr.{foundAppointmentForModal.doctor_full_name}
          </Dialog.Title>
        { !isResponseVisible ?
          <Dialog.Description
          className="text-lg font-medium leading-6 text-gray-900">
            Are you sure you want to admit this patient?
            <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
          onClick={() => admitPatient(admissionId)}>Admit Patient
          </button>
          </Dialog.Description>
          :''}
          {
            isResponseVisible ?
            <Dialog.Description>
            <p className="text-lg font-medium leading-6 text-gray-900">
              Admission created successfully...
            </p>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </Dialog.Description>
          :''}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default AdmitAppointmentModal;
