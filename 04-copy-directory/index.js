const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'files');


fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, err => {
  if (err) throw err;
})

fs.readdir(
  source,
  {withFileTypes: true},
  (err, files) => {
    if (err) throw err;
    files.forEach(item => {
      const dest = path.join(__dirname, 'files-copy', item.name);
      fs.writeFile(
        dest,
        '',
        (err) => {
          if (err) throw err;
        }
      )
      if (item.isFile()) {
        fs.copyFile(path.join(source, item.name), dest, err => {
          if (err) throw err;
        })
      }
    })
  }
)

