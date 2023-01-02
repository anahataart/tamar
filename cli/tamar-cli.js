const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  
  let cmd = args._[0] || 'help'

  if (args.add || args.a) {
    cmd = 'add'
  }
  
  if (args.version || args.v) {
    cmd = 'version'
  }
  
  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {

    case 'version':
      require('./cmd/version')(args)
      break

    case 'help':
      require('./cmd/help')(args)
      break
    
    case 'create':
      require('./cmd/create')(args)
      break

    case 'serve':
      require('./cmd/serve')(args)
      break
    case 'build':
        require('./cmd/build')(args)
        break
    case 'add':
      require('./cmd/add')(args)
      break

    case 'pure':
      require('./cmd/pure')(args)
      break

    default:
      console.error(`Opa! "${cmd}" comando inválido!`)
      break
  }
}