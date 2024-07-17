import { useAppointmentsInfoStore } from "../../../store";
import ChartViewer from "./components/ChartViewer";
import Tabs from "./components/Tabs";

const MedicalEntry = () => {
  const admissionsInfo = useAppointmentsInfoStore(
    (state) => state.appointmentInfo
  );

 

const admissionId= admissionsInfo.id;
console.log(admissionsInfo);

  return (
    <div>
      <div className="flex flex-col  mt-4 items-start">
        <h1 className="text-xs text-center text-gray-900">
          Id:{admissionId}
        </h1>
        <h1 className="text-xs text-center text-gray-900">
          Patient:{admissionsInfo.patient}
        </h1>
        <h1 className="text-xs text-center text-gray-900">
          Doctor:{admissionsInfo.doctor}
        </h1>
      </div>
    
      <div>
       { !admissionsInfo.completed ? <Tabs />:<ChartViewer/>}
      </div>
    </div>
  );
};

export default MedicalEntry;
