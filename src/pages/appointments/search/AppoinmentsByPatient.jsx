import { useState, useEffect , useCallback} from "react";
import { getDniData, postPersonDni } from "../../../api/fetchData";
import { formatDate } from "../../../api/formatDate";
import patientIcon from "../../../assets/icons8-patient-30.png";

const AppoinmentsByPatient = ({ foundPatient }) => {
  const [foundAppointments, setFoundAppointments] = useState({});
  
  console.log(foundAppointments);



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
                    <th className="p-3">Id</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Completed</th>
                    <th className="p-3 flex align-middle justify-center">
                      Admit Patient
                    </th>
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
                      <td className="px-3 py-2 flex justify-center align-middle">
                        {!app.completed && (
                          <button
                            type="button"
                            onClick={() => admitPatient(app.appointment_id)}
                            className="flex justify-center align-middle w-40 transition-transform transform hover:scale-150"
                          >
                            <img src={patientIcon} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppoinmentsByPatient;
