import { useState, useEffect }from 'react'
import { getItemFromLocalStorage } from '../../api/localStorage';
import Unauthorized from '../homePage/Unauthorized';
import DoctorDashBoard from './DoctorDashBoard';


const Gateway = () => {

    const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authData = getItemFromLocalStorage();
    if (authData && authData.user.partner_type === 'isDoctor') {
      setIsAuthorized(true);
    }
  }, []);
  
  return isAuthorized ? (
    <div>
      <DoctorDashBoard/>
    </div>
  ) : (
    <Unauthorized />
  );
};



export default Gateway