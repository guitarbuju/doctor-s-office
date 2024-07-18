import { useEffect, useState } from "react";
import { getStatusData } from "../../../api/fetchData";
import { formatDate } from "../../../api/formatDate";
import play from "../../../assets/icons8-play-50.png";
import { useAppointmentsInfoStore } from "../../../../store";
import { useNavigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../../../api/localStorage";

const PendingPatients = ({ userId }) => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/admissions/pending/:dni_and_status`;
  const [pendingAdmissionsList, setPendingAdmissionsList] = useState(null);
  const [completed, setCompleted] = useState(false);
  const setAdmissionInfo = useAppointmentsInfoStore(
    (state) => state.setAppointmentInfo
  );
  const drInHouse = getItemFromLocalStorage();

  const navigate = useNavigate();

  const getPendingAdmissionsById = async () => {
    try {
      const getAdmissions = await getStatusData(url, userId, completed);
      console.log(url, userId, completed);
      setPendingAdmissionsList(getAdmissions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInpuChange = (e) => {
    setCompleted(e.target.checked);
  };

  useEffect(() => {
    if (userId) {
      getPendingAdmissionsById();
    }
  }, [userId, completed]);

  console.log(pendingAdmissionsList);

  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-900">
      <div className="flex justify-around gap-10 align-middle">
        <div className="text-lg text-center text-gray-900">
          {completed ? (
            <h1>Previous Patients for Dr.{drInHouse?.user?.username} </h1>
          ) : (
            <h1>Pending Patients for Dr.{drInHouse?.user?.username} </h1>
          )}
        </div>
        <div className="flex justify-around gap-2">
          {completed ? (
            <label className="text-xs" htmlFor="status">
              Click for Pending patients:
            </label>
          ) : (
            <label className="text-xs" htmlFor="status">
              Click for Previous patients:
            </label>
          )}
          <input
            className="group size-4 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-yellow-400"
            name="status"
            type="checkbox"
            checked={completed}
            onChange={handleInpuChange}
          />
        </div>
      </div>

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
                    <td className="px-3 py-2 border-x border-y bg-zinc-100 hidden">
                      <p>{app.completed}</p>
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
                            completed: app.completed,
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
        </>
      ) : (
        <h1 className="text-lg text-center text-gray-900">
          No Pending Patients
        </h1>
      )}
    </div>
  );
};

export default PendingPatients;
