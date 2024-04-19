
import { Dialog } from '@headlessui/react'

function ServiceModal({isOpen, setIsOpen, message}) {
  console.log(message)

 

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-52">
          <Dialog.Title className='mt-8'>
             <p>{message.message}</p>
            <span className='text-2xl'>{message.data?.title}</span> <br/>
            <span > Available right now at {message.data?.price}</span> 
          </Dialog.Title>
         <br />
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
             onClick={()=>setIsOpen(false)}
            >
              Close
            </button>
         
        </Dialog.Panel>
      </div>
    </Dialog>
  )
  }
  export default ServiceModal