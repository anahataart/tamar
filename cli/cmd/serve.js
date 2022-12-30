const log = require('consola')
const { exec } = require('child_process')

module.exports = (args) => {
  const PORT =  args.port || 4020

  exec(`node http.js --port ${PORT}`, (err, output) => {
    if (err) {
      log.error("comando inválido: ", err)
      return
    }
  })
  console.log(`\n
  Tamar.js  by  Anahata Art Studios


Watch:                  disabled. Enable with --watch -w
Acesse seu site:        http://localhost:${PORT}
Executando...           pressione CTRL-C para sair.
  `)
}