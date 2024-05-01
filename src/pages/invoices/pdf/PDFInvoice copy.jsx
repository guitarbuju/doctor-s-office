import { useState, useEffect } from "react";
import { getDniData } from "../../../api/fetchData";
import { arrangeData } from "../../../api/groupedData.js";
import { formatDate } from "../../../api/formatDate.js";

const PDFInvoice = ({ getInvoiceId }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/invoices/getOne`;
  const [selectedInvoice, setSelectedInvoice] = useState([]);

  const getOneInvoice = async () => {
    const response = await getDniData(url, getInvoiceId);
    const dataToArrange = arrangeData(response.data);
    console.log(dataToArrange);
    setSelectedInvoice(dataToArrange);
  };

  useEffect(() => {
    getOneInvoice();
  }, [getInvoiceId]);

  console.log(selectedInvoice);
  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-900">
      <div>
        <h1 className="text-4xl font-semibold leading-tight">
          Medical Services Invoice
        </h1>
        <div className="flex flex-col mt-8 text-left">
          <h2 className="text-xl">
            Patient: {selectedInvoice[0]?.patient_full_name}
          </h2>
          <h2>Invoice Number: {selectedInvoice[0]?.invoice_id}</h2>
          <h2>Invoice Date: {formatDate(selectedInvoice[0]?.invoice_date)}</h2>
          <h2>Doctor: {selectedInvoice[0]?.doctor_full_name}</h2>
          <h2>Admission Id: {selectedInvoice[0]?.admission_id}</h2>
        </div>
        <h2 className="text-2xl font-semibold leading-tight">Invoice Items</h2>
        <div className="overflow-x-auto mt-8">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="text-sm bg-zinc-200">
                <th className="p-3 border-x border-y">Charge Date</th>
                <th className="p-3 border-x border-y">Charge Title</th>
                <th className="p-3 border-x border-y">Price</th>
                <th className="p-3 border-x border-y">Units</th>
                <th className="p-3 border-x border-y">Total</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
              {selectedInvoice[0]?.charges.map((charge, index) => (
                <tr className="text-sm" key={index}>
                  
                  <td className="p-3 border-x border-y bg-zinc-100">
                    <p>{formatDate(charge.charge_date)}</p>
                  </td>
                  <td className="p-3 border-x border-y bg-zinc-200">
                    <span>{charge.title}</span>
                  </td>
                  <td className="p-3 border-x border-y bg-zinc-200">
                    <span>{charge.price}</span>
                  </td>
                  <td className="p-3 border-x border-y bg-zinc-200">
                    <span>{charge.amount}</span>
                  </td>
                  <td className="p-3 border-x border-y bg-zinc-200">
                    <span>{charge.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-xl font-semibold leading-tight mt-4 text-right">Total: {selectedInvoice[0]?.invoice_total}</h2>
        </div>
      </div>
    </div>
  );
};

export default PDFInvoice;
