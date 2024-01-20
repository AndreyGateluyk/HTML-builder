const fs = require('fs');
const process = require('process');
const path = require('path');
const  { stdin } = process;

const writeStream = fs.createWriteStream(path.join(__dirname, 'my-text.txt'));
console.log('Введите текст');

stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    console.log('Выход!');
    process.exit();
  }
  console.log('Введите текст');
  writeStream.write(data);
})

stdin.resume();

process.on('SIGINT', () => {
  console.log('Выход!');
  process.exit();
})


