import { useState } from "react";
import { postPersonData } from "../../api/fetchData";
import PaymentModal from "./PaymentModal";
import { formatDate } from "../../api/formatDate";

const PaymentDataGrid = ({ foundPatient }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/payments/vouchers`;

  const [payment, setPayment] = useState({
    payment: "",
    card_holder: "",
    card_number: "",
    cvv: "",
    expiration_date: "",
    card_issuer: "Visa",
  });
  const [hiddenRows, setHiddenRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedAdmissionId, setClickedAdmissionId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [outputMessage, setOutputMessage] = useState("");

  const clickHandler = async (admissionId) => {
    const validPayment = parseFloat(payment.payment);
    if (validPayment > balance || validPayment <= 0) {
      setOutputMessage(
        "The payment amount cannot be superior to the outstanding balance nor 0 or negative value"
      );
      return;
    }

    const dataToApi = {
      payment: validPayment,
      admission_id: admissionId,
      card_holder: payment.card_holder,
      card_number: payment.card_number,
      cvv: payment.cvv,
      expiration_date: payment.expiration_date,
      card_issuer: payment.card_issuer,
    };

    const dataPost = await postPersonData(url, dataToApi);

    if (dataPost.response?.data?.error) {
      setOutputMessage(dataPost.response.data.error);
    } else {
      setOutputMessage(dataPost.message);
      setHiddenRows([...hiddenRows, admissionId]);
    }
  };

  console.log(outputMessage);

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
                  <th className="p-3 border-x border-y w-8">Pay</th>
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
                    <td className="px-3 py-2 font-semibold  bg-zinc-50">
                      <p>
                        {admission.net_amount === null
                          ? "$0.00"
                          : admission.net_amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD", // You can change the currency as needed
                            })}
                      </p>
                    </td>

                    <td className="px-3 py-2  bg-zinc-50">
                      {admission.net_amount !== 0 ? (
                        <button
                          type="button"
                          className="h-6 ml-2 mt-1 bg-amber-400 hover:bg-amber-600 text-gray-100 px-2 rounded transition duration-150 text-xs"
                          onClick={() => {
                            setIsOpen(true);
                            setClickedAdmissionId(admission.admission_id);
                            setBalance(admission.net_amount);
                          }}
                        >
                          Pay this bill
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
      <PaymentModal
        clickHandler={clickHandler}
        setPayment={setPayment}
        payment={payment}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        clickedAdmissionId={clickedAdmissionId}
        outputMessage={outputMessage}
      />
    </div>
  );
};

export default PaymentDataGrid;
