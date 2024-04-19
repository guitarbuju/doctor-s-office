import { useForm } from "react-hook-form";
import { postPersonData } from "../../api/fetchData";

const ServiceForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const url = `${import.meta.env.VITE_BASE_URL}/services`;

  const onSubmit = async (data) => {

    try {
      const postServiceToApi = await postPersonData(url, data);
      console.log(postServiceToApi);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="p-6 ">
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 ">
          <h1 className="block mb-2 text-medBlue">Register Form</h1>
          <h1 className="text-5xl font-extrabold text-black">
            Medical Services
          </h1>
          <p className="my-8 ">
            <span className="font-medium text-black">
              Suscribe Medical Services Here
            </span>
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="self-stretch space-y-3 -mt-3"
          >
            <div>
              <label
                htmlFor="Title"
                className="block text-base font-medium text-[#07074D]"
              >
                Title
              </label>
              <input
                id="Title"
                type="text"
                placeholder="Title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register("title", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-base font-medium text-[#07074D]"
              >
                Category
              </label>
              <input
                id="category"
                type="text"
                placeholder="Category"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register("category", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-base font-medium text-[#07074D]"
              >
                Price
              </label>
              <input
                id="price"
                type="text"
                placeholder="Price"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register("price", { required: true })}
              />
            </div>
            <div className="flex justify-around gap-2">
              <button
                type="submit"
                className="w-full py-2 font-semibold rounded bg-medBlue text-zinc-100"
              >
                Submit
              </button>
              <button
                type="reset"
                className="w-full py-2 font-semibold rounded bg-amber-400 text-zinc-100"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/005/307/230/large_2x/healthcare-and-medicine-concept-smart-medical-doctor-working-with-stethoscope-at-modern-hospital-free-photo.jpg"
          alt=""
          className="object-cover w-full h-[520px] rounded-md xl:col-span-3 mt-8"
        />
      </div>
    </section>
  );
};

export default ServiceForm;
