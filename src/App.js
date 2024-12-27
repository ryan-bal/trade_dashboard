import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await fetch('https://c2ibhub5n8.execute-api.us-east-1.amazonaws.com/calcProfit?table=morningOITrades', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) { // Use res.ok for checking successful status codes (200-299)
          const errorData = await res.json()
          throw new Error(`HTTP error! status: ${res.status} - ${errorData?.message || res.statusText}`);
        }

        const jsonData = await res.json();
        setData(jsonData["total_profit"]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); // Set loading to false after fetching (success or failure)
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h3>Welcome to My React App!</h3>
      <pre>OITrade profit:</pre> {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Display the data in a readable format
        //Or access the data like data.someProperty
      )}
    </div>
  );
};

export default App;
