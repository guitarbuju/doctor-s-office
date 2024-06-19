import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../api/localStorage";
import { useNavigate } from "react-router";

const Welcome = () => {
  const [retrievedItem, setRetrievedItem] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const authData = getItemFromLocalStorage();
    setRetrievedItem(authData);
  }, []);

  const handleLogout = () => {
    removeItemFromLocalStorage();
    setRetrievedItem(null); // Clear the retrieved item from the state
    navigate("/");
  };

  return (
    <div>
      <div className="custom-shape-divider-top-1717498057">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <section className="bg-zinc-50">
        <div className="container flex flex-col justify-center  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src="https://www.pngall.com/wp-content/uploads/2018/05/Doctor-PNG-Images.png"
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-[700px] z-10"
            />
          </div>
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            {retrievedItem ? (
              <p className="ml-2 text-medBlue text-2xl">
                Welcome back {retrievedItem.user.username}!!!!
              </p>
            ) : (
              <p>Please Log in</p>
            )}
            <h1 className="text-10xl font-bold leading-none sm:text-6xl text-medBlue">
              EASYMED
              <span className="ml-2 text-black">Patient Management System</span>
            </h1>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center  sm:space-y-0 sm:space-x-4  gap-2 mt-4">
              <div className="flex justify-center align-middle gap-2">
                <Link
                  to="/patients"
                  className="px-8 py-3 text-lg font-semibold rounded border  dark:bg-violet-600 dark:text-gray-50"
                >
                  Create Patient
                </Link>
                <Link
                  to="/patients/dni"
                  className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800"
                >
                  Search Patient
                </Link>
              </div>
              <Link
                to="/administration"
                className=" w-[385px]  text-center px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800"
              >
                Administration
              </Link>
              <button
                className=" w-[385px]  text-center px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800"
                onClick={() => handleLogout()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
