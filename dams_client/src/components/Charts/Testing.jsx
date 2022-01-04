import React , { useState, useEffect } from 'react'
import {Pie, Bar ,Line } from 'react-chartjs-2';
import { getCategories } from "../../api/filter";
import {getRegister} from "../../api/register";
import {getAssets} from "../../api/assets";
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto';

function Testing() {
    const [asset, setAssets] = React.useState([]);
    const [searchCategories, setSearchCategories] = React.useState([]);
    const [categoryList1, setCategoryList1] = React.useState([]);
    const [categoryList2, setCategoryList2] = React.useState([]);
    const [categoryList3, setCategoryList3] = React.useState([]);
    const [categoryList4, setCategoryList4] = React.useState([]);
    const [categoryList5, setCategoryList5] = React.useState([]);
    const [user, setUsers] = React.useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);
  
    const getUsersList = async () => {
      const response = await getRegister();
      setUsers(response);
    };
    const getCategoryList1 = async () => {
        const response = await getAssets();
        const filteredCategory = response.filter(
          (asset) => asset.assetCategory === "61a280759cf2ea44b464afe7"
        );
        setCategoryList1(filteredCategory);
       
      };
      const getCategoryList2 = async () => {
        const response = await getAssets();
        const filteredCategory = response.filter(
          (asset) => asset.assetCategory === "61a2807f9cf2ea44b464afe8"
        );
        setCategoryList2(filteredCategory);
      };
      const getCategoryList3 = async () => {
        const response = await getAssets();
        const filteredCategory = response.filter(
          (asset) => asset.assetCategory === "61a281279cf2ea44b464afe9"
        );
        setCategoryList3(filteredCategory);
      };
      const getCategoryList4 = async () => {
        const response = await getAssets();
        const filteredCategory = response.filter(
          (asset) => asset.assetCategory === "61a281349cf2ea44b464afea"
        );
        setCategoryList4(filteredCategory);
      };
      const getCategoryList5 = async () => {
        const response = await getAssets();
        const filteredCategory = response.filter(
          (asset) => asset.assetCategory === "61a281719cf2ea44b464afeb"
        );
        setCategoryList5(filteredCategory);
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
      getCategoryList1();
      getCategoryList2();
      getCategoryList3();
      getCategoryList4();
      getCategoryList5();
      getUsersList();
    }, []);
    
    return (
      <div>
        
        <Bar 
        data={{
            labels: ['Desktop PC', 'Laptop PC','TV', 'Projektor', 'Pajisje tjera'],
            datasets: [
        {
          id: 1,
          label: 'Grafikoni',
          data: [categoryList1.length, categoryList2.length, categoryList3.length, categoryList4.length, categoryList5.length],
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
  

export default Testing
