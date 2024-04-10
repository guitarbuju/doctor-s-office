
import { Dialog } from "@headlessui/react";
import {  postPersonDni } from "../../../../api/fetchData.js";

function AdmitAppointmentModal({isOpen, setIsOpen, admissionId, getPatientsAppointment}) {

    const urlPatch = `${import.meta.env.VITE_BASE_URL}/admissions`;

    const admitPatient = async (id) => {
      try {
        const postIdforAdmmission = await postPersonDni(urlPatch, id);
        console.log(postIdforAdmmission);
        getPatientsAppointment();
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
        <Dialog.Panel
        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title>Create Admission</Dialog.Title>

          <Dialog.Description
          className="text-lg font-medium leading-6 text-gray-900">
            This will create an Admission number
          </Dialog.Description>

          <p className="text-sm text-gray-500">
            Are you sure you want to admit this patient?
          </p>
          <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
          onClick={() => admitPatient(admissionId)}>Admit Patient
          </button>
          <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2 ml-4"
          onClick={() => setIsOpen(false)}>Close Modal
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default AdmitAppointmentModal;
