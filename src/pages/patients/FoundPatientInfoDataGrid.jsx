


const FoundPatientInfoDataGrid = ({foundPatient}) => {
  console.log(foundPatient);
   

  const { data } = foundPatient;
  console.log(data[0])
 
  
 
  return (
    <div className="bg-red-400 ">
   <div className="container p-2 mx-auto sm:p-4 text-gray-900">
	<h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-900">Found Patient</h2>
	<div className="overflow-x-auto">
		<table className="w-full p-6 text-xs text-left whitespace-nowrap">
			<colgroup>
				<col className="w-5" />
				<col />
				<col />
				<col />
				<col />
				<col />
				<col className="w-5" />
			</colgroup>
			<thead>
				<tr className="dark:bg-gray-300 text-lg">
					<th className="p-3">First Name</th>
					<th className="p-3">Last Name</th>
					<th className="p-3">DNI</th>
					<th className="p-3">Phone</th>
					<th className="p-3">Email</th>
					<th className="p-3">Zip Code</th>
					<th className="p-3">Id</th>
				</tr>
			</thead>
			<tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
				<tr className='text-sm'>
					<td className="px-3 py-2">
						<p>{data[0].first_name}</p>
					</td>
					<td className="px-3 py-2">
						<span>{data[0].last_name}</span>
						
					</td>
          <td className="px-3 py-2">
						<p>{data[0].dni}</p>
					</td>
					<td className="px-3 py-2">
						<p>{data[0].phone}</p>
					</td>
					<td className="px-3 py-2">
						<p>{data[0].email}</p>
					</td>
					<td className="px-3 py-2">
						<p>{data[0].zip_code}</p>
						
					</td>
          <td className="px-3 py-2">
						<p>{data[0].id}</p>
					
					</td>
					<td className="px-3 py-2">
						<button type="button" title="Open details" className="p-1 rounded-full dark:text-gray-400 hover:dark:bg-gray-300 focus:dark:bg-gray-300">
							<svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
								<path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
							</svg>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

    </div>
  );
};

export default FoundPatientInfoDataGrid;
