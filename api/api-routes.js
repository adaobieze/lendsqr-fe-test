const { NextApiRequest, NextApiResponse } = require('next');
const fs = require('fs');
const path = require('path');

// Define an index signature for the data object
const data = {};

async function handler(req, res) {
  // console.log('request:', req)
  const { method } = req;
  const { endpoint } = req.query;
  const { resourceId, data: newData } = req.body;
  // const { endpoint, resourceId, data: newData } = req.body;

  try {
    if (!endpoint) {
      res.status(400).json({ error: 'Endpoint not provided' });
      return;
    }

    // Convert endpoint to a string (if it's an array)
    const endpointString = Array.isArray(endpoint) ? endpoint[0] : endpoint;

    // Read data from the JSON file
    const filePath = path.join(process.cwd(), 'db.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const existingData = JSON.parse(jsonData);

    // Handle different CRUD operations based on the HTTP method
    switch (method) {
      case 'GET':
        // console.log('Fetching', endpointString) 
        // Read operation
        if (!existingData.hasOwnProperty(endpointString)) {
          res.status(404).json({ error: 'Endpoint not found' });
          return;
        }
        const responseData = existingData[endpointString] || [];
        res.status(200).json(responseData);
        // res.status(200).json({ status: 200, data: responseData, message: 'Data fetched successfully' });
        // console.log('fetch response', res)
        break;
      case 'POST':
        // Create operation
        existingData[endpointString] = [...(existingData[endpointString] || []), newData];
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        // res.status(201).json(newData);
        res.status(201).json({ status: 201, data: newData, message: 'Data created successfully' });
        // console.log('response:', res)
        break;
      case 'PATCH':
        // Update operation
        if (!existingData.hasOwnProperty(endpointString)) {
          res.status(404).json({ error: 'Endpoint not found' });
          return;
        }
        existingData[endpointString] = existingData[endpointString].map(item => {
          if (item.id === resourceId) {
            return { ...item, ...newData };
          }
          return item;
        });
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        res.status(200).json({ message: 'Resource updated successfully' });
        break;
      case 'DELETE':
        // Delete operation
        if (!existingData.hasOwnProperty(endpointString)) {
          res.status(404).json({ error: 'Endpoint not found' });
          return;
        }
        existingData[endpointString] = existingData[endpointString].filter(item => item.id !== resourceId);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        res.status(200).json({ message: 'Resource deleted successfully' });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = handler;
