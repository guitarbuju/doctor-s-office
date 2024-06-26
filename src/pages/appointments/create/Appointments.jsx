import { useState, useEffect } from "react";
import { fetchAllPeopleData, postPersonData } from "../../../api/fetchData";
import { usePatientsInfoStore } from "../../../../store";
import { Link } from "react-router-dom";

const Appointments = () => {
  //State variables
  const [doctorsList, setDoctorsList] = useState([]);
  const patientsInfo = usePatientsInfoStore((state) => state.patientInfo);
  const clearPatientInfo = usePatientsInfoStore(
    (state) => state.clearPatientInfo
  );
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentdate] = useState("");
  const [postToApiResult, setPostToaApiResult] = useState({});
  const [isButtonGroupVisible, setIsButtonGroupVisible] = useState(true);

  const drUrl = `${import.meta.env.VITE_BASE_URL}/doctors`;

  const getAllDoctors = async () => {
    try {
      const allDoctors = await fetchAllPeopleData(drUrl);
      console.log(allDoctors);
      setDoctorsList(allDoctors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const url = `${import.meta.env.VITE_BASE_URL}/appointments`;

  console.log(patientsInfo);
 
  // Fn to post appoinment data to server
  const handleSubmit = async (e) => {

   e.preventDefault()

    
      const postData = {
        patient_dni: patientsInfo.dni,
        doctor_dni: selectedDoctor,
        appointment_date: appointmentDate,
        completed: false,
      };
      console.log(postData);

      try {
        const postToApi = await postPersonData(url, postData);
        console.log(postToApi);
        setPostToaApiResult(postToApi);
        setIsButtonGroupVisible(false);
      } catch (error) {
        console.error(error);
      }
    
  };
  useEffect(() => {
    return () => {
      clearPatientInfo();
    };
  }, []);

  return (
    <>
      <section className="py-6 text-gray-900">
        <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
          <div className="flex flex-col justify-center lg:text-left">
            <p className="mb-1 text-sm font-medium tracking-widest uppercase">
              {isButtonGroupVisible
                ? "Create an Appoinment for:"
                : "Appointment created "}
              <span className="text-lg underline">
                {patientsInfo.name} {patientsInfo.lastName}
              </span>{" "}
            </p>
            <h1 className="text-5xl font-bold leading-none ">
              {isButtonGroupVisible ? (
                "Enter your Dr's. info and date for your visit"
              ) : (
                <span>Thank you {patientsInfo.name}...</span>
              )}
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end"
          >
            {isButtonGroupVisible ? (
              <div className="flex flex-col gap-2 ">
                <input
                  type="date"
                  className="inline-flex items-center px-5 py-3 rounded-lg"
                  onChange={(e) => setAppointmentdate(e.target.value)}
                  required
                />
                <input
                  type="text"
                  list="drList"
                  className="inline-flex items-center px-5 py-3 rounded-lg"
                  placeholder="Input Dr. Name"
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                  
                  }}
                  required
                />
                <datalist id="drList" name="drList">
                  {doctorsList?.data?.map((doctor) => (
                    <option
                      key={doctor.doctor_dni}
                      value={doctor.doctor_dni }
                    >
                      {doctor.full_name.toUpperCase()}
                    </option>
                  ))}
                </datalist>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-2 ">
              {isButtonGroupVisible ? (
                <div className="flex flex-col gap-2 ">
                  <button
                    type="submit"
                    className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
                  >
                    Create{" "}
                  </button>
                  <button className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center">
                    Reset
                  </button>
                </div>
              ) : (
                ""
              )}
              <Link
                to="/home"
                className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
              >
                Home
              </Link>
              <Link
                to="/appointments/list"
                className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
              >
                Appointments
              </Link>
            </div>
          </form>
        </div>{" "}
        <p className="mb-1 text-sm   text-gray-900">
          {postToApiResult.message}
        </p>
      </section>
    </>
  );
};

export default Appointments;
