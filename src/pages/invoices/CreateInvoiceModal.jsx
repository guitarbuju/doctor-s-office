import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { postPersonDni } from "../../api/fetchData";
import { useNavigate } from "react-router-dom";

function CreateInvoiceModal({ isOpen, setIsOpen, admissionsInfo }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showButton, setShowButton] = useState (true);
  const [response, setResponse] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const invoiceUrl = `${BASE_URL}/invoices`;
  const navigate = useNavigate();

  const generateInvoice = async () => {
    try {
      setShowButton(false);
      setShowSpinner(true);
      const sendIdtoApi = await postPersonDni(invoiceUrl, admissionsInfo.id);
      setResponse(sendIdtoApi);
      setTimeout(() => {
        setShowSpinner(false);
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  };

  console.log(response);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-52">
          <Dialog.Title className="mt-8">
           {showButton ? <span>Are You sure you want to create this Invoice? </span>: ''}
          </Dialog.Title>

          <Dialog.Description className="flex justify-center align-middle">
            {showSpinner ? (
              <span className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-medBlue"></span>
            ) : (
              <span>{response.message}</span>
            )}
            {!showSpinner && response.data && response.data.length > 0 && (
              <span className="text-lg font-semibold ml-2">
                number: {response.data[0].invoice_id}
              </span>
            )}
          </Dialog.Description>
         
          <div className="flex gap-2">
             {showButton ? <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
              onClick={() => generateInvoice()}
            >
              Generate Invoice
            </button> :''}
            {!showButton?
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
              onClick={() => {
                setIsOpen(false);
                navigate("/admissions");
              }}
            >
              Close
            </button>
           :'' }
            
          </div>
         
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default CreateInvoiceModal;
