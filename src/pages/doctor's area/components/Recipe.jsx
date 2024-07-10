import React from 'react'

const Recipe = () => {
  return (

      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
   
        <h2 className="mb-4 text-lg font-semibold leading-tight ">
    
        </h2>
         <h2>Charges for patien</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className=" text-sm bg-zinc-200">
                <th className="p-3  border-x border-y">Date</th>
                <th className="p-3  border-x border-y">Doctor</th>
                <th className="p-3 border-x border-y">Id</th>
                <th className="p-3  border-x border-y">Service</th>
                <th className="p-3  border-x border-y">Quantity</th>
                <th className="p-3  border-x border-y">Price</th>
                <th className="p-3  border-x border-y">Total</th>
                <th className="p-3  border-x border-y">Remove Service</th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-300">
           
                <tr className="text-sm" key={index}>
                  <td className=" border-x border-y bg-zinc-200 ">
                   
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                   
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-200 ">
                   
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                   
                  <td className="px-3 py-2 border-x border-y bg-zinc-200">
                    
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    
                  <td className="px-3 py-2 border-x border-y bg-zinc-200">
                   
                  </td>
                  <td className="px-3 py-2 flex justify-center align-middle border-x border-y ">
                    {/* <button
                      type="button"
                      className="h-6 ml-2 mt-4 bg-amber-400 hover:bg-amber-600 text-gray-100 px-2  rounded transition duration-150 text-xs"
                      onClick={() => deleteChargeHandler(charge.charge_id)}
                    >
                      Remove
                    </button> */}
                  </td>
                </tr>
             
            </tbody>
          </table>
        </div>
      </div>

  
  )
}

export default Recipe