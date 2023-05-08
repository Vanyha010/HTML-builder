const path = require('path');
const fs = require('fs');

const bundleDir = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundleDir, '', err => {
  if (err) throw err;
})

fs.readdir(
  path.join(__dirname, 'styles'),
  (err, files) => {
    if (err) throw err;
    files.forEach(item => {
      if (item.endsWith('.css')) {
        const readStream = fs.createReadStream(path.join(__dirname, 'styles', item), 'utf-8');
        readStream.on('data', data => fs.appendFile(bundleDir, data, err => {
          if (err) throw err;
        }))
      }
    })
  }
)