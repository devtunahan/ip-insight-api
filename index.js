const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const countryFlags = require('./countrys_flags');
const app = express();

app.use(express.static('./'));


// Endpoint for getting the IP Address
app.get('/ip', async (req, res) => {
 axios.get('https://api.ipify.org?format=json')
  .then(response => {
    const ip = JSON.stringify(response.data.ip).replace(/"/g, '');
    res.send(ip)
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });
});

// Getting data with IP Address
app.get('/ip/:ipAddress', async (req, res) => {
  const ipAddress = req.params.ipAddress;
  const apiResponse = {};
  axios.get(`http://ip-api.com/json/${ipAddress}`)
  .then(response => {
    const ipMetaData = response.data;
    const country = ipMetaData.country;
    const countryFlagSrc = countryFlags.getCountry(country);    
    Object.assign(apiResponse,ipMetaData,{"countryFlagSrc": countryFlagSrc})
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).send('Error fetching IP data');
  });

  axios.get(`https://timeapi.io/api/Time/current/ip?ipAddress=${ipAddress}`)
  .then(response => {
    const timezone = response.data;
    Object.assign(apiResponse,{"timezone": timezone});
    res.send(apiResponse);
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).send('Error fetching timezone data');
  });
});


app.get('/scan-ports/:ipAddress/:startPort/:endPort', async (req, res) => {
  const ipAddress = req.params.ipAddress;
  const startPort = parseInt(req.params.startPort);
  const endPort = parseInt(req.params.endPort);
  const openPorts = [];

  // Perform port scanning
  for (let port = startPort; port <= endPort; port++) {
    const nc = new netcat().addr(ipAddress).port(port).setTimeout(1000);

    nc.on('open', () => {
      openPorts.push(port);
      nc.close();
    });

    nc.on('close', () => {
      if (port === endPort) {
        res.json({ openPorts });
      }
    });

    nc.on('error', (err) => {
      console.error(`Error scanning port ${port}: ${err.message}`);
      nc.close();
    });

    nc.open();
  }
});


// Start the Express server
const port = 3000; // You can choose any port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
