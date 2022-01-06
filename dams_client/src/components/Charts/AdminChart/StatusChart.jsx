import React , { useState, useEffect } from 'react'
import {Pie, Bar ,Line } from 'react-chartjs-2';
import {getAssets} from "../../../api/assets";


function StatusChart() {
  const [status1, setStatus1] = React.useState([]);
  const [status2, setStatus2] = React.useState([]);

  const getStatusNum1 = async () => {
    const response = await getAssets();
    const filteredCategory = response.filter(
      (asset) => asset.assetAvailability === "Active"
    );
    setStatus1(filteredCategory);
  };
  const getStatusNum2 = async () => {
    const response = await getAssets();
    const filteredCategory = response.filter(
      (asset) => asset.assetAvailability === "Passive"
    );
    setStatus2(filteredCategory);
  };
  useEffect(() => {
    getStatusNum1();
    getStatusNum2();
  }, []);

  const data = {
    
    labels: ['Pajisje Aktive', 'Pajisje Pasive'],
    datasets: [
      {
        id: 1,
        label: 'Grafikoni',
        data: [status1.length, status2.length],
        backgroundColor: [
          
          'rgba(40,167,69, 0.8)',
          'rgba(220,53,69, 0.8)',
        ],
        borderColor: [
          'rgba(40,167,69, 0.8)',
          'rgba(220,53,69, 0.8)',
        ],
        borderWidth: 1,

      },
    ],
  };
  

  return (
    <div className=''>
      <div className="">   <Pie data={data} /></div>
      <div className="text-center pt-3 font-weight-bold">Statusi i pajisjeve</div>
   
    </div>
  )
}

export default StatusChart
