import { useState } from "react";
import { postPersonData } from "../../api/fetchData";
import DiscountModal from "./DiscountModal";
import { formatDate } from "../../api/formatDate";

const DiscountDataGrid = ({ foundPatient }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/discounts/vouchers`;

  const [discount, setDiscount] = useState("");
  const [hiddenRows, setHiddenRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedAdmissionId, setClickedAdmissionId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const inputChangeHandler = (e) => {
    setDiscount(e.target.value);
  };

  const clickHandler = async (admissionId, netAmount) => {
    console.log("discount:", discount, "netAmount:", netAmount);

    const validDiscount = parseFloat(discount);
    if (discount > balance || discount <= 0) {
      setErrorMessage(
        "The discount amount cannot exceed the outstanding balance or be zero or negative."
      );
      return;
    }

    const dataToApi = {
      discount: validDiscount,
      admission_id: admissionId,
    };

    console.log(dataToApi);
    const dataPost = await postPersonData(url, dataToApi);
    setHiddenRows([...hiddenRows, admissionId]);
    console.log(dataPost);
    setIsOpen(false);
  };

  return (
    <div className="bg-zinc-50">
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-900">
          Found Admissions for Patients
        </h2>
        <div className="overflow-x-auto">
          {foundPatient?.status !== 200 ? (
            <p>{foundPatient?.response?.data?.message}</p>
          ) : (
            <table className="w-full text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="text-sm bg-zinc-200">
                  <th className="p-2 border-x border-y w-10">Admission Id</th>
                  <th className="p-2 border-x border-y w-10">Invoice Id</th>
                  <th className="p-2 border-x border-y w-10">Invoice Date</th>
                  <th className="p-3 border-x border-y w-8">Invoice Total</th>
                  <th className="p-3 border-x border-y w-8">Payments Total</th>
                  <th className="p-3 border-x border-y w-8">Discounts Total</th>
                  <th className="p-3 border-x border-y w-8">Balance</th>
                  <th className="p-3 border-x border-y w-8">Discount</th>
                  <th className="p-3 border-x border-y w-8">Submit</th>
                </tr>
              </thead>
              <tbody className="border-b bg-zinc-200">
                {foundPatient?.data?.data?.map((admission, admission_id) => (
                  <tr
                    className={
                      hiddenRows.includes(admission.admission_id)
                        ? "hidden"
                        : "text-sm"
                    }
                    key={admission_id}
                  >
                    
                    <td className="px-1 py-2">
                      <p>{admission.admission_id}</p>
                    </td>
                    <td className="px-1 py-2">
                      <p>{admission.invoice_id}</p>
                    </td>
                    <td className="px-1 py-2">
                      <p>{formatDate(admission.invoice_date)}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>
                        {admission.invoice_total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD", // You can change the currency as needed
                        })}
                      </p>
                    </td>
                    <td className="px-3 py-2">
                      <p>
                        {admission.total_payments.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD", // You can change the currency as needed
                        })}
                      </p>
                    </td>
                    <td className="px-3 py-2 ">
                      <p>
                        {admission.total_discounts.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD", // You can change the currency as needed
                        })}
                      </p>
                    </td>
                    <td className="px-3 py-2 font-bold  bg-zinc-50">
                      <p>
                        {admission.net_amount === null
                          ? "$0.00"
                          : admission.net_amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD", // You can change the currency as needed
                            })}
                      </p>
                    </td>
                    <td className="px-3 py-2 hidden">
                      <input
                        className="border rounded-md py-1 w-20"
                        placeholder="--"
                        onChange={(e) => inputChangeHandler(e)}
                      />
                    </td>
                    <td className="px-3 py-2  bg-zinc-50">
                      {admission.net_amount !== 0 ? (
                        <input
                          min="0"
                          className="border rounded-md py-1 w-20"
                          placeholder="--"
                          type="number"
                          onChange={(e) => {
                            setDiscount(e.target.value);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-3 py-2  bg-zinc-50">
                      {admission.net_amount !== 0 ? (
                        <button
                          type="button"
                          className="h-6 ml-2 mt-1 bg-medBlue hover:bg-cyan-700 text-gray-100 px-2 rounded transition duration-150 text-xs"
                          onClick={() => {
                            setIsOpen(true);
                            setClickedAdmissionId(admission.admission_id);
                            setBalance(admission.net_amount);
                          }}
                        >
                          Get Discount
                        </button>
                      ) : (
                        <span>Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <DiscountModal
        clickHandler={clickHandler}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        admissionId={clickedAdmissionId}
        netAmount={balance}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default DiscountDataGrid;
