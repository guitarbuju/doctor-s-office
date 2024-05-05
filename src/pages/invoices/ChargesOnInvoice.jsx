import { deleteById, getDniData } from "../../api/fetchData";
import { useEffect, useState } from "react";
import { formatDate } from "../../api/formatDate";
import CreateInvoiceModal from "./CreateInvoiceModal";
// import { useAppointmentsInfoStore } from "../../../store";


const ChargesOnInvoice = ({ admissionsInfo , reload }) => {
  const [isOpen ,setIsOpen]= useState(false)
  const [chargeList, setChargeList] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/charges`;
 
  useEffect(() => {
    getCharges();
  }, [reload]);

  const getCharges = async () => {
    try {
      const chargeList = await getDniData(url, admissionsInfo.id);
      setChargeList(chargeList);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(chargeList)

  const deleteChargeHandler = async (id) => {
    const deleteChargeById = await deleteById(url, id);
    getCharges();
    console.log(deleteChargeById);
  };

  

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
   
        <h2 className="mb-4 text-lg font-semibold leading-tight ">
         {chargeList ? " Outstanding Charges": "The List is Temporarily Empty"}
        </h2>
         <h2>Charges for patient {admissionsInfo.patient} Admissions ID:{admissionsInfo.id}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className=" text-sm bg-zinc-200">
                <th className="p-3  border-x border-y">Date</th>
                <th className="p-3  border-x border-y">Doctor</th>
                <th className="p-3 border-x border-y">Id</th>
                <th className="p-3  border-x border-y">Service</th>
                <th className="p-3  border-x border-y">Quantity</th>
                <th className="p-3  border-x border-y">Price</th>
                <th className="p-3  border-x border-y">Total</th>
                <th className="p-3  border-x border-y">Remove Service</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {chargeList?.data?.data?.map((charge, index) => (
                <tr className="text-sm" key={index}>
                  <td className=" border-x border-y bg-zinc-200 ">
                    <p>{ formatDate(charge.date_created)}</p>
                  </td>
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
                  <td className="px-3 py-2 border-x border-y bg-zinc-200">
                    <p>{charge.total}</p>
                  </td>
                  <td className="px-3 py-2 flex justify-center align-middle border-x border-y ">
                    <button
                      type="button"
                      className="h-6 ml-2 mt-4 bg-amber-400 hover:bg-amber-600 text-gray-100 px-2  rounded transition duration-150 text-xs"
                      onClick={() => deleteChargeHandler(charge.charge_id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    <div>
     
      {chargeList?.data?.data?.length > 0 && 
        <div>
       <span className="text-md mt-2 flex justify-end">
          Total Charges: {chargeList.data.total[0].total_sum}
        </span>
        <button
          type="button"
          className="py-2 bg-purple-400 hover:bg-purple-600 text-gray-100 px-2  rounded transition duration-150 text-xs"
          onClick={()=>setIsOpen(true)}
        >
          Create Invoice
        </button>
       </div>}
      
    </div>
      <CreateInvoiceModal admissionsInfo={ admissionsInfo} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default ChargesOnInvoice;
