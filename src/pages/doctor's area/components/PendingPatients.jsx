import { useEffect, useState } from "react";
import { getDniData } from "../../../api/fetchData";
import { formatDate } from "../../../api/formatDate";
import play from "../../../assets/icons8-play-50.png";
import { useAppointmentsInfoStore } from "../../../../store";
import { useNavigate } from "react-router-dom";

const PendingPatients = ({ userId }) => {
  const url = `${import.meta.env.VITE_BASE_URL}/admissions/pending`;
  const [pendingAdmissionsList, setPendingAdmissionsList] = useState(null);
  const setAdmissionInfo = useAppointmentsInfoStore(
    (state) => state.setAppointmentInfo
  );
  const navigate = useNavigate();

  const getPendingAdmissionsById = async () => {
    try {
      const getAdmissions = await getDniData(url, userId);
      setPendingAdmissionsList(getAdmissions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getPendingAdmissionsById();
    }
  }, [userId]);

// console.log(pendingAdmissionsList.status);

  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-900">
      <h1 className="text-lg text-center text-gray-900">
        Pending Patients for Dr.{" "}
        {pendingAdmissionsList?.data?.data[0].doctor_full_name}
      </h1>
      {pendingAdmissionsList && pendingAdmissionsList.status === 200 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="text-lg bg-zinc-200">
                  <th className="p-3 border-x border-y">Id</th>
                  <th className="p-3 border-x border-y">Date</th>
                  <th className="p-3 border-x border-y">Patient</th>
                  <th className="p-3 border-x border-y flex align-middle justify-center">
                    Attend Patient
                  </th>
                </tr>
              </thead>
              <tbody className="border-b border-gray-300">
                {/* Mapping through pendingAdmissionsList data */}
                {pendingAdmissionsList?.data?.data?.map((app, index) => (
                  <tr className="text-sm" key={index}>
                    <td className="px-3 py-2 border-x border-y bg-zinc-100">
                      <p>{app.id}</p>
                    </td>
                    <td className="px-3 py-2 border-x border-y">
                      <span>{formatDate(app.date_created)}</span>
                    </td>
                    <td className="px-3 py-2 border-x border-y bg-zinc-100">
                      <p>{app.patient_full_name}</p>
                    </td>
                    <td className="px-3 py-2 border-x border-y bg-zinc-100 hidden">
                      <p>{app.doctor_full_name}</p>
                    </td>
                    {/* Example cell with an icon */}
                    <td className="px-3 py-2 border-x border-y bg-zinc-100 flex items-center justify-center">
                      <img
                      
                        src={play}
                        alt="play icon"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          setAdmissionInfo({
                            id: app.id,
                            date: app.date_created,
                            patient: app.patient_full_name,
                            doctor: app.doctor_full_name,
                          });
                          navigate("/medicalentry");
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>):(<h1
        className="text-lg text-center text-gray-900"
        >
          No Pending Patients
        </h1>)}
      
    </div>
  );
};

export default PendingPatients;
