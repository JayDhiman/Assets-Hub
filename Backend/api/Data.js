import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    const { query } = req;

    // Define the path to your JSON file
    const jsonFilePath = path.join(__dirname, '..', 'backend', 'AssetData.json');

    // Read the JSON file
    const jsonData = await fs.readFile(jsonFilePath, 'utf8');

    // Parse JSON data
    const data = JSON.parse(jsonData);

    // Check the query parameters to determine what data to return
    if (query.type === 'Assets') {
      res.status(200).json(data.Assets);
    } else if (query.type === 'Category') {
      res.status(200).json(data.category);
    } else if (query.type === 'Software') {
      res.status(200).json(data.Software);
    } else if (query.type === 'Employee') {
      res.status(200).json(data.Employee);
    } else {
      res.status(400).json({ error: 'Invalid type parameter' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
