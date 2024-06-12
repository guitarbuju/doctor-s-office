import { useEffect, useState } from "react";
import { getDateData, postPersonDni } from "../../api/fetchData";
import { formatDate, monthNames } from "../../api/formatDate";
import { arrangeData } from "../../api/groupedData";
import PDFInvoice from "./pdf/PDFInvoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { styles } from "./pdf/styles.js";
import AnullModal from "./AnullModal.jsx";

const InvoiceList = () => {

// Function to get the start and end dates of the current month
 const now = new Date();
 const currentMonth = monthNames[now.getMonth()+1];


const getCurrentMonthRange = () => {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date()
  return {
    from: formatDate(start),
    to: formatDate(end),
  };
};

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/invoices`;
  const urlAnnull = `${BASE_URL}/invoices/annull`;
  const [fetchedList, setFetchedList] = useState([]);
  const [status, setStatus] = useState("pending");
  const [range, setRange] = useState(getCurrentMonthRange());
  const [getInvoiceId, setGetInvoiceId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  console.log(range)

  useEffect(() => {
    getInvoiceList();
  }, [status,range.to]);
  

  const getInvoiceList = async () => {
    try {
      const responseList = await getDateData(url, status,range.from,range.to);
      if (responseList.data?.data && responseList.data?.data.length > 0) {
        const dataToArrange = arrangeData(responseList.data.data);
        console.log("culo", responseList.data.data);
        setFetchedList(dataToArrange);
      } else {
        setFetchedList([]); // Set fetchedList to an empty array
      }
    } catch (error) {
      console.error(error);
    }
  };

  const annullInvoice = async (id) => {
    console.log(id);
    try {
      const annulledInvoice = await postPersonDni(urlAnnull, id);
      console.log(annulledInvoice.message);
      //  setGetInvoiceId(id);
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
            <h2>Check out invoices by date range and status</h2>
            <p className="text-xs leading-tight ">Shown default values are current&apos;s month <span className="text-lg font-semibold">{currentMonth}</span></p>
            <p className="text-xs leading-tight ">Use date range for custom search </p>
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
            <span className="mt-2">Date Range:</span>
            <div className="flex flex-col text-xs mt-2">
              <div className="mb-2">
                <label htmlFor="from">From:</label>
                <input name="from" type="date" 
                  onChange={(e)=>setRange({...range,from:e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="to">To:</label>
                <input name="to" type="date"
                onChange={(e)=>setRange({...range,to:e.target.value})}
                 />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {fetchedList?.length === 0 ? (
            <h2 className="text-3xl font-semibold leading-tight ">
              No invoices available
            </h2>
          ) : (
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

                    {status === "annulled" ? (
                      <td className="px-3 py-2 flex justify-center align-middle border-x border-y bg-zinc-100">
                        <PDFDownloadLink
                          style={styles.button}
                          document={
                            <PDFInvoice getInvoiceId={invoice.invoice_id} />
                          }
                          fileName="invoice.pdf"
                        >
                          {({ loading }) =>
                            loading ? "Loading document..." : "Download"
                          }
                        </PDFDownloadLink>
                      </td>
                    ) : (
                      <td className="flex flex-col border-x border-y">
                        <PDFDownloadLink
                          document={
                            <PDFInvoice getInvoiceId={invoice.invoice_id} />
                          }
                          fileName="invoice.pdf"
                          style={styles.button}
                        >
                          {({ loading }) =>
                            loading ? "Loading document..." : "Download"
                          }
                        </PDFDownloadLink>
                        <button
                          type="button"
                          className="h-6 ml-2 mt-1 bg-red-400 hover:bg-red-600 text-gray-100 px-2  rounded transition duration-150 text-xs"
                          onClick={() => {
                            setGetInvoiceId(invoice.invoice_id);
                            setIsOpen(true);
                          }}
                        >
                          Anull Invoice
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <AnullModal
          getInvoiceId={getInvoiceId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          annullInvoice={annullInvoice}
        />
      </div>
    </div>
  );
};

export default InvoiceList;
