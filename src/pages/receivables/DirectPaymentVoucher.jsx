import { useEffect, useState } from "react";
import { getDniData } from "../../api/fetchData";
import PaymentDataGrid from "./PaymentDataGrid";
import { useInvoiceIdStore } from "../../../store";
import DiscountDataGrid from "./DiscountDataGrid";

const DirectPaymentVoucher= () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/payments/direct`;
  const [foundPatient, setFoundPatient] = useState(null);
  const selectedInvoice = useInvoiceIdStore((state)=> state.invoiceId);
   console.log(selectedInvoice);

   useEffect(() => {
    const fetchInvoiceForPayment = async () => {
      try {
        const getInvoiceForPayment = await getDniData(url, selectedInvoice);
       setFoundPatient(getInvoiceForPayment);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchInvoiceForPayment();
    
  }, [url, selectedInvoice]);

  console.log(foundPatient);
  return (
    <div className="py-6 ">
     
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-none text-gray-900">
          Invoice Payment Details
          </h1>
          <p className=" justify-start gap-2 text-lg  leading-none text-gray-900">
           Invoice Balance Due
          </p>
          <div className="flex flex-col justify-start gap-2 text-lg  leading-none text-gray-900">
        <span>Patient:  { foundPatient?.data?.data[0].patient_full_name.toUpperCase()} </span> 
        <span>Dni:  { foundPatient?.data?.data[0].dni}</span>
          </div>
        </div>
        <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
          
        </div>
     
      <PaymentDataGrid foundPatient={ foundPatient }/>
      <DiscountDataGrid foundPatient={ foundPatient }/>
    </div>
  );
};

export default DirectPaymentVoucher;
