import { useEffect, useState } from "react";
import { fetchAllPeopleData } from "../../api/fetchData";
import play from "../../assets/icons8-play-50.png";

const PartnerSearch = () => {
  const [foundPartners, setFoundPartners] = useState([])
  const [filterItem, setFilterItem]= useState('')
  
  

  const listFiller = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/collaborators`;

    try {
      const getPartners = await fetchAllPeopleData(url);
      setFoundPartners(getPartners);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    listFiller();
  }, []);



   const filteredPartners= foundPartners?.data?.filter((partner)=>partner.partner_type === filterItem);
   console.log(filteredPartners)

  return (
    <article>
      <section className="py-6 bg-medBlue">
        <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
          <div className="flex flex-col lg:text-left">
            <h1 className="text-5xl font-bold leading-none text-gray-100 ">
              Partners and Doctors
            </h1>
            <p className="mb-1 text-sm font-medium tracking-widest uppercase text-gray-100">
            Search Doctors and Collaborators by Type{" "}
          </p>
          </div>
        </div>
      </section>
      <div className="bg-zinc-50 ">
        <div className="container p-2 mx-auto sm:p-4 text-gray-900 flex justify_around gap-10 align-middle">
          <h2 className=" text-xl flex flex-start font-semibold leading-tight text-gray-900 mt-1">
            List of Registered Partners
          </h2>
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className=" w-[200px] rounded-lg border-gray-300 text-gray-700 sm:text-sm py-1"
            onChange={(e)=>setFilterItem(e.target.value)}
          >
            <option value="">Please select</option>
            <option value="isDoctor">Doctor</option>
            <option value="isProvider">Provider</option>
            <option value="isClient">Client</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
          <thead>
            <tr className=" text-sm bg-zinc-200 ">
              <th className="p-3 w-4  ">Id</th>
              <th className="p-3 w-6">Title</th>
              <th className=" p-3 w-10">Type</th>
              <th className="w-10 text-center">Phone</th>
              <th className="w-2 text-center">Email</th>
              <th className="w-2 text-center">Address</th>
              <th className="w-2 text-center">More</th>
            </tr>
          </thead>
          <tbody className="border-b border-gray-300 ">
            {filteredPartners?.map((app, index) => (
              <tr className="text-sm rounded-2xl" key={index}>
                <td className="px-3 py-2 border-x border-y bg-zinc-100 rounded-sm">
                  <p>{app.id}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100 rounded-sm">
                  <p>{app.title}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100 rounded-sm">
                  <p>{app.partner_type}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100 rounded-sm">
                  <p>{app.contact_phone}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100 rounded-sm">
                  <p>{app.email}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100 rounded-sm">
                  <p>{app.domicile}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100 rounded-sm">
                  <button
                    className="flex justify-center align-middle w-40 transition-transform transform hover:scale-125 "
                    type="button"
                    // onClick={() => clickHandler(app.id)}
                  >
                    <img src={play} className="w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default PartnerSearch;
