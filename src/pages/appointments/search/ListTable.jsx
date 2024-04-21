import { useState } from "react";
import { postPersonDni } from "../../../api/fetchData";
import { formatDate } from "../../../api/formatDate";
import play from "../../../assets/icons8-play-50.png";
import SpinnerModal from "../../../api/SpinnerModal";

const ListTable = ({ appointmentList, reloadAppointmentList }) => {
  console.log("este", appointmentList);
const [isOpen, setIsOpen]=useState(false)

 const urlPatch = `${import.meta.env.VITE_BASE_URL}/admissions`;

 
   const admitPatient = async (id) => {
     try {
       const postIdforAdmmission = await postPersonDni(urlPatch, id);
       console.log(postIdforAdmmission);
       reloadAppointmentList();
       setIsOpen(true);
     } catch (error) {
       console.error(error);
     }
   };
 

  return (
    <div className="">
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-900">
          Appointments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <thead>
              <tr className=" text-lg bg-zinc-200">
                <th className="p-3 border-x border-y">Id</th>
                <th className="p-3  border-x border-y">Date</th>
                <th className="p-3  border-x border-y">Patient</th>
                <th className="p-3  border-x border-y">Doctor</th>
                <th className="p-3  border-x border-y">Completed</th>
                <th className="p-3  border-x border-y flex align-middle justify-center">
                  Admit Patient
                </th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {appointmentList?.data?.map((app, index) => (
                <tr className="text-sm" key={index}>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{app.appointment_id}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y ">
                    <span>{formatDate(app.appointment_date)}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{app.patient_full_name}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y ">
                    <p>{app.doctor_full_name}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    {app.completed ? (
                      <p className=" line-through text-zinc-700">Completed</p>
                    ) : (
                      <p className="font-bold">Pending</p>
                    )}
                  </td>
                  <td className="px-3 py-2 flex justify-center align-middle border-x border-y ">
                    {!app.completed && (
                      <button
                        type="button"
                        onClick={() => admitPatient(app.appointment_id)}
                        className="flex justify-center align-middle w-40 transition-transform transform hover:scale-150"
                      >
                        <img src={play} className="w-6" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SpinnerModal isOpen={isOpen} setIsOpen={setIsOpen}/>

      </div>
    </div>
  );
};

export default ListTable;
