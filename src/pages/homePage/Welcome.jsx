import { Link } from "react-router-dom"


const Welcome = () => {
  return (
    <div>
        <section className="bg-zinc-50">
	<div className="container flex flex-col justify-center  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src="https://www.pngall.com/wp-content/uploads/2018/05/Doctor-PNG-Images.png" alt="" className="object-contain h-72 sm:h-80 lg:h-[700px]" />
		</div>
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-10xl font-bold leading-none sm:text-6xl text-medBlue">EASYMED
				<span className="ml-2 text-black">Patient Management System</span>
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12 ml-2">All of your patients information made easy
				<br  className="hidden md:inline lg:hidden " /><span className="ml-2">Come, on give it a try...</span> </p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link to='/patients' className="px-8 py-3 text-lg font-semibold rounded border  dark:bg-violet-600 dark:text-gray-50">Create Patient</Link>
				<Link to='/patients/dni' className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">Search Patient</Link>
			</div>
		</div>
	</div>
</section>
    </div>
  )
}

export default Welcome