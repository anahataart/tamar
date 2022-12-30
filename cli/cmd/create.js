
const fs = require("fs");
const log = require('consola')
const { exec } = require('child_process')
var Spinner = require('../../spinner').Spinner;

var spin = new Spinner('%s Gerando projeto... \n');
spin.setSpinnerString(5);

module.exports = (args) => {
  spin.start(); 
  
  try {
    var d = new Date();
    var dateNow = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      
    let folders = [`${args._[1]}`, `${args._[1]}/.cache`, `${args._[1]}/post`, `${args._[1]}/static`, `${args._[1]}/config`, `${args._[1]}/config/template`]
    let files = [
      {
        path: `${args._[1]}/main.js`,
        data:  `\
const fs = require("fs");
const config = require("./config/config");
const postMethods = require("./config/config");
const homePage = require("./config/template/home")

const posts = fs
  .readdirSync(config.set.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => postMethods.newPost(post))
  .sort(function(a, b) {
    return b.attributes.date - a.attributes.date;
  });

  if (!fs.existsSync(config.set.dev.outdir)) fs.mkdirSync(config.set.dev.outdir);

  config.getPosts(posts);
  homePage(posts)

        `
      },
      {
        path: `${args._[1]}/.gitignore`,
        data:  `\
node_modules/*
.cache/*
package-lock.json
      `
      },
      {
        path: `${args._[1]}/post/home.md`,
        data:  `\
---
title: Home Page
date: "${dateNow}"
description: Tamar example home page.
---

# exemplo de página statica gerada por Tamar.js

Welcome To Tamar.js framework
            
      `
      },
      {
        path: `${args._[1]}/http.js`,
        data: "const http = require('http')\nconst fs = require('fs')\nconst minimist = require('minimist')\nconst args = minimist(process.argv.slice(2))\nconst PORT = process.env.PORT || args.port\n\nreturn fs.readFile(__dirname+'/build/index.html', function(error, html) {\n  if (error) throw error;\n  http.createServer(function(request, response) {\n    response.writeHeader(200, { \"Content-Type\": \"text/html\"});\n    response.write(html);\n    response.end();\n  }).listen(PORT)\n\nconsole.log(\"\\n  Tamar.js  by  Anahata Art Studios\\n\\n   Watch:          disabled. Enable with --watch -w\\n   Acesse seu site:          http://localhost:\"+PORT+\" \\n   Executando...         pressione CTRL-C para sair.\")\n})"
      },
      {
        path: `${args._[1]}/package.json`,
        data:    `
{\n  "name": "tamar",\n  "version": "1.0.0",\n  "description":\
  "Tamar.js is a Static Generator Websites",\n  "main": "main.js",\n  \
"scripts": {\n    "build": "node ./main.js"\n  },\n \
"repository": {\n    "type": "git",\n    "url": "git+https://github.com/anahataart/tamar.git"\n  },\n \
  "dependencies": {\n    "front-matter": "^4.0.2",\n    "highlight.js": "^11.7.0",\n    "marked": "^4.2.5",\n    "minimist": "^1.2.7",\n    "readline": "^1.3.0",\n    "dotenv": "^16.0.3"\n  }\n}`      
      },
      {
        path: `${args._[1]}/.env`,
        data:  `\
PROJECT_NAME=${args._[1]}
PORT=4020
        `
      },
      {
        path: `${args._[1]}/config/config.js`,
        data:  `\
        const
fm = require("front-matter"),
fs = require("fs");
const marked = require("marked");

const set = {
  title: "TamarJS",
  description: "Exemplo de descrição",
  author: "Nome do Autor",
  twitter: "username",
  instagram: "username",
  facebook: "username",
  github: "username",
  behance: "username",
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
      
      },
      {
        path: `${args._[1]}/config/marked.js`,
        data:  `
const marked = require("marked")\n\nmarked.setOptions({\n\
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
      },
      {
        path: `${args._[1]}/config/template/home.js`,
        data:  "const fs = require(\"fs\");\nconst config = require(\"../config\");\nconst homepage = posts =>\`\n<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\" />\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n      <meta name=\"description\" content=\"${config.set.description}\"/>\n      <title>${config.set.title}</title>\n    </head>\n    <body>\n      <div>\n        <header>\n          <h1>${config.set.title}</h1>\n          <p>-<p>\n          <p>Blog escrito por ${config.set.author}, ${config.set.about}.</p>\n          <hr/>\n        </header>\n        <div>\n          ${posts\n            .map(\n             post => `<div>\n             <h3><a href=\"./${post.path}\">${post.attributes.title}</a></h3>\n               <small>${new Date(parseInt(post.attributes.date)).toDateString()}</small>\n                <p>${post.attributes.description}</p>\n              </div>`\n            )\n              .join(\"\")}\n            </div>\n            <footer>\n              ${`<p>© ${new Date().getFullYear()} ${config.set.author}`}\n            </footer>\n          </div>\n        </body>\n</html>\n`;\n\nconst homePage = posts => {\n  fs.writeFile(`${config.set.dev.outdir}/index.html`, homepage(posts), e => { \n    if (e) throw e;\n  });\n};\n\nmodule.exports = homePage;"
      },
      {
        path: `${args._[1]}/.cache/pcks.bat`,
        data:  `\
@ECHO OFF
cd ..
npm i
        `
      },
      {
        path: `${args._[1]}/.cache/init.vbs`,
        data:  `\
Set objShell = WScript.CreateObject("WScript.Shell")
objShell.Run("pcks.bat"), 0, True
      `
      },
    ]
    // create structure folders
    for (x in folders) {
      fs.mkdirSync(folders[x])
    }
    // create structure files
    for (y in files) {
  
      fs.writeFile(files[y].path, files[y].data, (err) => {
        if (err)
          log.error(err);
          return
      });
    }
    
    log.info('Instalando pacotes...')
    exec(`cd ${args._[1]}/.cache && wscript ./init.vbs`, (err, output) => {
      if (err) {
        log.error("could not execute command: ", err)
        return
      }
      log.success('Pacotes instalados com sucesso!')
      
      exec(`cd ${args._[1]} && npm run build && node http.js --port ${args.port || 4020}`, (err, output) => {
        if (err) {
          log.error("could not execute command: ", err)
          return
        } 
      })
      console.log(`\n
          Tamar.js  by  Anahata Art Studios


      Watch:                  disabled. Enable with --watch -w
      Acesse seu site:        http://localhost:${args.port || 4020}
      Executando...           pressione CTRL-C para sair.
        `)
    })
 
  } catch (err) {
    log.error(new Error(err))
  }
  spin.stop();
}