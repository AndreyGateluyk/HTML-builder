const fs = require('fs');
const path = require('path');
const way = path.resolve('03-files-in-folder', 'secret-folder');

fs.readdir(way, {withFileTypes: true}, function(error, files) {
  for (let i = 0; i < files.length; i += 1) {
    let file = files[i];
    if (file.isFile() === true) {
      fs.stat(`03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
        console.log(`${file.name
          .split('.')
          .slice(0, -1)
          .join('.')} - ${path.extname(file.name)} - ${stats.size} bytes`);
      });
    }           
  }
});