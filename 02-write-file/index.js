const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(source, 'utf-8');
const { stdin, stdout } = process;

function exitNode() {
  stdout.write('Goodbye');
  process.exit();
}

stdout.write('Please, enter your message\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    exitNode();
  }
  writeStream.write(data);
})

process.on('SIGINT', exitNode);