const fs = require('fs');
const path = require('path');

async function handler(req, res) {
  const { method } = req;
  const { endpoint } = req.query;
  const { resourceId, data: newData, email, password } = req.body || {};

  try {
    const filePath = path.join(process.cwd(), 'db.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const existingData = JSON.parse(jsonData);

    // Login handling
    if (endpoint === 'login' && method === 'POST') {
      const user = existingData.appUsers.find((u) => u.email === email && u.password === password);
      if (user) {
        const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
        res.status(200).json({
          success: true,
          data: {
            token,
            user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, profilePhoto: user.profilePhoto, organizations: user.organizations}
          }
        });
      } else {
        res.status(401).json({ success: false, error: 'Invalid username and/or password' });
      }
      return;
    }

    // CRUD operations handling
    if (!endpoint) {
      res.status(400).json({ error: 'Endpoint not provided' });
      return;
    }

    const endpointString = Array.isArray(endpoint) ? endpoint[0] : endpoint;

    switch (method) {
      case 'GET':
        if (!existingData.hasOwnProperty(endpointString)) {
          res.status(404).json({ error: 'Endpoint not found' });
          return;
        }
        const responseData = existingData[endpointString] || [];
        res.status(200).json({ status: 200, data: responseData, message: 'Data fetched successfully' });
        break;
      case 'POST':
        existingData[endpointString] = [...(existingData[endpointString] || []), newData];
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        res.status(201).json({ status: 201, data: newData, message: 'Data created successfully' });
        break;
      case 'PATCH':
        if (!existingData.hasOwnProperty(endpointString)) {
          res.status(404).json({ error: 'Endpoint not found' });
          return;
        }
        const resourceToUpdate = existingData[endpointString].find(item => item.id === resourceId);
        if (!resourceToUpdate) {
          res.status(404).json({ error: 'Resource not found' });
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
        if (!existingData.hasOwnProperty(endpointString)) {
          res.status(404).json({ error: 'Endpoint not found' });
          return;
        }
        const resourceToDelete = existingData[endpointString].find(item => item.id === resourceId);
        if (!resourceToDelete) {
          res.status(404).json({ error: 'Resource not found' });
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = handler;