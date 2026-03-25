const path = require('path');
const fs = require('fs');
const pagesPath = path.resolve(__dirname, '..', 'src', 'data', 'pages.json');
const data = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
console.log('Loaded pages:', data);
