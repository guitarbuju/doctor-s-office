import { Link } from "react-router-dom";

const SwitchBoard = () => {
  return (
    <section>
      <div className="container flex flex-col justify-center p-6 lg:flex-row lg:justify-between -mt-10">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left text-gray-900">
          <h1 className=" text-4xl font-semibold leading-tight ">
            Back Office
          </h1>
          <div className="flex flex-col mb-12 font-light">
            <h2 className="text-md ">Switch Board </h2>
            <p className=" text-xs ">Click on the button for action</p>
          </div>

          <div className="flex flex-col gap-2 space-y-4 sm:items-center sm:justify-center  sm:space-y-0 sm:space-x-4 -mt-10">
            <Link
              to="/doctors"
              className="ml-4 w-60 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
            >
              Create Doctor
            </Link>
            <Link
              to="/collaborators"
              className=" w-60 px-8 py-3 text-md font-light rounded border-2 border-zinc-100 outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
            >
              Create Collaborator
            </Link>
            <Link
              to="/services"
              className="w-60 px-8 py-3 text-md font-light rounded border-2 border-zinc-100 outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
            >
              Create Service
            </Link>
            <Link
              to="/collaborators/search"
              className="w-60 px-8 py-3 text-md font-light rounded border-2 border-zinc-100 outline outline-1 hover:bg-yellow-400 hover:text-white text-center"
            >
              <span className="font-semibold">Search</span> Collaborator
            </Link>
          </div>
        </div>
        <div className=" items-center justify-center p-6  lg:mt-10 h-72  sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ml-2 ">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*"
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 pl-6"
          />
        </div>
      </div>
    </section>
  );
};

export default SwitchBoard;
