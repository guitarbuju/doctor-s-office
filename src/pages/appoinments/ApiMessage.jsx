import { Link } from "react-router-dom"


const ApiMessage = ({apimessage}) => {

    const message=apimessage.message
  return (
    <section className="py-6 bg-medBlue">
    <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
      <div className="flex flex-col justify-center lg:text-left">
        <h1 className="text-5xl font-bold leading-none text-gray-100">
          {message}
        </h1>
      </div>
      
        <div className="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
       
          
          <Link
          to='/'
          className="px-8 py-3 font-semibold rounded-md bg-transparent">
            Home
          </Link>
        </div>
      </div>
  </section>
  )
}

export default ApiMessage