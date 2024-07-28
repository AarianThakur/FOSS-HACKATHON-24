// src/components/DataVisualizer.jsx
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DataVisualizer = () => {
  const [data, setData] = useState({
    labels: [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Sales",
        data: Array(12).fill(0),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [inputValues, setInputValues] = useState({
    January: "", February: "", March: "", April: "", May: "", June: "",
    July: "", August: "", September: "", October: "", November: "", December: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = Object.values(inputValues).map(value => parseFloat(value) || 0);
    setData({
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          data: updatedData,
        },
      ],
    });
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: '#fff'
        }
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
        color: '#fff'
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff'
        }
      },
      y: {
        ticks: {
          color: '#fff'
        }
      }
    }
  };

  const pieData = {
    labels: data.labels,
    datasets: [
      {
        label: "Sales Distribution",
        data: data.datasets[0].data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen p-4">
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(inputValues).map((month) => (
            <div key={month} className="flex flex-col">
              <label className="mb-2 font-semibold">{month}</label>
              <input
                type="number"
                name={month}
                value={inputValues[month]}
                onChange={handleChange}
                className="p-2 border rounded-md bg-gray-700 text-white"
                required
              />
            </div>
          ))}
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Update Charts
        </button>
      </form>
      <div className="mt-8">
        <Bar data={data} options={barOptions} />
      </div>
      <div className="mt-8">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default DataVisualizer;
