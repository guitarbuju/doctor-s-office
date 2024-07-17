import { getItemFromLocalStorage } from "../../api/localStorage";
import PendingPatients from "./components/PendingPatients";

const DoctorDashBoard = () => {
  const drInHouse = getItemFromLocalStorage();
 
  const userId = drInHouse?.user?.id;


  return (
    <>
      <div>
        <h1 className="text-md text-left text-gray-900">
          Welcome Dr. {drInHouse?.user?.username}
        </h1>
        <PendingPatients userId={ userId } />
      </div>
    </>
  );
};

export default DoctorDashBoard;
