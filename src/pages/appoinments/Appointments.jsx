import { useState, useEffect } from "react";
import InputSelector from "../doctors/InputSelector";
import { postPersonData } from "../../api/fetchData";
import { usePatientsInfoStore } from "../../../store";
import { Link } from "react-router-dom";


const Appointments = () => {

  //State variables
  const patientsInfo = usePatientsInfoStore((state) => state.patientInfo);
  const clearPatientInfo = usePatientsInfoStore((state) => state.clearPatientInfo);
  const [ selectedDoctor, setSelectedDoctor ] = useState("");
  const [ appointmentDate, setAppointmentdate ] = useState("");
  const [ postToApiResult, setPostToaApiResult ] = useState({});
  const [ isButtonGroupVisible, setIsButtonGroupVisible ]= useState(true)

  //Prop fn to get doctor selection from child component
  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };
  // const url = `${import.meta.env.VITE_BASE_URL}/appointments`;

  const url = "http://localhost:3500/appointments";

  console.log(patientsInfo);

// Fn to post appoinment data to server
  const handlePost = async () => {
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
    <section className="py-6 bg-medBlue">
      <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
        <div className="flex flex-col justify-center lg:text-left">
          <p className="mb-1 text-sm font-medium tracking-widest uppercase text-gray-100">
            {isButtonGroupVisible ? 'Create an Appoinment for:': 'Appointment created '}
            <span className="text-lg underline">
              {patientsInfo.name} {patientsInfo.lastName}
            </span>{" "}
          </p>
          <h1 className="text-5xl font-bold leading-none text-gray-100">
            {isButtonGroupVisible ? "Enter your Dr's. info and date for your visit":<span>Thank you {patientsInfo.name}...</span>}
          </h1>
        </div>
        
          <div className="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
         {isButtonGroupVisible ?
         <div className="flex flex-col gap-2 ">
            <input
              type="date"
              className="inline-flex items-center px-5 py-3 rounded-lg"
              onChange={(e) => setAppointmentdate(e.target.value)}
            />
            <InputSelector onDoctorSelect={handleDoctorSelection} />
          </div>
          :''}
          <div className="flex flex-col gap-2 ">
          {
            isButtonGroupVisible ?
            
          <div className="flex flex-col gap-2 ">
            <button
              onClick={handlePost}
              className="px-8 py-3 font-semibold rounded-md bg-red-400"
            >
              Create{" "}
            </button>
            <button className="px-8 py-3 font-semibold rounded-md bg-amber-400">
              Reset
            </button>
          </div>
         
            : ''}
            <Link 
            to='/'
            className="px-8 py-3 font-semibold rounded-md bg-transparent border-2 border-white">
              Home
            </Link>
            
          </div>
        </div>
      </div>{" "}
      <p className="mb-1 text-sm   text-gray-100">
        {postToApiResult.message}
      </p>
    </section>
   
    </>
  );
};

export default Appointments;
