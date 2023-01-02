const log = require('consola')
const fs = require('fs')

module.exports = (args) => {  
  fs.rmdir('.cache', { recursive: true }, err => {
    if (err) {
      throw err
    }
    console.log(`clear:cache\n`)
  })
  fs.rmdir('build', { recursive: true }, err => {
    if (err) {
      throw err
    }
    console.log(`clear:build\n`)
  })
}