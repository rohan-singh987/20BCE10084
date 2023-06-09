const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

// app.get('/numbers', async (req, res) => {
//     // localhost:8008/numbers?url=http://104.211.219.98/numbers/primes&url=http://abc.com/fibo
//   const urls = req.query.url;
//   console.log(urls);
// console.log("hihii");
//   if (!urls) {
//     return res.status(400).json({ error: 'No URLs provided' });
//   }

// //   const urlList = Array.isArray(urls) ? urls : [urls];

// //   const numbers = [];
// //   try {
// //     for (const url of urlList) {
// //         console.log(url);
//       try {
//         const response = await axios.get(urls);
//         if (response.status === 200) {
//           const data = response.data;
//         //   if (data && Array.isArray(data)) {
//         //     numbers.push(...data);
//         //   }
//         console.log(data);
//         res.json(data)
//         }
//       } catch (error) {
//         console.error(`Failed to retrieve data from ${urls}`, error);
//       }
    
// //     console.log(numbers);
// //     console.log("helloooo");
// //     res.json({ numbers });
// //   } catch (error) {
// //     console.error('An error occurred:', error);
// //     res.status(500).json({ error: 'Internal server error' });
  
// });





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
                return data.numbers;
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

