import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchAllPeopleData, postPersonData } from "../../api/fetchData";
import { useAppointmentsInfoStore } from "../../../store";
import ChargesOnInvoice from "./ChargesOnInvoice";

const InputChargeForm = () => {
  const admissionsInfo = useAppointmentsInfoStore(
    (state) => state.appointmentInfo
  );
  const [inputRequestedData, setInputRequestedData] = useState({});
  const [reloadCharges, setReloadCharges] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const serviceUrl = `${BASE_URL}/services`;
  const chargesUrl = `${BASE_URL}/charges`;
  const collaboratorsUrl = `${BASE_URL}/collaborators`;
 

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  useEffect(() => {
    const getInputData = async () => {
      try {
        const servicesData = await fetchAllPeopleData(serviceUrl);
        const collaboratorsData = await fetchAllPeopleData(collaboratorsUrl);
        setInputRequestedData({
          services: servicesData,
          collaborators: collaboratorsData,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getInputData();
  }, [reloadCharges]);

  const onSubmit = async (data) => {
    const admissionId = admissionsInfo.id;
    const oneCharge = { ...data, admissionId };
    
    try {
        const postActualCharge = await postPersonData(chargesUrl, oneCharge);
        console.log("posted results", postActualCharge);
        setReloadCharges(!reloadCharges);
      } catch (error) {
        console.error(error);
      }
      reset();

  };

 
  return (
    <div>
    <h1 className="text-2xl font-semibold leading-tight">Add Charges Information</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center align-middle mt-2 gap-1 border-b-2 p-4">
        <div className="flex flex-col items-center text-xs">
          <label>Service</label>
          <select
            className="border rounded-md py-1"
            {...register("serviceId", {
              required: true,
            })}
          >
            {inputRequestedData?.services?.data?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}---{service.price}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center text-xs">
          <label>Collaborator</label>
          <input
            type="text"
            list="drList"
            className="border rounded-md py-1"
            placeholder="Input Dr. Name"
            required
            {...register("id", {
              required: true,
            })}
          />
          <datalist id="drList" name="drList">
            {inputRequestedData?.collaborators?.data?.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.title.toUpperCase()}
              </option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-col items-center text-xs">
          <label>Quantity</label>
          <input
            className="border rounded-md py-1 w-12 "
            {...register("num", {
              required: true,
            })}
            type="number"
          />
        </div>
        <button
          type="submit"
          className="h-6 ml-2 mt-4 bg-medBlue hover:bg-purple-400 text-gray-100 px-2  rounded transition duration-150 text-xs"
        >
          Submit
        </button>
      
      </div>
      
    </form>
    <ChargesOnInvoice admissionsInfo={admissionsInfo} reload={reloadCharges} />
    </div>
  );
};

export default InputChargeForm;
