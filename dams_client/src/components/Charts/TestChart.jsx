import React , { useState, useEffect } from 'react'
import {Pie, Bar ,Line } from 'react-chartjs-2';
import { getCategories } from "../../api/filter";
import {getRegister} from "../../api/register";
import {getAssets} from "../../api/assets";
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
    
    labels: ['Assets', 'Categories', 'Users'],
    datasets: [
      {
        id: 1,
        label: 'Grafikoni',
        data: [asset.length, searchCategories.length, user.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,

      },
    ],
  };
  

  return (
    <div>
      <Bar data={data} />
    </div>
  )
}

export default TestChart
