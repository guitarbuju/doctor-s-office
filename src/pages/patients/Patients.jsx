import { useForm } from "react-hook-form";
import { postPersonData } from "../../api/fetchData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePatientsInfoStore } from "../../../store";

const Patients = () => {
  const url = `${import.meta.env.VITE_BASE_URL}/patients`;
  const { register, handleSubmit, reset} = useForm();
  
  //State variables
  const [patientCreated, setPatientCreated] = useState({});
  const storedPatientsInfo = usePatientsInfoStore(
    (state) => state.setPatientInfo
  );
  
//Post data to API
  const onSubmit = async (data) => {
    try {
      const recordPatientToApi = await postPersonData(url,data);
      //record respones
      setPatientCreated(recordPatientToApi);
      
      //load response to state manager context
      const {dni,first_name,last_name }=recordPatientToApi.data[0];

      const patientInfoToStore= {
        dni: dni,
        name: first_name,
        lastName:last_name
      }
    
    storedPatientsInfo(patientInfoToStore)
    


      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (patientCreated) {
      reset();
    }
  }, [patientCreated, reset]);


console.log(patientCreated)
  
return (
    <>
      
      <div className="bg-medBlue">
      <h1 className="text-5xl font-bold leading-none text-gray-100 py-4">
             Patient&apos;s Personal Information
          </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12 font-roboto"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-medBlue">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium text-gray-200 text-lg">Personal Information</p>
              {!patientCreated && <p className="text-xs text-gray-200">
                Please enter patient`s information as requested.
              </p>}
              <div className="text-xs text-gray-200 flex flex-col bg-red-400 rounded-md ">
                <div className="flex gap-2 align-middle justify-center text-xl">
                  <p>{patientCreated.data?.[0]?.first_name}</p>
                  <p>{patientCreated.data?.[0]?.last_name}</p>
                </div>

                <span className="text-lg">{patientCreated.message}</span>
              </div>
              <img src='https://pngimg.com/uploads/doctor/doctor_PNG16003.png'/>
            </div>
            <div className="grid grid-cols-2 gap-2 col-span-full lg:col-span-3">
              <div className="">
                <label htmlFor="first_name" className="text-sm text-gray-200">
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-md p-1  focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...register("first_name",{required:true})}
                />
              </div>
              <div className="">
                <label htmlFor="last_name" className="text-sm text-gray-200">
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...register("last_name",{required:true})}
                />
              </div>
              <div className="-mt-10">
                <label htmlFor="email" className="text-sm text-gray-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...register("email",{required:true})}
                />
              </div>
              <div className="-mt-10">
                <label htmlFor="zip_code" className="text-sm text-gray-200">
                  ZIP / Postal
                </label>
                <input
                  id="zip_code"
                  type="text"
                  placeholder="Zip Code"
                  className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...register("zip_code",{required:true})}
                />
              </div>
              <div className="-mt-10">
                <label htmlFor="phone" className="text-sm text-gray-200">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...register("phone",{required:true})}
                />
              </div>
              <div className="-mt-10">
                <label htmlFor="birth_date" className="text-sm text-gray-200">
                  Birth Date
                </label>
                <input
                  id="birth_date"
                  type="date"
                  placeholder="Birth Date"
                  className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...register("birth_date",{required:true})}
                />
              </div>
              <div className="-mt-10">
                <label htmlFor="dni" className="text-sm text-gray-200">
                  Dni
                </label>
                <input
                  id="dni"
                  type="text"
                  placeholder="DNI"
                  className="w-full p-1 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...register("dni",{required:true})}
                />
              </div>
              
              
            </div>

          </fieldset>
          <div className='flex gap-2 justify-center  '
        >
            <button
              type="submit"
              className={`px-8 py-3 font-semibold rounded border bg-red-400 `}
              
            >
              Create Patient
            </button>
           
            <button
              type="reset"
              className="px-8 py-3 font-semibold rounded border "
            >
              Reset{" "}
            </button>
            <Link
              type="button"
              className="px-8 py-3 font-semibold rounded border"
              to='/'
            >
              Home{" "}
            </Link>
         
            <Link
              type="button"
              className={`px-8 py-3 font-semibold rounded border ${Object.keys(patientCreated).length === 0 ? 'hidden' : 'block'}`}
              to='/appointments'
             
            >
              Create Appointment?{" "}
            </Link>
          
          </div>
        
        </form>
       
      </div>
    </>
  );
};

export default Patients;
