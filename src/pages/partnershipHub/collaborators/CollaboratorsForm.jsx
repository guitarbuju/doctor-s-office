import { useForm } from "react-hook-form";
import { postPersonData } from "../../../api/fetchData";
import GenericModal from "../../../api/GenericModal"
import { useState } from "react";

const Collaborators = () => {
  const { register, handleSubmit, reset } = useForm();
  const url = `${import.meta.env.VITE_BASE_URL}/collaborators`;
  let [isOpen, setIsOpen] = useState(true);
  const [recordedInfo, setRecordedInfo] = useState({});
  //Post data to API
  const onSubmit = async (data) => {
    const splints = { partner_type: "isProvider", phone: data.contact_phone , speciality:''};
    const fixedData = { ...data, ...splints };
    console.log(fixedData);
    try {
      const response = await postPersonData(url, fixedData);

      const recordCompanyToApi = { ...response.data[0], ...splints };
      console.log(recordCompanyToApi);
      setRecordedInfo(recordCompanyToApi);
      setIsOpen(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-around gap-4">
      <GenericModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        recordedInfo={recordedInfo}
      />
      <article className="flex flex-col items-center mt-10">
        <span className="block mb-2 ">EASYMED Patient Management System</span>
        <h1 className="text-5xl font-extrabold ">
          Collaborator&apos;s <br /> Register Form
        </h1>
        <img
          src="https://medsyncpharmacy.net/pic/medical-slide-1.jpg"
          alt=""
          className="object-cover w-[450px] h-[450px] rounded-md xl:col-span-3 mt-5"
        />
      </article>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center p-12 "
      >
        <div className="mx-auto w-full max-w-[550px] bg-zinc-50">
        <h2 className=" block text-base font-semibold text-[#07074D] sm:text-xl">Company&apos;s Info</h2>
        <div className="">
              <label
                htmlFor="name"
                className="block text-base font-medium text-[#07074D]"
              >
                Company&apos;s Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                {...register("title", { required: true })}
                placeholder=" Title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="">
            <label
              htmlFor="email"
              className="block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="">
            <label
              htmlFor="nif"
              className=" block text-base font-medium text-[#07074D]"
            >
              Nif
            </label>
            <input
              type="text"
              name="nif"
              id="nif"
              {...register("id", { required: true })}
              placeholder="Enter your Nif"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
         

          <label className=" block text-base font-medium text-[#07074D]">
            Address Details
          </label>
          <div className="-mx-3 flex flex-wrap ">
            <div className="w-full px-3 ">
              <div className="">
                <textarea
                  type="text"
                  name="area"
                  id="area"
                  {...register("domicile", { required: true })}
                  placeholder="Enter address"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <h2 className=" block text-base font-semibold text-[#07074D] sm:text-xl">Contact Info</h2>
          <div className="flex justify-around align-middle gap-2">
         
            <div className="">
              <label
                htmlFor="name"
                className="block text-base font-medium text-[#07074D]"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                {...register("contact_first_name", { required: true })}
                placeholder=" Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="">
              <label
                htmlFor="last_name"
                className=" block text-base font-medium text-[#07074D]"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                {...register("contact_last_name", { required: true })}
                placeholder="Last Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="flex justify-around align-middle gap-2">
            <div className="">
              <label
                htmlFor="dni"
                className=" block text-base font-medium text-[#07074D]"
              >
                Dni
              </label>
              <input
                type="text"
                name="dni"
                id="dni"
                {...register("contact_dni", { required: true })}
                placeholder="Enter your dni number"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="">
              <label
                htmlFor="phone"
                className=" block text-base font-medium text-[#07074D]"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                {...register("contact_phone", { required: true })}
                placeholder="Enter your phone number"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

         

          <div>
            <button
              type="submit"
              className="hover:shadow-htmlForm w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mt-4"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Collaborators;
