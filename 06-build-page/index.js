const path = require('path');
const fs = require('fs');
const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
const distDir = path.join(__dirname, 'project-dist');

fs.mkdir(distDir, {recursive: true}, err => {
  if (err) throw err;
})

const componentsDir = path.join(__dirname, 'components');

// Callback hell, but works
stream.on('data', data => {
  fs.readdir(
    componentsDir,
    {withFileTypes: true},
    (err, files) => {
      if (err) throw err;
      const tagsArray = files.map(item => path.parse(item.name).name);
      tagsArray.forEach(elem => {
        const readStream = fs.createReadStream(path.join(componentsDir, `${elem}.html`), 'utf-8');
        readStream.on('data', code => {
          data = data.replace(`{{${elem}}}`, code)
          fs.writeFile(
            path.join(distDir, 'index.html'),
            data,
            err => {
              if (err) throw err;
            }
          )
        });
      })  
    }
  )
})


// merge css (callback hell again)

const distStyle = path.join(distDir, 'style.css');

fs.writeFile(distStyle, '', err => {
  if (err) throw err;
})

fs.readdir(
  path.join(__dirname, 'styles'),
  (err, files) => {
    if (err) throw err;
    files.forEach(item => {
      if (item.endsWith('.css')) {
        const readStream = fs.createReadStream(path.join(__dirname, 'styles', item), 'utf-8');
        readStream.on('data', data => fs.appendFile(distStyle, data, err => {
          if (err) throw err;
        }))
      }
    })
  }
)

// Copy folder

function deepCopy(source, dest) {
  fs.mkdir(dest, {recursive: true}, err => {
    if (err) throw err;
  })
  fs.readdir(
    source,
    {withFileTypes: true},
    (err, items) => {
      if (err) throw err;
      items.forEach(item => {
        fs.stat(path.join(source, item.name), (error, stat) => {
          if (stat.isDirectory()) {
            deepCopy(path.join(source, item.name), path.join(dest, item.name));
          } else if (stat.isFile()) {
            fs.createReadStream(path.join(source, item.name)).pipe(fs.createWriteStream(path.join(dest, item.name)));
          }
        })
      })
    }
    )
}

deepCopy(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));