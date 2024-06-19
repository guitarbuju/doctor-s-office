import { useForm } from "react-hook-form";
import { fetchAPersonData } from "../../api/fetchData";
import FoundPatientInfoDataGrid from "./FoundPatientInfoDataGrid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePatientsInfoStore } from "../../../store";
import AppoinmentsByPatient from "../appointments/search/AppoinmentsByPatient";

const PatientSearchByDni = () => {
  const storedPatientsInfo = usePatientsInfoStore(
    (state) => state.setPatientInfo
  );
  const { register, handleSubmit, reset } = useForm();
  const [foundPatient, setFoundPatient] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data) => {
    const url = `${BASE_URL}/patients/${data.dni}`;
    try {
      const foundPatientByDni = await fetchAPersonData(url, data.dni);
      setFoundPatient(foundPatientByDni);
      reset();
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  if (foundPatient) {
    storedPatientsInfo({
      dni: foundPatient?.data[0]?.dni,
      name: foundPatient?.data[0]?.first_name,
      lastName: foundPatient?.data[0]?.last_name,
    });
  }

  return (
    <div className="py-6 bg-medBlue">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row"
      >
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-none text-gray-100">
            Input Patient`s DNI for Search
          </h1>
          <p className="text-lg">
            {!error ? (
              "Please insert Patient's DNI card number"
            ) : (
              <span className="text-2xl bg-yellow-400 text-red-500">
                {error}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
          {!foundPatient && (
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="DNI Number"
                className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
                {...register("dni", { required: true, maxLength: 12 })}
                onFocus={() => reset()}
              />
              <button
                type="submit"
                className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 text-gray-100 bg-red-400"
              >
                Search
              </button>
            </div>
          )}
        </div>
      </form>
      <div className="w-full">
        {foundPatient && !error && (
          <div className="flex flex-col">
            <FoundPatientInfoDataGrid foundPatient={foundPatient} />
            <AppoinmentsByPatient foundPatient={foundPatient}/>
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-center align-middle mt-4">
        <Link
          type="button"
          className="px-8 py-3 font-semibold rounded border"
          to="/home"
        >
          Home{" "}
        </Link>
        {foundPatient && !error ? (
          <Link
            type="button"
            className="px-8 py-3 font-semibold rounded border text-gray-100 bg-red-400"
            to="/appointments"
          >
            Create Appointment?{" "}
          </Link>
        ) : (
          ""
        )}
        {error && (
          <Link
            type="button"
            className="px-8 py-3 font-semibold rounded border bg-red-400 text-gray-100"
            to="/patients"
          >
            Create Patient ?{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default PatientSearchByDni;
