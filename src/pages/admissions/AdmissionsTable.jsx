import { formatDate } from "../../api/formatDate";
import { fetchAllPeopleData } from "../../api/fetchData";
import { useEffect, useState } from "react";
import play from "../../assets/icons8-play-50.png";
import { useAppointmentsInfoStore } from "../../../store";
import { useNavigate } from "react-router-dom";

const AdmissionsTable = () => {
  const [admittedList, setAdmittedList] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/admissions/pending`;
  const navigate=useNavigate()

  useEffect(() => {
    const getAdmittedPatients = async () => {
      try {
        const fetchAdmittedList = await fetchAllPeopleData(url);
        setAdmittedList(fetchAdmittedList);
      } catch (error) {
        console.error(error);
      }
    };

    getAdmittedPatients();
  }, []);

  // const admissionsInfo = useAppointmentsInfoStore(
  //   (state) => state.appointmentInfo
  // );
  const setAdmissionInfo = useAppointmentsInfoStore(
    (state) => state.setAppointmentInfo
  );

  console.log(admittedList);
  // console.log(admissionsInfo);
  
  
  return (
    <div >
   
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          Pending Admissions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <thead>
              <tr className=" text-lg bg-zinc-200">
                <th className="p-3 border-x border-y">Id</th>
                <th className="p-3  border-x border-y">Admission Date</th>
                <th className="p-3  border-x border-y">Appointment Date</th>
                <th className="p-3  border-x border-y">Patient</th>
                <th className="p-3  border-x border-y">Doctor</th>
                <th className="p-3  border-x border-y">Add Charges</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {admittedList?.data?.map((adm, index) => (
                <tr className="text-sm" key={index}>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{adm.id}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200 ">
                    <span>{formatDate(adm.date_created)}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <span>{formatDate(adm.appointment_date)}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200">
                    <p>{adm.patient_full_name}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{adm.doctor_full_name}</p>
                  </td>
                  <td className="px-3 py-2 flex justify-center align-middle border-x border-y ">
                    <button
                      type="button"
                      onClick={() =>{
                        setAdmissionInfo({
                          id: adm.id,
                          date: adm.date_created,
                          doctor: adm.doctor_full_name,
                          patient: adm.patient_full_name,
                        }); 
                        navigate('/charges')
                      }}
                      className="flex justify-center align-middle w-40 transition-transform transform hover:scale-150"
                    >
                      <img src={play} className="w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsTable;