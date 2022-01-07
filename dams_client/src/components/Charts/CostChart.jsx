import React , { useState, useEffect } from 'react'
import {Pie, Bar ,Line } from 'react-chartjs-2';
import {getRegister} from "../../api/register";
import {getAssets} from "../../api/assets";
import { useSelector } from "react-redux";


function CostChart() {
    const [asset, setAssets] = React.useState([]);
    const [user, setUsers] = React.useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);
    let costs=[];

    const getUsersList = async () => {
      const response = await getRegister();
      setUsers(response);
    };

    const getAssetsList = async () => {
      const response = await getAssets(currentUser.user._id);
      setAssets(response);
    };
    
    useEffect(() => {
      getAssetsList();
      getUsersList();
    }, []);

    costs= asset.map((obj, index) => {    
        return (costs = {
           id: index,
           assetDescription: obj.assetDescription,
           price: obj.price.toFixed(2),
        });
    }); 
    
    return (
        <div className='row'>
        <Line className="col-lg-9 col-6 mx-auto"
        data={{
            labels: costs.map((obj)=>obj.assetDescription),
            datasets: [
        {
          id: 1,
          label: 'Kostot e pajisjeve digjitale',
          data: costs.map((obj)=>obj.price),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
  
        },
      
    ],
  }} 
      />
      
      </div>
    )
  }
  
export default CostChart
