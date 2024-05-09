

const CreditCardFormData = ({ setIsOpen, clickHandler, payment, setPayment , clickedAdmissionId}) => {
   
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setPayment({ ...payment, [name]: value });
    };
    console.log(clickedAdmissionId);
  
    return (
      <div className="w-full max-w-lg mx-auto p-4 -mt-2">
      
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-medium ">Payment Information</h2>
          <form>
          <div>
            
          </div>
            <div className="flex flex-col justify-center mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your Credit Card
              </label>
              <select
                name="card_issuer"
                value={payment.card_issuer}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="Visa">Visa</option>
                <option value="Master Card">master Card</option>
                <option value="American Express">American Express</option>
                <option value="Diners Club">Diners Club</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-4 sm:col-span-4">
                {/* <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                  Payment
                </label>
                <input
                  type="number"
                  name="payment"
                  value={payment.payment}
                  onChange={handleChange}
                  id="payment"
                  placeholder="0.00"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                /> */}
                <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                  Card Holder
                </label>
                <input
                  type="text"
                  name="card_holder"
                  value={payment.card_holder}
                  onChange={handleChange}
                  id="card-holder"
                  placeholder="Full Name"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="card_number"
                  value={payment.card_number}
                  onChange={handleChange}
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expiration_date"
                  value={payment.expiration_date}
                  onChange={handleChange}
                  id="expiration-date"
                  placeholder="MM / YY"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2 -mt-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={payment.cvv}
                  onChange={handleChange}
                  id="cvv"
                  placeholder="000"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-2 -mt-1">
                  Payment
                </label>
                <input
                  type="number"
                  name="payment"
                  value={payment.payment}
                  onChange={handleChange}
                  id="payment"
                  placeholder="0.00"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="w-full bg-amber-400 hover:bg-amber-600 text-white font-medium py-3 rounded-lg focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="w-full bg-purple-400 hover:bg-purple-600 text-white font-medium py-3 rounded-lg focus:outline-none"
                onClick = {()=>clickHandler(clickedAdmissionId)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default CreditCardFormData;
  