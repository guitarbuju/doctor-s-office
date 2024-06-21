import { useEffect, useState } from "react";
import User from "./../assets/user.png";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../api/localStorage";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Home from "./../assets/icons8-home-50.png";

function Header() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("NOT LOGGED IN");
  const [logoutButton, setLogoutButton] = useState(false);
  const location = useLocation();

  const fetchUserData = () => {
    const nameRetrieved = getItemFromLocalStorage();
    if (nameRetrieved && nameRetrieved.user && nameRetrieved.user.username) {
      setUserName(nameRetrieved.user.username);
      setLogoutButton(true);
    } else {
      setUserName("NOT LOGGED IN");
      setLogoutButton(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [location]);

  const handleLogout = () => {
    removeItemFromLocalStorage();
    setUserName(null);
    setLogoutButton(false);
    navigate("/");
  };

  return (
    <div className="h-6 -mt-5 text-gray-900">
      <div className="flex gap-2 justify-between ">
      <h1 className="z-50 font-normal leading-none mt-1 ">
       <span className="text-md font-medium">EASYMED</span> 
        <span className="font-light ml-2 text-xs">Patient Management System</span>
      </h1>
        <div className="flex gap-2 mt-2">
          <Link to="/home">
            <img src={Home} className="w-5 z-50" />
          </Link>
          <img src={User} className="w-5 h-5 z-50 " />
          <div className="flex  justify-around ">
            <span className="text-xs z-50 font-normal leading-none mt-2 ">
              {username}
            </span>
            {logoutButton && (
              <button
                className="z-50 w-20  hover:bg-stone-100 hover:text-md hover:transition ease-in-out delay-100 text-xs font-normal leading-none  py-1 rounded-lg focus:outline-none underline"
                onClick={() => handleLogout()}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
