import { useState } from "react";
import { postPersonData } from "../../../api/fetchData";
import { useForm } from "react-hook-form";
import ListTable from "./ListTable";
import { formatDate } from "../../../api/formatDate";
import axios from "axios";

const AppoinmentList = () => {
  const { register, handleSubmit, reset } = useForm();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/appointments/list`;
  const [appointmentList, setAppointmentList] = useState();
  const [dataForm, setDataForm] = useState({ error: null, dates: null });

  const onSubmit = async (data) => {
    try {
      if (data.fromDate > data.toDate) {
        throw new Error("Initial date must be before final date");
      }
      console.log(data);
      const postDatestoApi = await postPersonData(url, data);
      setAppointmentList(postDatestoApi.resultedData);
      setDataForm({ error: null, dates: data });
      reset();
    } catch (error) {
      console.error(error.message);
      setDataForm({ error: error, dates: null });
    }
  };

  const reloadAppointmentList = async () => {
    const { fromDate, toDate } = dataForm.dates;
    console.log(fromDate, toDate);
    try {
      const response = await axios.post(url, { fromDate, toDate });

      if (response.status !== 200) {
        throw new Error("Failed to fetch appointment list");
      }

      setAppointmentList(response.data);
    } catch (error) {
      console.error("Error fetching appointment list:", error);
    }
  };
  console.log(appointmentList);
  console.log(dataForm);
  return (
    <div>
      <section className="py-6 text-gray-900">
        <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
          <div className="flex flex-col space-y-4 text-center lg:text-left">
            <h1 className="text-5xl font-bold leadi ">
              Search for Appointments
            </h1>
            <p className="text-lg ">
              Search information about appointments between dates
            </p>
          </div>
          <div className="flex flex-row items-center self-center justify-center flex-shrink-0 lg:justify-end">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-row gap-5"
            >
              <label className="">From</label>
              <input
                type="date"
                // defaultValue={today}
                className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
                {...register("fromDate", { required: true })}
              />
              <label className="">To</label>
              <input
                type="date"
                // defaultValue={today}
                className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
                {...register("toDate", { required: true })}
              />
              <button className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center">
                Search
              </button>
            </form>
          </div>
        </div>
        {dataForm.dates ? (
          <p className="text-lg text-gray-100">
            Found appointments from {formatDate(dataForm?.dates?.fromDate)} to{" "}
            {formatDate(dataForm?.dates?.toDate)}
          </p>
        ) : (
          <p className="text-lg bg-red-400">{dataForm?.error?.message}</p>
        )}
      </section>
      {appointmentList && (
        <ListTable
          appointmentList={appointmentList}
          reloadAppointmentList={reloadAppointmentList}
        />
      )}
    </div>
  );
};

export default AppoinmentList;
