import { useState, useEffect } from "react";
import { fetchAllPeopleData } from "../../../api/fetchData";

const InputSelector = ({ onDoctorSelect }) => {
  const [doctor, setDoctor] = useState("");
  const [doctorsArray, setDoctorsArray] = useState([]);
  const [queryState, setQueryState] = useState({
    query: "",
    uniqueNames: new Set(),
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/doctors`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllPeopleData(url);
        setDoctorsArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  const handleChange = (e) => {
    const results = doctorsArray?.filter((person) => {
      if (e.target.value === "") return null;
      return person.full_name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });
    const uniqueNames = new Set(
      results.map((element) => element.full_name.toLowerCase())
    );
    setQueryState({
      query: e.target.value,
      uniqueNames: uniqueNames,
    });
    console.log(results);
  };

  const handleClick = (name) => {
    const selectedDoctor = doctorsArray.find(
      (person) => person.full_name.toLowerCase() === name.toLowerCase()
    );
    if (selectedDoctor) {
      const { doctor_dni } = selectedDoctor;
      setDoctor(doctor_dni);
      setQueryState({ query: name, uniqueNames: "" });
      onDoctorSelect(doctor_dni);
    }
  };
  console.log("this is te dr", doctor);

  return (
    <div>
      <input
        value={queryState.query}
        onChange={handleChange}
        placeholder="Doctor's name Here..."
        className="inline-flex items-center px-5 py-3 rounded-lg"
      />
      <div className="box-border rounded-lg border-2 mt-1">
        <ul>
          {[...queryState.uniqueNames].map((name, index) => (
            <li key={index}>
              <div className="d-grid gap-2 mb-1 flex justify-center align-middle py-2">
                <button
                  className="px-8 py-1 font-semibold rounded border bg-red-400 text-gray-100"
                  onClick={() => handleClick(name)}
                >
                  {name}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputSelector;
