import { patchData } from "../../../api/fetchData";
import { formatDate } from "../../../api/formatDate";
import patientIcon from "../../../assets/icons8-patient-30.png";

const ListTable = ({ appointmentList, reloadAppointmentList }) => {
  console.log("este", appointmentList);

  const urlPatch = `${import.meta.env.VITE_BASE_URL}/appointments/complete`;

  const admitPatient = async (id) => {
    try {
      const patchAppointmentId = patchData(urlPatch, id);
      console.log(patchAppointmentId);
      reloadAppointmentList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-400 ">
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-900">
          Appointments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <thead>
              <tr className=" text-lg ">
                <th className="p-3">Id</th>
                <th className="p-3">Date</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Completed</th>
                <th className="p-3 flex align-middle justify-center">
                  Admit Patient
                </th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {appointmentList?.data?.map((app, index) => (
                <tr className="text-sm" key={index}>
                  <td className="px-3 py-2">
                    <p>{app.appointment_id}</p>
                  </td>
                  <td className="px-3 py-2">
                    <span>{formatDate(app.appointment_date)}</span>
                  </td>
                  <td className="px-3 py-2">
                    <p>{app.patient_full_name}</p>
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
  );
};

export default ListTable;
