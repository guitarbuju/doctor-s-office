import { Dialog } from "@headlessui/react";

function DiscountModal({ isOpen, setIsOpen, clickHandler, admissionId }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-52">
         
            <span className="text-lg font-medium leading-6 text-gray-900">
              You are about to create a discount
            </span>
            <br />
            <div className="flex gap-4">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                onClick={() => clickHandler(admissionId)}
              >
                Get Discount
              </button>
            </div>
          
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default DiscountModal;
