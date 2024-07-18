import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getItemFromLocalStorage } from "../../api/localStorage";
import Doctor from "./../../assets/Doctor-PNG-Images.png";
import { getStatusData } from "../../api/fetchData";


const Welcome = () => {
  const [retrievedItem, setRetrievedItem] = useState(null);

  useEffect(() => {
    const authData = getItemFromLocalStorage();
    setRetrievedItem(authData);
  }, []);

  const [pendingAdmissionsList, setPendingAdmissionsList] = useState(null);

  const userId = retrievedItem?.user?.id;

  const url = `${
    import.meta.env.VITE_BASE_URL
  }/admissions/pending/:dni_and_status`;

  const getPendingAdmissionsById = async () => {
    try {
      const getAdmissions = await getStatusData(url, userId, false);
      setPendingAdmissionsList(getAdmissions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getPendingAdmissionsById();
    }
  }, [userId]);

  const pendingPatients=pendingAdmissionsList?.data?.rowCount;

  console.log(pendingAdmissionsList);

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
          <div className="hidden lg:flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={Doctor}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-[700px] z-10"
            />
          </div>
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            {retrievedItem ? (
              <p className="ml-2 text-medBlue text-4xl">
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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-8">
                <Link
                  to="/patients"
                  className="w-60 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
                >
                  Create Patient
                </Link>
                <Link
                  to="/patients/dni"
                  className=" w-60 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
                >
                  Search Patient
                </Link>

                <Link
                  to="/administration"
                  className="w-60 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
                >
                  Back Office
                </Link>
              
                
                  <Link
                    to="/doctorcheckin"
                    className="w-60 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
                  >
                    Doctor&apos;s Area { pendingPatients && <span className="absolute ml-48 -mt-12 text-md w-6 h-6 bg-red-500 text-semibold text-white text-center rounded-full z-50 flex justify-center align-middle ">
                   {pendingAdmissionsList?.data?.rowCount}
                  </span>}
                  </Link>
            
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
