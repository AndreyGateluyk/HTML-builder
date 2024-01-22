const fs = require('fs');
const path = require('path');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundle, '', (error) => {
    if (error) {
      throw error;
    }
  });

fs.readdir('05-merge-styles/styles', {withFileTypes: true}, function(error, elements) {
  const bundleArr = [];
  elements.forEach((elem) => {
    if (path.extname(elem.name) === '.css' && elem.isFile() === true) {
      fs.readFile(`05-merge-styles/styles/${elem.name}`, (error, data) => {
        bundleArr.push(data.toString());
        fs.appendFile(bundle, data, (error) => {
          if (error) {
            throw error;
          }
        });
      });
    }
  });
});