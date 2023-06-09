const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;


app.get('/numbers', async (req, res) => {
    const urls =req.query.url
  
    if (!urls) {
      return res.status(400).json({ error: 'No URLs provided' });
    }
  
    const urlList = Array.isArray(urls) ? urls : [urls];
  
    try {
      const responseArray = await Promise.all(
        urlList.map(async (url) => {
            console.log(url);
          try {
            const response = await axios.get(url);
            if (response.status === 200) {
              const data = response.data;
              if (data && Array.isArray(data.numbers)) {
                const num = data.numbers.flat();
                console.log(num);
                const num1 = num.sort();
                console.log(num1);
                return num1;
              }
            }
          } catch (error) {
            console.error(`Failed to retrieve data from ${url}`, error);
          }
          return [];
        })
      );
  
      const numbers = responseArray.flat();
      res.json({ numbers });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

