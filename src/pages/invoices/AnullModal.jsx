import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

const AnullModal = ({ isOpen, setIsOpen, annullInvoice, getInvoiceId }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let timer;
    if (showSpinner) {
      timer = setTimeout(() => {
        setShowSpinner(false);
        setClicked(true);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [showSpinner]);

  const anullHandler = () => {
    setShowSpinner(true);
    annullInvoice(getInvoiceId);
    setClicked(true);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-52">
        <Dialog.Title className={`mt-8 ${clicked ? 'hidden' : ''}`}>
         
              <div>
                <span>
                  This will annull the current invoice . Are you sure?
                </span>
                <div className=" flex gap-2 justify-center align-middle">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                    onClick={() => anullHandler()}
                  >
                    Yes
                  </button>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
           
          </Dialog.Title>

          <Dialog.Description className="flex justify-center align-middle">
            {showSpinner ? (
              <span className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-medBlue"></span>
            ) : clicked ? (
              <span>Invoice anulled Successfully</span>
            ) : null}
          </Dialog.Description>
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AnullModal;
