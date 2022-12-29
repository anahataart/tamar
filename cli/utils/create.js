
const fs = require("fs");
const log = require('consola')
var Spinner = require('../../spinner').Spinner;
const { exit } = require("process");


var spin = new Spinner('%s Gerando projeto... \n');
spin.setSpinnerString(5);

module.exports = (args) => {
  spin.start(); 
  
  try {
    fs.mkdirSync(args._[1])
    fs.mkdirSync(`${args._[1]}/post`)
    fs.mkdirSync(`${args._[1]}/static`)
    fs.mkdirSync(`${args._[1]}/config`)

    let data = ' dadada'
    let dataPackageJSON = 
      `{\n  "name": "tamar",\n  "version": "1.0.0",\n  "description":\
  "Tamar is a Static Generator Websites",\n  "main": "main.js",\n  \
"scripts": {\n    "build": "node ./main.js"\n  },\n \
"repository": {\n    "type": "git",\n    "url": "git+https://github.com/anahataart/tamar.git"\n  },\n \
 "dependencies": {\n    "front-matter": "^4.0.2",\n    "highlight.js": "^11.7.0",\n    "marked": "^4.2.5",\n    "minimist": "^1.2.7",\n    "readline": "^1.3.0"\n  }\n}`
  
    fs.writeFile(`${args._[1]}/post/home.md`, data, (err) => {
      if (err)
        log.error(err);
        exit(0)
    });
    
    fs.writeFile(`${args._[1]}/package.json`, dataPackageJSON, (err) => {
      if (err)
        log.error(err);
        exit(0)
    });
    
    fs.writeFile(`${args._[1]}/config/config.js`, data, (err) => {
      if (err)
        log.error(err);
        exit(0)
    });
    
    fs.writeFile(`${args._[1]}/config/marked.js`, data, (err) => {
      if (err)
        log.error(err);
        exit(0)
    });
    
  } catch (err) {
    log.error(new Error(err))
    exit(0)
  }
  spin.stop(); 
  log.success('Projeto construído com sucesso!')
}