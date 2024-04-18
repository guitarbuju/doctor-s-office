import { Link } from "react-router-dom"

const SwitchBoard = () => {
  return (
    <section>
	<div className="text-zinc-100 container flex flex-col justify-center p-6 mx-auto lg:flex-row lg:justify-between">
		<div className=" bg-medBlue flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className=" text-5xl font-bold leadi sm:text-6xl">Administration
				
			</h1>
			<p className=" mt-6 mb-8 text-lg sm:mb-12">SWITCH BOARD
				<br/>Click on the button for action
			</p>
			<div className="flex flex-col gap-1 space-y-4 sm:items-center sm:justify-center  sm:space-y-0 sm:space-x-4 ">
				<Link to='/doctors' className="ml-4 w-60 px-8 py-3 text-lg font-semibold rounded border-2 border-zinc-100">Create Doctor</Link>
				<Link to='/collaborators' className=" w-60 px-8 py-3 text-lg font-semibold rounded border-2 border-zinc-100">Create Collaborator</Link>
				<Link to='/services' className="w-60 px-8 py-3 text-lg font-semibold rounded border-2 border-zinc-100">Create Service</Link>
				<Link to='/collaborators/search' className="w-60 px-8 py-3 text-lg font-semibold rounded border-2 border-zinc-100">Search Collaborator</Link>
			</div>
		</div>
		<div className=" items-center justify-center p-6  lg:mt-10 h-72  sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ml-2 ">
			<img src="https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 pl-6" />
		</div>
	</div>
</section>
  )
}

export default SwitchBoard