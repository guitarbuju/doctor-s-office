
import { useState } from "react";
import { postPersonData } from "../../api/fetchData";

const DiscountDataGrid = ({ foundPatient }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/discounts/vouchers`;

  const [discount, setDiscount] = useState("");

  const inputChangeHandler = (e, admissionId) => {
    setDiscount(e.target.value);
  };

  const clickHandler = async (admissionId) => {
    const dataToApi = {
      discount: discount,
      admission_id: admissionId,
    };

    console.log(dataToApi);
    const dataPost = await postPersonData(url, dataToApi);
     console.log(dataPost);
  };

  return (
    <div className="bg-zinc-50">
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-900">
          Found Admissions for Patient
        </h2>
        <div className="overflow-x-auto">
          {foundPatient?.status !== 200 ? (
            <p>{foundPatient?.response?.data?.message}</p>
          ) : (
            <table className="w-full text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="text-sm bg-zinc-200">
                  <th className="p-3 border-x border-y w-10">Full Name</th>
                  <th className="p-2 border-x border-y w-10">DNI</th>
                  <th className="p-2 border-x border-y w-10">Admission Id</th>
                  <th className="p-2 border-x border-y w-10">Invoice Id</th>
                  <th className="p-3 border-x border-y w-8">Total</th>
                  <th className="p-3 border-x border-y w-8">Discount</th>
                  <th className="p-3 border-x border-y w-8">Submit</th>
                </tr>
              </thead>
              <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                {foundPatient?.data?.data?.map((admission, admission_id) => (
                  <tr className="text-sm" key={admission_id}>
                    <td className="px-3 py-2">
                      <p>{admission.patient_full_name}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{admission.dni}</p>
                    </td>
                    <td className="px-1 py-2">
                      <p>{admission.admission_id}</p>
                    </td>
                    <td className="px-1 py-2">
                      <p>{admission.invoice_id}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{admission.invoice_total}</p>
                    </td>
                    <td className="px-3 py-2 hidden">
                      <input
                        className="border rounded-md py-1 w-20"
                        placeholder="--"
                        onChange={(e) =>
                          inputChangeHandler(e, admission.admission_id)
                        }
                       
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="border rounded-md py-1 w-20"
                        placeholder="--"
                        onChange={(e) => setDiscount(e.target.value)}
                        type="number"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        className="h-6 ml-2 mt-1 bg-medBlue hover:bg-cyan-700 text-gray-100 px-2 rounded transition duration-150 text-xs"
                        onClick={() => clickHandler(admission.admission_id)}
                      >
                        Get Discount
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountDataGrid;
