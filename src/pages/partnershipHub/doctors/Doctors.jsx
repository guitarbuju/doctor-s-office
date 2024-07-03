import { useForm } from "react-hook-form";
import { postPersonData } from "../../../api/fetchData";
import GenericModal from "../../../api/GenericModal";
import { useState } from "react";

const Doctors = () => {
  const { register, handleSubmit, reset } = useForm();
  const url = `${import.meta.env.VITE_BASE_URL}/doctors`;
  let [isOpen, setIsOpen] = useState(false);
  const [recordedInfo, setRecordedInfo] = useState({});
  //Post data to API
  const onSubmit = async (data) => {
    const splints = { partner_type: "isDoctor", phone: data.contact_phone,contact_dni:data.id };
    const fixedData = { ...data, ...splints };
    console.log(fixedData);
    try {
      const response = await postPersonData(url, fixedData);

      const recordDoctorToApi = { ...response.data[0], ...splints };
      console.log(recordDoctorToApi);
      setRecordedInfo(recordDoctorToApi);
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
      <article className="flex flex-col items-center mt-10 text-gray-900">
        <h1 className="text-4xl font-semibold leading-tight ">
          Doctor&apos;s Register Form
        </h1>
        <img
          src="https://www.vinci.com/vinci/actualites-v3.nsf/B031ABB656909551C1257A7900424A73/$file/Hopital_Varsovie-hd.jpg"
          alt=""
          className="object-cover w-[450px] h-[450px] rounded-md xl:col-span-3 mt-5"
        />
      </article>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center p-12 mt-14"
      >
        <div className="mx-auto w-full max-w-[550px] bg-zinc-50">
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
                {...register("id", { required: true })}
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
          {/* <div className="">
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
          </div> */}
          <div className="">
            <label
              htmlFor="speciality"
              className=" block text-base font-medium text-[#07074D]"
            >
              Speciality
            </label>
            <input
              type="text"
              name="speciality"
              id="speciality"
              {...register("speciality", { required: true })}
              placeholder="Enter your speciality"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <label className=" block text-base font-semibold text-[#07074D] sm:text-xl">
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
          <div className="flex justify-between gap-2 mb-2">
            <div className="">
              <label
                htmlFor="username"
                className=" block text-base font-medium text-[#07074D]"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                {...register("username", { required: true })}
                placeholder="Enter your Username"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="">
              <label
                htmlFor="Password"
                className=" block text-base font-medium text-[#07074D]"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                {...register("password", { required: true })}
                placeholder="Enter your speciality"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="hover:shadow-htmlForm w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Doctors;
