import { useAppointmentsInfoStore } from "../../../store"

import Tabs from "./components/Tabs";



const MedicalEntry = () => {

    

    const admissionsInfo = useAppointmentsInfoStore(
        (state) => state.appointmentInfo
      );

  return (
    <div>
    <div className="flex flex-col  mt-4 items-start">
        <h1 className="text-xs text-center text-gray-900">Id:{admissionsInfo.id}</h1>
        <h1 className="text-xs text-center text-gray-900">Patient:{admissionsInfo.patient}</h1>
        <h1 className="text-xs text-center text-gray-900">Doctor:{admissionsInfo.doctor}</h1>
    </div>
    <div>
        <Tabs/>
    </div>
        
        
    </div>
  )
}

export default MedicalEntry