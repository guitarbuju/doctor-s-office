import { Description, Field, Textarea } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { postPersonData } from "../../../api/fetchData";
import { useAppointmentsInfoStore } from "../../../../store";
import { useState } from "react";

function MedicalData() {
  const { register, handleSubmit, reset } = useForm();
  const [clicked, setClicked] = useState(false);
  const [message, setMessage]=useState(null);
  const url = `${import.meta.env.VITE_BASE_URL}/medicalcharts`;
  const admissionsInfo = useAppointmentsInfoStore(
    (state) => state.appointmentInfo
  );
  const admission_id = admissionsInfo.id;

  const onSubmit = async (data) => {
    const fullData = { admission_id, ...data };
    console.log(fullData);
    const postedNote = await postPersonData(url, fullData);
    setMessage(postedNote.message);
    console.log(postedNote);
    setClicked(true);
    
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clicked ? `hidden` : `block`}
      >
        <Field>
          <Description className="flex flex-start mt-4 mb-2">
            Consultation Note:
          </Description>
          <div className="flex justify-center align-middle">
            <Textarea
              name="description"
              rows="8"
              {...register("medical_entry", { required: true })}
              className="flex justify-center align-middle p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-yellow-400 focus:border-yellow-500"
            ></Textarea>
          </div>
        </Field>
        <div className="flex justify-center align-middle gap-2 mt-4">
          <button className=" w-24 px-2 py-1 text-md font-light rounded bg-yellow-400 hover:bg-yellow-500 text-white text-center">
            Submit
          </button>
          <button
            className=" w-24 px-2 py-1 text-md font-light rounded bg-red-400 hover:bg-red-500 text-white text-center"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
      <div className={clicked ? `block` : `hidden`}>
       <h1 className="text-xl mt-8">{message}!!</h1>
      </div>
    </div>
  );
}

export default MedicalData;
