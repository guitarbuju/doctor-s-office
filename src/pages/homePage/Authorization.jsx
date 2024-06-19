import { useEffect, useState } from "react";
import Unauthorized from "./Unauthorized";
import Welcome from "./Welcome";
import { getItemFromLocalStorage } from "../../api/localStorage";

const Authorization = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authData = getItemFromLocalStorage();
    if (authData && authData.token) {
      setIsAuthorized(true);
    }
  }, []);
  
  return isAuthorized ? (
    <div>
      <Welcome />
    </div>
  ) : (
    <Unauthorized />
  );
};

export default Authorization;
