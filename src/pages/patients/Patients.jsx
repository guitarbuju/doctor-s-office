import { useForm } from "react-hook-form";
import { postPersonData } from "../../api/fetchData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePatientsInfoStore } from "../../../store";

const Patients = () => {
  const url = `${import.meta.env.VITE_BASE_URL}/patients`;
  const { register, handleSubmit, reset } = useForm();

  //State variables
  const [patientCreated, setPatientCreated] = useState({});
  const storedPatientsInfo = usePatientsInfoStore(
    (state) => state.setPatientInfo
  );

  //Post data to API
  const onSubmit = async (data) => {
    try {
      const recordPatientToApi = await postPersonData(url, data);
      //record respones
      setPatientCreated(recordPatientToApi);

      //load response to state manager context
      const { dni, first_name, last_name } = recordPatientToApi.data[0];

      const patientInfoToStore = {
        dni: dni,
        name: first_name,
        lastName: last_name,
      };

      storedPatientsInfo(patientInfoToStore);

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

  console.log(patientCreated);

  return (
    <>
      <section className="flex justify-around gap-4  text-gray-900 mt-10">
        <article className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold leading-tight ">
            Patient&apos;s Register Form
          </h1>
          <img
            src="https://pngimg.com/uploads/doctor/doctor_PNG16003.png"
            alt=""
            className="object-cover w-[350px] h-[500px] rounded-md xl:col-span-3 mt-2"
          />
        </article>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center p-12 -mt-10"
        >
          <fieldset className="mx-auto w-full max-w-[550px] bg-zinc-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              {/* <p className="font-medium text-[#07074D] text-lg">Personal Information</p> */}
              {!patientCreated && (
                <p className="text-xs text-[#07074D]">
                  Please enter patient`s information as requested.
                </p>
              )}
              <div className="text-xs text-[#07074D] flex flex-col rounded-md ">
                <div className="flex gap-2 align-middle justify-around text-xl">
                  <p>
                    {patientCreated.data?.[0]?.first_name}{" "}
                    {patientCreated.data?.[0]?.last_name}
                  </p>
                  <Link
                    className={`font-semibold text-sm text-[#6A64F1] underline ${
                      Object.keys(patientCreated).length === 0
                        ? "hidden"
                        : "block"
                    }`}
                    to="/appointments"
                  >
                    Create Appointment?{" "}
                  </Link>
                </div>

                <span className="text-lg">{patientCreated.message}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label
                  htmlFor="first_name"
                  className="text-base font-medium text-[#07074D]"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("first_name", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="last_name"
                  className="text-base font-medium text-[#07074D]"
                >
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("last_name", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("email", { required: true })}
                />
              </div>
             
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="text-base font-medium text-[#07074D]"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Phone Number"
                    className="w-72 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("phone", { required: true })}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="birth_date"
                    className="text-base font-medium text-[#07074D]"
                  >
                    Birth Date
                  </label>
                  <input
                    id="birth_date"
                    type="date"
                    placeholder="Birth Date"
                    className="w-72 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("birth_date", { required: true })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="dni"
                    className="text-base font-medium text-[#07074D]"
                  >
                    Dni
                  </label>
                  <input
                    id="dni"
                    type="text"
                    placeholder="DNI"
                    className="w-72 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("dni", { required: true })}
                  />
                </div>
                <div className="flex flex-col">
                <label
                  htmlFor="zip_code"
                  className="text-base font-medium text-[#07074D]"
                >
                  ZIP / Postal
                </label>
                <input
                  id="zip_code"
                  type="text"
                  placeholder="Zip Code"
                  className="w-72 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("zip_code", { required: true })}
                />
              </div>
              </div>
            </div>
          </fieldset>
          <div className="flex justify-center mt-3  gap-1">
            <button
              type="submit"
              className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
            >
              Create Patient
            </button>

            <button
              type="reset"
              className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
            >
              Reset{" "}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Patients;
