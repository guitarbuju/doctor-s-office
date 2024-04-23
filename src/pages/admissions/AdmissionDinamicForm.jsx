import { useForm, useFieldArray } from "react-hook-form";
import { fetchAllPeopleData } from "../../api/fetchData";
import { useState, useEffect } from "react";

const AdmissionDinamicForm = ({ admissionsInfo }) => {
  const [viewForm, setViewForm] = useState(true);
  const [inputRequestedData, setInputRequestedData] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const serviceUrl = `${BASE_URL}/services`;
  const collaboratorsUrl = `${BASE_URL}/collaborators`;
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicInputs",
  });

  useEffect(() => {
    const getInputData = async () => {
      try {
        const servicesData = await fetchAllPeopleData(serviceUrl);
        const collaboratorsData = await fetchAllPeopleData(collaboratorsUrl);
        setInputRequestedData({services:servicesData, collaborators:collaboratorsData});
      } catch (error) {
        console.error(error);
      }
    };

    getInputData();
  }, []);

  console.log(inputRequestedData);

  const onSubmit = (data) => {
    console.log(data);
    const { id } = admissionsInfo;
    const payLoad=data.dynamicInputs.forEach((input) => {
      input.id = id;
    });
    console.log(payLoad);
    reset();
    setViewForm(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
         { viewForm && <div className="flex justify-center align-middle mt-2 gap-1">
            <div className="flex flex-col items-center text-xs">
              <label>Service</label>
              <select
                className="border rounded-md py-1"
                {...register(`dynamicInputs[${index}].serviceId`, {
                  required: true,
                })}
                defaultValue={field.serviceId} // For editing existing data
              >
                {inputRequestedData?.services?.data?.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}---{service.price}
                  </option>
                ))}
              </select>
              {errors?.dynamicInputs?.[index]?.serviceId && ( // Display error message if serviceId is not filled
                <span className="text-red-500">Service is required</span>
              )}
            </div>
            <div className="flex flex-col items-center text-xs">
            <label>Collaborator</label>
            <input
                  type="text"
                  list="drList"
                  className="border rounded-md py-1"
                  placeholder="Input Dr. Name"
                  required
                  {...register(`dynamicInputs[${index}].value`, {
                  required: true,
                })}
              
                />
            <datalist id="drList" name="drList">
                  {inputRequestedData?.collaborators?.data?.map((doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.id }
                    >
                      {doctor.title.toUpperCase()}
                    </option>
                  ))}
                </datalist>
            </div>
            <div className="flex flex-col items-center text-xs">
              <label>Quantity</label>
              <input
                className="border rounded-md py-1 w-12 "
                {...register(`dynamicInputs[${index}].quantity`, {
                  required: true,
                })}
                type="number"
              />
            </div>
            <button
              className="h-6 ml-2 mt-4 bg-medBlue hover:bg-purple-400 text-gray-100 px-2  rounded transition duration-150 text-xs"
              type="button"
              onClick={() => append({ serviceId: "", quantity: "" })}
            >
              Add Input
            </button>{" "}
            <button
              className="h-6 ml-2 mt-4 bg-amber-400 hover:bg-purple-400 text-gray-100 px-2  rounded transition duration-150 text-xs"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>}
        </div>
      ))}
      <div className="flex  justify-center align-middle mt-3">
        <button
          className="h-6 ml-2 mt-5 bg-medBlue hover:bg-purple-400 text-gray-100 px-2  rounded transition duration-150 text-xs"
          type="button"
          onClick={() => append({ serviceId: "", quantity: "" })}
        >
          Add Input
        </button>
        <button
          className="h-6 ml-2 mt-5 bg-fuchsia-600 hover:bg-purple-400 text-gray-100 px-2  rounded transition duration-150 text-xs"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdmissionDinamicForm;
