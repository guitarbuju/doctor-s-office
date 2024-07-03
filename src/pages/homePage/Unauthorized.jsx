import { Link } from "react-router-dom"
import Doctor from '../../assets/Doctor-PNG-Images.png'

const Welcome = () => {
  return (
    <div>
	<div className="custom-shape-divider-top-1717498057">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
</div>
        <section className="bg-zinc-50">
	<div className="container flex flex-col justify-center  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={Doctor} alt="" className="object-contain h-72 sm:h-80 lg:h-[700px] z-10" />
			
		</div>
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-10xl font-bold leading-none sm:text-6xl text-medBlue">EASYMED
				<span className="ml-2 text-black">Patient Management System</span>
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12 ml-2">All of your patients information made easy
				<br  className="hidden md:inline lg:hidden " /><span className="ml-2">Come, on give it a try...</span> </p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center  sm:space-y-0 sm:space-x-4  gap-2">
			<div className="flex justify-center align-middle gap-2">
			<h1 className="text-10xl font-bold leading-none sm:text-6xl text-yellow-400 -mt-8 mb-4">UNAUTHORIZED!!!!!!</h1>
			</div>
				<Link to='/home' className=" w-72 px-8 py-3 text-md font-light rounded outline outline-1 hover:bg-yellow-400 hover:text-white text-center">Home</Link>
			</div>
		</div>
	</div>
</section>
    </div>
  )
}

export default Welcome