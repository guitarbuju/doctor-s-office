import { Dialog } from "@headlessui/react";

function DiscountModal({
  isOpen,
  setIsOpen,
  clickHandler,
  admissionId,
  netAmount,
  errorMessage,
  setErrorMessage
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-52 flex-col">
          <span className="text-lg font-medium leading-6 text-gray-900">
            You are about to create a discount
          </span>
        
          <div className="flex flex-col justify-center">
            <div className="flex gap-4">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                onClick={() => {setIsOpen(false); setErrorMessage('')}}
              >
                Close
              </button>
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                onClick={() => clickHandler(admissionId, netAmount)}
              >
                Get Discount
              </button>
            </div>
            <div className="mt-4 text-[#333333]">
              {errorMessage && <span>{errorMessage}</span>}  
            </div>
           
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default DiscountModal;
