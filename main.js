const
 fs = require("fs");
 const config  = require("./config/config");
 const postMethods = require("./config/config");

 const posts = fs
  .readdirSync(config.set.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => postMethods.newPost(post));

  if (!fs.existsSync(config.set.dev.outdir)) fs.mkdirSync(config.set.dev.outdir);

  console.log(posts);
  config.getPosts(posts)