const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  
  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }
  

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {

    case 'version':
      require('./utils/version')(args)
      break

    case 'help':
      require('./utils/help')(args)
      break
    
    case 'create':
      require('./utils/create')(args)
      break

    default:
      console.error(`Opa! "${cmd}" comando inválido!`)
      break
  }
}