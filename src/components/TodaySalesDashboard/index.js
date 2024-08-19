import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./styles.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TodaySalesDashboard = () => {
  const [productSales, setProductSales] = useState({
    labels: [],
    datasets: [{
      label: 'Product Sales',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  });
  const [categorySales, setCategorySales] = useState({
    labels: [],
    datasets: [{
      label: 'Category Sales',
      data: [],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    const mockData = [
      { productName: 'Product A', category: 'Electronics', quantitySold: 10, salesAmount: 1000 },
      { productName: 'Product B', category: 'Clothing', quantitySold: 20, salesAmount: 800 },
      { productName: 'Product C', category: 'Electronics', quantitySold: 15, salesAmount: 1500 },
      { productName: 'Product D', category: 'Food', quantitySold: 30, salesAmount: 600 },
      { productName: 'Product E', category: 'Clothing', quantitySold: 25, salesAmount: 1250 },
    ];

    setTableData(mockData);
    setProductSales(processProductSales(mockData));
    setCategorySales(processCategorySales(mockData));
  }, []);

  const processProductSales = (data) => {
    const labels = data.map(item => item.productName);
    const salesData = data.map(item => item.salesAmount);

    return {
      labels,
      datasets: [
        {
          label: 'Product Sales',
          data: salesData,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  const processCategorySales = (data) => {
    const categories = [...new Set(data.map(item => item.category))];
    const salesData = categories.map(category => {
      return data
        .filter(item => item.category === category)
        .reduce((sum, item) => sum + item.salesAmount, 0);
    });

    return {
      labels: categories,
      datasets: [
        {
          label: 'Category Sales',
          data: salesData,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ]
    };
  };

  const productChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Sales',
      },
    },
  };

  const categoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Sales',
      },
    },
  };

  const columnDefs = [
    { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    { headerName: 'Quantity Sold', field: 'quantitySold', sortable: true, filter: true },
    { headerName: 'Sales Amount', field: 'salesAmount', sortable: true, filter: true },
  ];

  return (
    <div className="today-sales-dashboard">
      <h1>Today's Sales Dashboard</h1>
      
      {productSales.labels.length > 0 && categorySales.labels.length > 0 && (
        <div className="charts">
          <div className="chart">

            <Line data={productSales} options={productChartOptions} />
          </div>
          <div className="chart">
            <h2>Category Sales</h2>
            <Bar data={categorySales} options={categoryChartOptions} />
          </div>
        </div>
      )}
      
      <div className="table">
        <h2>Sales Details</h2>
        <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={tableData}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaySalesDashboard;