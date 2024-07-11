

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppointmentsInfoStore } from "../../../../store";
import { getDniData, postPersonData } from "../../../api/fetchData";
import RecipeList from "./RecipeList";

const Recipe = () => {
  const [medicineList, setMedicineList] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [getRecipeList, setGetRecipeList] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const url = `${import.meta.env.VITE_BASE_URL}/medicalcharts/recipe`;
  const urlRecipeList = `${
    import.meta.env.VITE_BASE_URL
  }/medicalcharts/getrecipe`;
  const medicineUrl = `${import.meta.env.VITE_BASE_URL}/medicines`;

  const admissionsInfo = useAppointmentsInfoStore(
    (state) => state.appointmentInfo
  );

  const admission_id = admissionsInfo.id;

  useEffect(() => {
    getAllMedicines();
  }, []);

  useEffect(() => {
    fetchRecipeList();
  }, []);

  const getAllMedicines = async () => {
    try {
      const response = await axios.get(medicineUrl);
      setMedicineList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecipeList = async () => {
    try {
      const retrievedRecipesByAdmissionId = await getDniData(
        urlRecipeList,
        admission_id
      );
      setGetRecipeList(retrievedRecipesByAdmissionId);
    } catch (error) {
      console.error(error);
    }
  };

  const selectedMedicineData = medicineList?.data?.data.find(
    (e) => e.medicine_title === selectedMedicine
  );

  const onSubmit = async (data) => {
    const fixedData = {
      admission_id: admission_id,
      medicine_chart_id: selectedMedicineData.id,
      ...data,
    };

    const postRecipeToAPI = await postPersonData(url, fixedData);
    console.log(postRecipeToAPI);

    fetchRecipeList();
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center align-middle mt-2 gap-1 p-4">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label className="text-md">Medicine:</label>
                <input
                  type="text"
                  list="medicineList"
                  name="medicine_title"
                  placeholder="Choose a medicine"
                  className="p-3 text-sm w-40 mt-2"
                  {...register("medicine_title", { required: true })}
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                  required
                />
                <datalist id="medicineList" name="medicineList">
                  {medicineList?.data?.data.map((medicine) => (
                    <option
                      key={medicine.id}
                      value={medicine.medicine_title}
                      className="text-xs w-60"
                    >
                      {medicine.medicine_title}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>
            {selectedMedicineData && (
              <div className="flex align-middle text-xs w-[150px] gap-2 mt-8">
                <div className="flex flex-col">
                  <p className="font-semibold">Presentation:</p>
                  <p>{selectedMedicineData.presentation}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Unit:</p>
                  <p>{selectedMedicineData.units}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Id:</p>
                  <p>{selectedMedicineData.id}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <label>Dosis:</label>
              <input
                type="number"
                name="dosis"
                {...register("dosis", { required: true })}
                placeholder="Dosis"
                className="h-10 mt-3 text-sm pt-1"
                required
              />
            </div>

            <div className="">
              <p className="mr-[300px]">Orders:</p>
              <textarea
                name="orders"
                {...register("orders", { required: true })}
                className="mt-2 w-[400px]"
              />
            </div>
            <button
              type="submit"
              className="w-20 h-8 mt-10 px-2 py-1 text-xs font-light rounded bg-yellow-400 hover:bg-yellow-500 text-white text-center"
            >
              Record
            </button>
          </div>
        </div>
      </form>
      <RecipeList getRecipeList={getRecipeList} onRemove={fetchRecipeList} />
    </div>
  );
};

export default Recipe;
