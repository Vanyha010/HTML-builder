const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, "secret-folder");

fs.readdir(
  source,
  {withFileTypes: true},
  (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.stat(path.join(source, file.name), (error, stat) => {
        if (error) throw error;
        if (file.isFile()) {
          console.log(`${file.name.split('.')[0]}         ${path.extname(file.name)}       ${(stat.size / 1024).toFixed(2)}kb`);
        }
      })
    })
  }
)

