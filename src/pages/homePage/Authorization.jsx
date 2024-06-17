import { useEffect, useState } from "react";
import Unauthorized from "./Unauthorized";
import Welcome from "./Welcome";
import { getItemFromLocalStorage } from "../../api/localStorage";

const State = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authToken = getItemFromLocalStorage("authData");
    console.log(authToken);
    authToken && setIsAuthorized(true);
  }, []);
  console.log(isAuthorized);

  return isAuthorized ? (
    <div>
      <Welcome />
    </div>
  ) : (
    <Unauthorized />
  );
};

export default State;
