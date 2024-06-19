import { useEffect, useState } from "react";
import User from "./../assets/user.png";
import {
  getItemFromLocalStorage, removeItemFromLocalStorage,
} from "../api/localStorage";
import { useNavigate, useLocation } from "react-router-dom";



function Header() {
  const navigate= useNavigate();
  const [username, setUserName] = useState("NOT LOGGED IN");
  const [logoutButton, setLogoutButton]= useState(false);
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
    <div className="h-12 ">
      <div className="flex gap-2 justify-end ">
        <img src={User} className="w-6 h-6 z-50 "/>
        <div className="flex  flex-col  ">
             <span className="text-xs z-50 font-normal leading-none mt-1 ">User: {username}</span>
             {logoutButton &&
             <button  className="z-50 w-full  hover:bg-stone-100 hover:text-md hover:transition ease-in-out delay-100 text-xs font-medium py-1 rounded-lg focus:outline-none underline"
             onClick={()=>handleLogout()}
             >Log Out
             </button>}
        </div>
       
      </div>
    </div>
  );
}

export default Header;
