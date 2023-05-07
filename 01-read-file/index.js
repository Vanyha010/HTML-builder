const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(source, 'utf-8');
stream.on('data', data => console.log(data));