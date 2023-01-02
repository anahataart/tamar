const log = require('consola')
const { exec } = require('child_process')

module.exports = (args) => {
  exec(`node main.js`, (err) => {
    if (err) {
      log.error("comando inválido: ", err)
      return
    }
  })
}