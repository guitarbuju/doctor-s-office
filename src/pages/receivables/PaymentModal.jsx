import { Dialog } from "@headlessui/react";
import CreditCardFormData from "./CreditCardFormData";


function PaymentModal({
  isOpen,
  setIsOpen,
  clickHandler,
  setPayment,
  payment,
  clickedAdmissionId,
  outputMessage,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full h-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  flex-col">
          <p className=" flex justify-center align-middle  text-xl font-medium text-gray-600  ">
            {outputMessage && outputMessage}
          </p>
          <div className="-mt-8">
           <CreditCardFormData
        clickHandler={clickHandler}      
        setPayment={setPayment}
        payment= {payment}
        setIsOpen={setIsOpen}
        clickedAdmissionId={ clickedAdmissionId}
       
           />
          </div>
          
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default PaymentModal;
