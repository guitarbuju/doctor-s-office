import { useState, useEffect, useCallback } from "react";
import { getDniData } from "../../../api/fetchData";
import { formatDate } from "../../../api/formatDate";
import patientIcon from "../../../assets/icons8-patient-30.png";
import nullIcon from "../../../assets/icons8-x-50.png";
import AdmitAppointmentModal from "./modals/AdmitAppointmentModal";
import NullAppointmentModal from "./modals/NullAppointmentModal";

const AppoinmentsByPatient = ({ foundPatient }) => {
  //State variables
  const [foundAppointmentForModal, setFoundAppointmentForModal] = useState({});
  const [admissionId, setAdmissionId] = useState("");
  const [foundAppointments, setFoundAppointments] = useState({});
  console.log(foundAppointments);

  //Modal handler for admission  buttons
  const [isOpen, setIsOpen] = useState(false);
 
  //Modal handler for  appointments buttons
  const [isNullerOpen, setIsNullerOpen] = useState(false);
  

  const clickHandler = (id) => {
    setIsOpen(true);
    setAdmissionId(id);
    const foundAppointment = foundAppointments?.data?.find(
      (app) => app.appointment_id === id
    );
    setFoundAppointmentForModal(foundAppointment);
  };


  const nullHandler = (id) => {
    setIsNullerOpen(true);
    setAdmissionId(id);
    const foundAppointment = foundAppointments?.data?.find(
      (app) => app.appointment_id === id
    );
    setFoundAppointmentForModal(foundAppointment);
  };
  //get patients updated grid

  const getPatientsAppointment = useCallback(async () => {
    try {
      const { dni } = foundPatient.data[0];
      const url = `${import.meta.env.VITE_BASE_URL}/appointments/patients`;
      const getData = await getDniData(url, dni);
      setFoundAppointments(getData);
    } catch (error) {
      console.error(error);
    }
  }, [foundPatient]);

  useEffect(() => {
    getPatientsAppointment();
  }, [foundPatient, getPatientsAppointment]);

  return (
    <>
      <div>
        <div className="bg-orange-300 ">
          <div className="container p-2 mx-auto sm:p-4 text-gray-900">
            <h2 className="mb-4 text-xl flex flex-start font-semibold leading-tight text-gray-900">
              Appointments
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                <thead>
                  <tr className=" text-sm ">
                    <th className="p-3 w-4">Id</th>
                    <th className="p-3 w-6">Date</th>
                    <th className="p-3 w-10">Doctor</th>
                    <th className=" p-3 w-10">Completed</th>
                    <th className="w-10 text-center">Admit Patient</th>
                    <th className="w-2 text-center">NULL</th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-300">
                  {foundAppointments?.data?.map((app, index) => (
                    <tr className="text-sm" key={index}>
                      <td className="px-3 py-2">
                        <p>{app.appointment_id}</p>
                      </td>
                      <td className="px-3 py-2">
                        <span>{formatDate(app.appointment_date)}</span>
                      </td>
                      <td className="px-3 py-2">
                        <p>{app.doctor_full_name}</p>
                      </td>
                      <td className="px-3 py-2">
                        {app.completed ? (
                          <p className="font-bold">Completed</p>
                        ) : (
                          <p className="text-lg text-gray-100">Pending</p>
                        )}
                      </td>
                      <td className=" py-2  ">
                        {!app.completed && (
                          <button
                            type="button"
                            onClick={() => clickHandler(app.appointment_id)}
                            className="flex justify-center align-middle w-40 transition-transform transform hover:scale-150"
                          >
                            <img src={patientIcon} />
                          </button>
                        )}
                      </td>
                      <td className=" py-2 flex justify-center">
                        {!app.completed && (
                          <button
                            type="button"
                            className="flex justify-center align-middle w-40 transition-transform transform hover:scale-125"
                          >
                            <img 
                            src={nullIcon}
                            className="w-7" 
                            onClick={() => nullHandler(app.appointment_id)} 
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AdmitAppointmentModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                admissionId={admissionId}
                getPatientsAppointment={getPatientsAppointment}
                foundAppointmentForModal={foundAppointmentForModal}
              />
              <NullAppointmentModal
                isNullerOpen={isNullerOpen}
                setIsNullerOpen={setIsNullerOpen}
                admissionId={admissionId}
                getPatientsAppointment={getPatientsAppointment}
                foundAppointmentForModal={foundAppointmentForModal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppoinmentsByPatient;
