import { useAppointmentsInfoStore } from "../../../store";
import ChargesOnInvoice from "./ChargesOnInvoice";


const InvoiceCharter = () => {
    const admissionsInfo = useAppointmentsInfoStore(
        (state) => state.appointmentInfo
      );

  return (
    <div>
    <section className="py-6 bg-medBlue flex justify-around">
    <img className="w-64 ml-4"
    src='https://www.nydailynews.com/wp-content/uploads/migration/2019/10/01/KSUUGG4TLJBQBFOTCWAJ2TVYAY.jpg?w=535'/>
        <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
          <div className="flex flex-col space-y-4 text-center lg:text-left">
            <h1 className="text-5xl font-bold leadi text-gray-100">
              Invoice Charter
            </h1>
            <p className="text-lg text-gray-100">
             Create Invoice or Remove Medical Charges for patient {admissionsInfo.patient} on admission entry {admissionsInfo.id}
            </p>
          </div>
          </div>
      </section>
     <ChargesOnInvoice admissionsInfo={ admissionsInfo }/>
      </div>
  )
}

export default InvoiceCharter