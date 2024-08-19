import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./styles.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesComparisonDashboard = () => {
  const [date1, setDate1] = useState('2023-08-01');
  const [date2, setDate2] = useState('2023-08-02');
  const [comparisonData, setComparisonData] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (date1 && date2) {
      fetchComparisonData();
    }
  }, [date1, date2]);

  const fetchComparisonData = () => {
    // Simulate API call with mock data
    const mockData = [
      { productName: 'Product A', category: 'Electronics', date1Sales: 1000, date2Sales: 1200 },
      { productName: 'Product B', category: 'Clothing', date1Sales: 800, date2Sales: 750 },
      { productName: 'Product C', category: 'Electronics', date1Sales: 1500, date2Sales: 1600 },
      { productName: 'Product D', category: 'Food', date1Sales: 600, date2Sales: 650 },
      { productName: 'Product E', category: 'Clothing', date1Sales: 1250, date2Sales: 1300 },
      { productName: 'Product F', category: 'Home & Garden', date1Sales: 950, date2Sales: 1100 },
      { productName: 'Product G', category: 'Beauty', date1Sales: 720, date2Sales: 780 },
      { productName: 'Product H', category: 'Electronics', date1Sales: 2000, date2Sales: 1900 },
      { productName: 'Product I', category: 'Food', date1Sales: 450, date2Sales: 500 },
      { productName: 'Product J', category: 'Clothing', date1Sales: 1100, date2Sales: 1050 },
      { productName: 'Product K', category: 'Home & Garden', date1Sales: 850, date2Sales: 900 },
    ];

    setTableData(mockData.map(item => ({
      ...item,
      difference: item.date2Sales - item.date1Sales
    })));
    setComparisonData(processComparisonData(mockData));
  };

  const processComparisonData = (data) => {
    const productLabels = data.map(item => item.productName);
    const categoryLabels = [...new Set(data.map(item => item.category))];

    const productComparison = {
      labels: productLabels,
      datasets: [
        {
          label: date1,
          data: data.map(item => item.date1Sales),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: date2,
          data: data.map(item => item.date2Sales),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    const categoryComparison = {
      labels: categoryLabels,
      datasets: [
        {
          label: date1,
          data: categoryLabels.map(category => 
            data.filter(item => item.category === category)
                .reduce((sum, item) => sum + item.date1Sales, 0)
          ),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: date2,
          data: categoryLabels.map(category => 
            data.filter(item => item.category === category)
                .reduce((sum, item) => sum + item.date2Sales, 0)
          ),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return { productComparison, categoryComparison };
  };

  const comparisonChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Comparison',
      },
    },
  };

  const columnDefs = [
    { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    { headerName: `${date1} Sales`, field: 'date1Sales', sortable: true, filter: true },
    { headerName: `${date2} Sales`, field: 'date2Sales', sortable: true, filter: true },
    { headerName: 'Difference', field: 'difference', sortable: true, filter: true },
  ];

  return (
    <div className="sales-comparison-dashboard">
      <h1>Sales Comparison Dashboard</h1>
      
      <div className="date-selectors">
        <input 
          type="date" 
          value={date1} 
          onChange={(e) => setDate1(e.target.value)} 
        />
        <input 
          type="date" 
          value={date2} 
          onChange={(e) => setDate2(e.target.value)} 
        />
      </div>
      
      {comparisonData.productComparison && (
        <div className="charts">
          <div className="chart">
  
            <Bar data={comparisonData.productComparison} options={comparisonChartOptions} />
          </div>
          <div className="chart">
            <h2>Category Sales Comparison</h2>
            <Bar data={comparisonData.categoryComparison} options={comparisonChartOptions} />
          </div>
        </div>
      )}
      
      <div className="table">
        <h2>Sales Comparison Details</h2>
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

export default SalesComparisonDashboard;