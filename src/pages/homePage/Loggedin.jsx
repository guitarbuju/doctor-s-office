import { getItemFromLocalStorage } from "../../api/localStorage";
import Welcome from "./Unauthorized";
import Signin from "./SignIn";
import { useEffect, useState } from "react";

const Loggedin = () => {
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    getItemFromLocalStorage();
    if (userIsLogged && userIsLogged.token) setUserIsLogged(true);
  }, []);

  return userIsLogged ? <Welcome /> : <Signin />;
};

export default Loggedin;
