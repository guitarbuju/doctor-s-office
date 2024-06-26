import { useState } from "react";
import { getDniData } from "../../api/fetchData";
import { useForm } from "react-hook-form";
import PaymentDataGrid from "./PaymentDataGrid";
import { useInvoiceIdStore } from "../../../store";

const CreditCardVoucher= () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/payments/data`;
  const { register, handleSubmit, reset } = useForm();
  const [foundPatient, setFoundPatient] = useState(null);
  const selectedInvoice = useInvoiceIdStore((state)=> state.invoiceId);
   console.log(selectedInvoice);

  const onSubmit = async (data) => {
    
      const foundPatientByDni = await getDniData(url, data.dni);
      setFoundPatient(foundPatientByDni);
      reset();
    
  };
console.log(foundPatient);


  return (
    <div className="py-6 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row"
      >
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-none text-gray-900">
            Search Invoices for Payments
          </h1>
          <p className=" justify-start gap-2 text-lg  leading-none text-gray-900">
            Please fill up patients DNI for search
          </p>
          <div className="flex flex-col justify-start gap-2 text-lg  leading-none text-gray-900">
        <span>Patient:  {foundPatient?.data?.data[0].patient_full_name.toUpperCase()} </span> 
        <span>Dni:  {foundPatient?.data?.data[0].dni}</span>
          </div>
        </div>
        <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
          {!foundPatient && (
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="DNI Number"
                className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
                {...register("dni", { required: true, maxLength: 12 })}
                onFocus={() => reset()}
              />
              <button
                type="submit"
                className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 text-gray-100 bg-yellow-400"
              >
                Search
              </button>
            </div>
          )}
        </div>
      </form>
      <PaymentDataGrid foundPatient={ foundPatient }/>
    </div>
  );
};

export default CreditCardVoucher;
