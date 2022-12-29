
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
    let dataConfig =  `\
  const
fm = require("front-matter"),
fs = require("fs");
const marked = require("marked");

const set = {
  dev: {
    postsdir: "./post",
    outdir: "./build"
  }
};

const newPost = postPath => {
  const data = fs.readFileSync(set.dev.postsdir+"/"+postPath+".md", "utf8");
  const content = fm(data);
  content.body = marked.marked(content.body);
  content.path = postPath;
  return content;
};
`+
"\nconst genPostHTML = data => \`\n<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\" />\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n      <meta name=\"description\" content=\"${data.attributes.description}\" />\n      <title>${data.attributes.title}</title>\n    </head>\n    <body>\n      <header>\n        <a href=\"/\">Go back home</a>\n      </header>\n      <div class=\"content\">\n          <h1>${data.attributes.title}</h1>\n      <p>${new Date(parseInt(data.attributes.date)).toDateString()}</p>\n           <hr />\n          ${data.body}\n       </div>\n    </body>\n</html>\n\
`;\n\nconst getPosts = posts => {\n  posts.forEach(post => {\n    if (!fs.existsSync(`${set.dev.outdir}/${post.path}`))\n      fs.mkdirSync(`${set.dev.outdir}/${post.path}`);\n    fs.writeFile(\n      `${set.dev.outdir}/${post.path}/index.html`,\n      genPostHTML(post),\n      e => {\n        if (e) throw e;\n        console.log(`${post.path}/index.html foi criado com sucesso`);\n      }\n    )\n  });\n};\n\nmodule.exports = {\n  set,\n  newPost: newPost,\n  getPosts: getPosts,\n  genPostHTML: genPostHTML\n}"

    let dataMarked =  
    `const marked = require("marked")\n\nmarked.setOptions({\n\
  renderer: new marked.Renderer(),
  highlight: function(code, language) {
    const hljs = require("highlight.js");
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

module.exports = marked
    `
    
    let dataPostHome =  ''



    let dataPackageJSON = 
      `{\n  "name": "tamar",\n  "version": "1.0.0",\n  "description":\
  "Tamar is a Static Generator Websites",\n  "main": "main.js",\n  \
"scripts": {\n    "build": "node ./main.js"\n  },\n \
"repository": {\n    "type": "git",\n    "url": "git+https://github.com/anahataart/tamar.git"\n  },\n \
 "dependencies": {\n    "front-matter": "^4.0.2",\n    "highlight.js": "^11.7.0",\n    "marked": "^4.2.5",\n    "minimist": "^1.2.7",\n    "readline": "^1.3.0"\n  }\n}`
  
    fs.writeFile(`${args._[1]}/post/home.md`, dataPostHome, (err) => {
      if (err)
        log.error(err);
        exit(0)
    });
    
    fs.writeFile(`${args._[1]}/package.json`, dataPackageJSON, (err) => {
      if (err)
        log.error(err);
        exit(0)
    });
    
    fs.writeFile(`${args._[1]}/config/config.js`, dataConfig, (err) => {
      if (err)
        log.error(err);
        exit(0)
    });
    
    fs.writeFile(`${args._[1]}/config/marked.js`, dataMarked, (err) => {
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