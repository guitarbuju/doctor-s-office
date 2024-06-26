import { useAppointmentsInfoStore } from "../../../store";
import AdmissionDinamicForm from "./AdmissionDinamicForm";

const AdmissionCharger = () => {
    const admissionsInfo = useAppointmentsInfoStore(
        (state) => state.appointmentInfo
      );

  return (
    <div>
    <section className="py-6 text-gray-900 flex justify-around">
    <img 
    src='https://png.pngtree.com/thumb_back/fh260/png-vector/20200530/ourmid/pngtree-doctor-office-png-image_2215307.jpg'/>
        <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
          <div className="flex flex-col space-y-4 text-center lg:text-left">
            <h1 className="text-5xl font-bold leadi text-gray-100">
              Admissions Items Charger
            </h1>
            <p className="text-lg text-gray-100">
              Add Medical Charges for patient {admissionsInfo.patient} on admission entry {admissionsInfo.id}
            </p>
          </div>
          </div>
      </section>
      <AdmissionDinamicForm  admissionsInfo={ admissionsInfo }/>
      </div>
  )
}

export default AdmissionCharger