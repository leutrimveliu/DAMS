import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  getDailyCount,
  getWeeklyCount,
  getMonthlyCount,
} from "../../api/department";

const CategoryChart = () => {
  const [departments, setDepartments] = useState([]);
  const departmentsData = [];
  const fetchEmployees = async () => {
    const response = await getDailyCount();
    departmentsData.push(response);
  };

  const fetchEmployees1 = async () => {
    const response1 = await getWeeklyCount();
    departmentsData.push(response1);
  };
  const fetchEmployees2 = async () => {
    const response2 = await getMonthlyCount();
    departmentsData.push(response2);
    setDepartments(departmentsData);
  };

  const departmentsArray = [];
  departments.map((department) => departmentsArray.push(department.count));
  console.log(departmentsArray);

  useEffect(() => {
    fetchEmployees();
    fetchEmployees1();
    fetchEmployees2();
  }, []);

  const data = {
    labels: departments.map((department) => department.name),
    datasets: [
      {
        label: "Categories",
        data: departmentsArray,
        fill: true,
        backgroundColor: [
          "rgba(94, 214, 132, 0.4)",
          "rgba(240, 216, 156, 0.4)",
          "rgba(240, 156, 220, 0.4)",
        ],
        borderColor: ["rgba(0, 0, 0, 0.6)"],
        borderWidth: 1,
        barThickness: 150,
        barPercentage: 0.5,
        maxBarThickness: 200,
        minBarLength: 2,
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "New Departments",
      fontSize: 20,
    },
    tooltips: {
      xPadding: 10,
    },
  };

  console.log(data);

  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <div className="d-flex justify-content-center mb-2"></div>
      {departments ? <Pie data={data} options={options} /> : null}
    </div>
  );
};

export default CategoryChart;
