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
  const data = fs.readFileSync(`${set.dev.postsdir}/${postPath}.md`, "utf8");
  const content = fm(data);
  content.body = marked.marked(content.body);
  content.path = postPath;
  return content;
};

const genPostHTML = data => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <title>${data.attributes.title}</title>
    </head>
    <body>
        <header>
            <a href="/">Go back home</a>
        </header>
        <div class="content">
                <h1>${data.attributes.title}</h1>
            <p>${new Date(parseInt(data.attributes.date)).toDateString()}</p>
            <hr />
            ${data.body}
        </div>
    </body>
</html>
`;

const getPosts = posts => {
  posts.forEach(post => {
    if (!fs.existsSync(`${set.dev.outdir}/${post.path}`))
      fs.mkdirSync(`${set.dev.outdir}/${post.path}`);

    fs.writeFile(
      `${set.dev.outdir}/${post.path}/index.html`,
      genPostHTML(post),
      e => {
        if (e) throw e;
        console.log(`${post.path}/index.html foi criado com sucesso`);
      }
    );
  });
};

module.exports = {
 set,
 newPost: newPost,
 getPosts: getPosts,
 genPostHTML: genPostHTML
}