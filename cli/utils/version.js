const { version } = require('../../package.json')

module.exports = (args) => {
  console.log(`Versão atual: v${version}`)
}