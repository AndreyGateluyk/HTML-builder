const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');
const copyPath =  path.resolve('04-copy-directory', 'files-copy');

fs.mkdir(copyPath, { recursive: true }, (error) => {
  if(error) {
    throw error;
  }
});

async function copyFiles(){
  try {
    const copiesFiles = await fsPromise.readdir('04-copy-directory/files-copy', {withFileTypes: true});
    console.log(copiesFiles);
    for (const elem of copiesFiles){
      fs.unlink(`04-copy-directory/files-copy/${elem.name}`, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Файл был удалён');
        }
      });
    }

    const elements = await fsPromise.readdir('04-copy-directory/files', {withFileTypes: true});

    for (const elem of elements) {
      if (elem.isFile()){
        fs.copyFile(`04-copy-directory/files/${elem.name}`, `04-copy-directory/files-copy/${elem.name}`, (error) => {
          if (error) {
            console.log(error);
          }
                
        });
      }
    }
  } catch(error) {
    console.log((error)); 
  }
}

copyFiles();