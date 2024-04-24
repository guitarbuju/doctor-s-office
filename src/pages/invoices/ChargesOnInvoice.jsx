import { getDniData } from "../../api/fetchData";
import { useEffect, useState } from "react";
// import play from "../../assets/icons8-play-50.png";
import { useAppointmentsInfoStore } from "../../../store";
// import { useNavigate } from "react-router-dom";

const ChargesOnInvoice = () => {
  const [chargeList, setChargeList] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/charges`;
  const admissionsInfo = useAppointmentsInfoStore(
    (state) => state.appointmentInfo
  );
  //   const setAdmissionsInfo = useAppointmentsInfoStore(
  //     (state) => state.setAppointmentInfo
  //   );
  //   const navigate=useNavigate()

  useEffect(() => {
    const getCharges = async () => {
      try {
        const chargeList = await getDniData(url, admissionsInfo.id);
        setChargeList(chargeList);
      } catch (error) {
        console.error(error);
      }
    };

    getCharges();
  }, []);

  console.log(chargeList);
  console.log(admissionsInfo);

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
        <h2 className="mb-4 text-2xl font-semibold leading-tight ">
          Outstanding Charges
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <thead>
              <tr className=" text-lg bg-zinc-200">
                <th className="p-3  border-x border-y">Doctor</th>
                <th className="p-3 border-x border-y">Id</th>
                <th className="p-3  border-x border-y">Service</th>
                <th className="p-3  border-x border-y">Quantity</th>
                <th className="p-3  border-x border-y">Price</th>
                <th className="p-3  border-x border-y">Total</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {chargeList?.data?.map((charge, index) => (
                <tr className="text-sm" key={index}>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{charge.doctor}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200 ">
                    <span>{charge.charge_id}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <span>{charge.service_title}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200">
                    <p>{charge.amount}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{charge.price}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{charge.total}</p>
                  </td>
                  <td className="px-3 py-2 flex justify-center align-middle border-x border-y ">
                    {/* <button
                      type="button"
                      onClick={() =>{
                        setchargeissionInfo({
                          id: charge.id,
                          date: charge.date_created,
                          doctor: charge.doctor_full_name,
                          patient: charge.patient_full_name,
                        }); 
                        // navigate('/charges')
                      }}
                      className="flex justify-center align-middle w-40 transition-transform transform hover:scale-150"
                    >
                      <img src={play} className="w-6" />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {chargeList?.total && chargeList.total.length > 0 && (
        <span className="text-md mt-2 flex justify-end">
          Total Charges: {chargeList.total[0].total_sum}
        </span>
      )}
    </div>
  );
};

export default ChargesOnInvoice;
