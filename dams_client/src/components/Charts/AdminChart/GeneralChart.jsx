import React , { useState, useEffect } from 'react'
import {Pie, Bar ,Line } from 'react-chartjs-2';
import { getCategories } from "../../../api/filter";
import {getRegister} from "../../../api/register";
import {getAssets} from "../../../api/assets";
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto';

function TestChart() {
  const [asset, setAssets] = React.useState([]);
  const [searchCategories, setSearchCategories] = React.useState([]);
  const [user, setUsers] = React.useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const getUsersList = async () => {
    const response = await getRegister();
    setUsers(response);
  };
  
  const getAssetsList = async () => {
    const response = await getAssets(currentUser.user._id);
    setAssets(response);
  };

  const getCategoriesList = async () => {
    const response = await getCategories();
    setSearchCategories(response);
  };

  useEffect(() => {
    getAssetsList();
    getCategoriesList();
    getUsersList();
  }, []);

  const data = {
    
    labels: ['Pajisje digjitale', 'Kategori te pajisjeve', 'Perdorues'],
    datasets: [
      {
        id: 1,
        label: 'Grafikoni',
        data: [asset.length, searchCategories.length, user.length],
        backgroundColor: [
          
          'rgba(91,192,222, 0.8)',
          'rgba(240,173,78, 0.8)',
          'rgba(41,43,44, 0.8)',
        ],
        borderColor: [
          'rgba(91,192,222, 0.8)',
          'rgba(240,173,78, 0.8)',
          'rgba(41,43,44, 0.8)',
        ],
        borderWidth: 1,

      },
    ],
  };
  

  return (
    <div>
      <div className="">   <Pie data={data} /></div>
      <div className="text-center pt-3 font-weight-bold">Statistika të sistemit</div>
   
    </div>
  )
}

export default TestChart
