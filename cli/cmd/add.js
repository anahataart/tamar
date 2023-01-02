const { writerFilePost } = require("../../utils/gen")


module.exports = (args) => {
  writerFilePost('post/'+args._[1]) 

}