const menus = {
  main: `
    tamar [command] <options>

    * Lista de comandos

    create ............ criar novo website
    add ............ adicionar um novo post
    build ............ gerar projeto
    serve ............ iniciar um servidor local
    deploy ............ publicar seu website
    pure ............ limpar cache
    version ............ exibir versão
    help ............... exibir manual tamar`,

  build: `
    tamar build <options>

    --theme, -t ..... adicione um tema padrão
    --deploy, -d ..... faça implantacão após ser o site ser gerado

    `,
  
  create: `
    tamar create <options>

    --port, -p ..... especifique a porta do servidor

    `,

  serve: `
    tamar serve <options>

    --port, -p ..... especifique a porta
    --logs, -l ..... ative logs para o servidor
    `,
  deploy: `
    tamar deploy <options>

    --aws, -a ..... implantar site no Amazon Web Services
    --gcloud, -gc ..... implantar site no Google Cloud
    --github, -gh ..... implantar site no GitHub
    --bwc, -b ..... implantar site no Barca Cloud
    --heroku, -h ..... implantar site no Heroku
    --vercel, -v ..... implantar site no Vercel
    `,

}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}