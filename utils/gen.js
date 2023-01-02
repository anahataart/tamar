var fs = require('fs');

function writerFilePost(path) {
  let folders = []
  const words = path.split('/');

  let res = ''
  for (i in words) {
      res += words[i]+"/"
    
    folders.push(words[i])
    if (i == words.length-2){
      break
    }
  }
  // create structure folders
  let cont = 0
  let sg = folders[0]+"/"
  for (x in folders) {
    const regex1 = new RegExp('undefined');
    if (regex1.test(folders[x-1]) == true) {
      
      console.log(`post create:        ${folders[cont]}`)
    } else {
      sg+=folders[cont]+"/"
      console.log(`post create:        ${sg}`)
      if (!fs.existsSync(folders[0])){
        fs.mkdirSync(folders[0], { recursive: true,  mode: 0o744 });
      }
      fs.mkdirSync(sg,{ recursive: true })
    }
    cont +=1
  }
  
  const
   pathFile = res+words[words.length-1],
   fName = words[words.length-1].split('.')[0],
   fileName = fName[0].toUpperCase() + fName.substring(1)
  
  let data = `
  ---
  title: ${fileName} Page
  date: "2020-02-28T22:19:00Z"
  description: This is a example to ${fName}  page.
  ---
  
  # this is an example of ${fName} page
  
  ${fileName} Page
  `
  fs.writeFile(pathFile, data,
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    },
    (err) => {
      if (err)
        console.log(err);
      else {
        console.log(`post create:        ${pathFile}`)
        console.log("\nsuccess:              OK");
      }
  });
}

module.exports = {
  writerFilePost
}