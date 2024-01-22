const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');
const projectDist = path.join(__dirname, '/project-dist');
const projectHTML = path.join(__dirname, 'project-dist/index.html');
const projectStyle = path.join(__dirname, '/project-dist/style.css');
const projectAssets = path.join(__dirname, '/project-dist/assets');

fs.mkdir(projectDist, { recursive: true }, (error) => {
  if (error) {
    throw error;
  } 
});
fs.mkdir(projectAssets, { recursive: true }, (error) => {
  if (error) {
    throw error;
  } 
});
fs.writeFile(projectHTML, '', (error) => {
  if (error) {
    throw error;
  }
});
fs.writeFile(projectStyle, '', (error) => {
  if (error) {
    throw err;
  }
});


async function copyDirectory () {
  try {
    const assets = await fsPromise.readdir('06-build-page/assets', {withFileTypes: true});
    for (const folder of assets) {
      fs.mkdir(`06-build-page/project-dist/assets/${folder.name}`,
      { recursive: true }, 
      (error) => {
        if(error) {
          throw error;
        } 
      });
      
      const distFiles = await fsPromise.readdir(`06-build-page/project-dist/assets/${folder.name}`, {withFileTypes: true});
      for (const elem of distFiles) {
        fs.unlink(`06-build-page/project-dist/assets/${folder.name}/${elem.name}`, function(error){
          if (error) {
            console.log(error);
          } 
        });
      }

      const folders = await fsPromise.readdir(`06-build-page/assets/${folder.name}`, {withFileTypes: true});
      for (const elem of folders) {
        fs.copyFile(`06-build-page/assets/${folder.name}/${elem.name}`, 
        `06-build-page/project-dist/assets/${folder.name}/${elem.name}`, 
        (error) => {
          if (error) {
            console.log(error);
          }  
        });
        
      }
    }
  } catch(error) {
    console.log(error); 
  }
}


async function createTemplate() {
  try {
    const template = await fsPromise.readFile(__dirname + '/' + 'template.html');
    let templateStr = template.toString();
    const components = await fsPromise.readdir(__dirname + '/' + 'components', {withFileTypes: true});
    let nameChunk = '';
    
    for (const elem of components) {
      if (path.extname(elem.name) === '.html' && elem.isFile() === true){
        nameChunk = await fsPromise.readFile(__dirname + '/components/' + `${elem.name}`);
        templateStr = templateStr.replace(`{{${elem.name.slice(0, -5)}}}`, nameChunk.toString());
      }
    }
    fsPromise.writeFile(__dirname + '/project-dist/index.html', templateStr);
  } catch(error) {
    console.log(error); 
  }
}


async function mergeStyles() {
  try {
    const styles = await fsPromise.readdir(__dirname + '/' + 'styles', {withFileTypes: true});
    for (const elem of styles) {
      if (path.extname(elem.name) == '.css' && elem.isFile() === true) {
        let currentStyle = await fsPromise.readFile(__dirname + `/styles/${elem.name}`, 'utf-8');
        fs.appendFile((__dirname + '/project-dist/style.css'), currentStyle, (error) => {
            if (error) {
              throw error;
            }
          });
        }
      }
    } catch(error) {
      console.log((error)); 
    }
  }
  
  copyDirectory();
  createTemplate();
  mergeStyles();