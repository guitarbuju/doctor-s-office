import {useState, useEffect} from 'react';
import { getDniData } from '../../../api/fetchData';
import { useAppointmentsInfoStore } from "../../../../store";

const ChartViewer = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/medicalcharts/recipe`;
    const [selectedChart, setSelectedChart] = useState([]);
    
    const admissionsInfo = useAppointmentsInfoStore(
        (state) => state.appointmentInfo
      );
      const admission_id = admissionsInfo.id;
      
    
    
    const getOneIdChart = async () => {
      const retrievedChart = await getDniData(url, admission_id);
     
      setSelectedChart(retrievedChart);
    };

   
  
    useEffect(() => {
      getOneIdChart();
    }, [admission_id]);

console.log(selectedChart);

  return (
    <div className='mt-4'>
      <h1 className="text-2xl font-semibold leading-tight ">Patient&apos;s Orders Viewer</h1>

      <div>
        <div>
          <p className='text-left'>Description:</p>
          <div className='rounded-xl border min-h-40 p-4'>
            <p className='text-left'>{selectedChart?.data?.data[0]?.medical_entry}</p>
          </div>
        </div>
        <div>
          <p className="text-left mt-2">Dr&apos;s Orders:</p>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="text-lg bg-zinc-200">
                  <th className="p-3 border-x border-y">Medicine</th>
                  <th className="p-3 border-x border-y">Dosis</th>
                  <th className="p-3 border-x border-y">Orders</th>
                </tr>
              </thead>
              <tbody className="border-b border-gray-300">
              {selectedChart?.data?.data?.map((recipe)=>(
                <tr className="text-sm" key={recipe.index}>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{recipe.medicine_title}</p>
                  </td>
                  <td className="px-3 py-2 border-x border-y">
                    <span>{recipe.dosis}</span>
                  </td>
                  <td className="px-3 py-2 border-x border-y bg-zinc-100">
                    <p>{recipe.orders}</p>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartViewer;
