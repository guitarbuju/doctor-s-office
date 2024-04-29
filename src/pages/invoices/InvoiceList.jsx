import { useEffect, useState } from "react";
import { getDniData, postPersonDni } from "../../api/fetchData";
import { formatDate } from "../../api/formatDate";
import { arrangeData } from "../../api/groupedData";

const InvoiceList = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/invoices`;
  const urlAnnull = `${BASE_URL}/invoices/annull`;
  const [fetchedList, setFetchedList] = useState([]);
  const [status, setStatus] = useState("pending");
  // const [ annulledId, setAnnulledId ] = ('');

  useEffect(() => {
    getInvoiceList();
  }, [status]);

  const getInvoiceList = async () => {
    try {
      const responseList = await getDniData(url, status);
      const dataToArrange = arrangeData(responseList.data);
      setFetchedList(dataToArrange);
    } catch (error) {
      console.error(error);
    }
  };

  const anullInvoice = async (id) => {
    console.log(id);
    try {
      const annulledInvoice = await postPersonDni(urlAnnull, id);
      console.log(annulledInvoice.message);
      getInvoiceList();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(fetchedList);
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-900 ">
        <div className="flex justify-around">
          <div className="flex flex-col mb-4 ">
            <h1 className="text-4xl font-semibold leading-tight ">
              List of Invoices
            </h1>
            <h2>Check out invoices by status</h2>
          </div>

          <div className="flex flex-col text-sm mb-4">
            <label htmlFor="statusInput">Status:</label>
            <select
              name="statusInput"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="annulled">Anulled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className=" text-sm bg-zinc-200">
                <th className="p-3  border-x border-y">Invoice Number</th>
                <th className="p-3  border-x border-y">Date</th>
                <th className="p-3  border-x border-y">Admission Id</th>
                <th className="p-3  border-x border-y">Doctor</th>
                <th className="p-3  border-x border-y">Patient</th>
                <th className="p-3  border-x border-y">Total</th>
                <th className="p-3  border-x border-y">Status</th>
                <th className="p-3  border-x border-y">Action</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {fetchedList?.map((invoice, index) => (
                <tr className="text-sm" key={index}>
                  <td className=" border-x border-y bg-zinc-200 ">
                    <p>{invoice.invoice_id}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{formatDate(invoice.invoice_date)}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200 ">
                    <span>{invoice.admission_id}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200 ">
                    <span>{invoice.doctor_full_name}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200">
                    <p>{invoice.patient_full_name}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{invoice.invoice_total}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200">
                    <p>{invoice.status}</p>
                  </td>

                  {status != "annulled" ? (
                    <td className="px-3 py-2 flex justify-center align-middle border-x border-y bg-zinc-100">
                      <button
                        type="button"
                        className="h-6 ml-2 mt-4 bg-amber-400 hover:bg-amber-600 text-gray-100 px-2  rounded transition duration-150 text-xs"
                        onClick={() => anullInvoice(invoice.invoice_id)}
                      >
                        Anull Invoice
                      </button>
                    </td>
                  ) : (
                    <span className="flex justify-center semibold">--</span>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default InvoiceList;
