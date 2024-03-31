import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
// import StatisticsBox from './components/StatisticsBox';
// import BarChart from './components/Barchart';

function App() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(3);
  const [perPage, setPerPage] = useState(10);
  // const [statistics, setStatistics] = useState([]);
  // const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    console.log('Running useEffect');
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:4000/transactions',
        {
          params: {
            month,
            search,
            page,
            perPage,
          },
        },
      );
 
      setData(result.data?.transactions);
      console.log('updated data', data);
    };
 
    fetchData();
  }, [month, search, page]);

  // useEffect(() => {
  //   const fetchStatistics = async () => {
  //     const result = await axios('http://localhost:4000/statistics', {
  //       params: {
  //         month,
  //       },
  //     });
  //     setStatistics(result.data);
  //   };
  //   fetchStatistics();
  // }, []);

  // useEffect(() => {
  //   const fetchBarChartData = async () => {
  //     const result = await axios('http://localhost:4000/bar-chart', {
  //       params: {
  //         month,
  //       },
  //     });
  //     setBarChartData(result.data);
  //   };
  //   fetchBarChartData();
  // }, []);

  // const options = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];

  // set month

// update page value
const handlePageChange = (e) => {
  if (e.target.innerText === 'Next') {
    setPage(page + 1);
  } else {
    setPage(page - 1);
  }
};




  return (
    <>
      <h1>Hello from frontend</h1>
      {/* <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select> */}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* <StatisticsBox data={statistics} /> */}
      <TransactionsTable data={data} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>
    <button onClick={handlePageChange}>Previous</button>
    <button onClick={handlePageChange}>Next</button>
  </div>
  <p>page: {page}</p>
</div>
     
      {/* <BarChart data={barChartData} /> */}
    </>
  );
}

export default App;