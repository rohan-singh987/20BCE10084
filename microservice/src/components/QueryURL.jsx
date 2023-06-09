import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryURL = () => {
  const [urls, setUrls] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = urls.map(url => axios.get(url));
        const responses = await Promise.all(promises);
        const data = responses.map(response => response.data);
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const newUrls = inputValue
      .split('&url=')
      .map(url => url.replace('http://localhost:3001/numbers?url=', ''));

    setUrls(newUrls);
  };

  return (
    <div>
      <textarea
    rows={4}
    cols={50}  onChange={handleInputChange} />
      {results.map((result, index) => (
        <div key={index}>
          <h3>URL: {urls[index]}</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default QueryURL;
