// backend/api/data.js
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const dataPath = path.join(process.cwd(), 'AssetData.json');
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(jsonData);

  res.status(200).json(data);
}
