import { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { postPersonData } from "../../api/fetchData";
import { saveItemToLocalStorage } from "../../api/localStorage";
import { useNavigate } from "react-router";

const LoginForm = ({ isOpen, setIsOpen }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_BASE_URL}/auth/login`;

  //////////////REACT HOOK FORM HOOKS
  const {
    register,
    handleSubmit,
    // formState: { errors },
    watch,
   
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    let timer;
    if (showSpinner) {
      timer = setTimeout(() => {
        setShowSpinner(false);
        setClicked(true);
        setIsOpen(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [showSpinner]);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const signInToApi = await postPersonData(url, data);
      const { user, token } = signInToApi;
      saveItemToLocalStorage(user, token);
      setShowSpinner(true);
      setClicked(true);
      navigate('/authorization')
      console.log(signInToApi);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-10">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
          <span>LOGIN FORM</span>
          <Dialog.Description className="flex justify-center align-middle">
                {showSpinner ? (
                  <span className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-medBlue"></span>
                ) : (
                  <span></span>
                )}
              </Dialog.Description>
          <Dialog.Title className={`mt-8 ${clicked ? "hidden" : ""}`}>
        {!clicked ? 
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 -mt-6 h-[300px]">
              <div className="space-y-4">
                <label
                  htmlFor="username"
                  className=" text-sm flex justify-start"
                >
                  User Name:
                </label>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="your User Name..."
                  className="w-full px-3 py-2 text-gray-600 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="flex justify-start mb-2 text-sm"
                  >
                    Email address
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="leroy@jenkins.com"
                    className="w-full px-3 py-2 border text-gray-600 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                  </div>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="w-full text-gray-600  px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
             
              <div className=" flex gap-2 justify-center align-middle">
                <button
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
        :''}
            
          </Dialog.Title>      
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LoginForm;
