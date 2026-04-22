
const express   = require ('express')
const cors      = require ('cors')
const bodyparser = require('body-parser')

//permitindo a utilização do body das requisições
const bodyparserJSON = bodyparser.json()

const app = express()

const corsOptions = {
    origin:['*'],    //configuração de origin da requisição (IP ou dominio)
    methods: 'GET, POST, PUT, DELETE, OPTION',  //configuração dos verbos q serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //configurações de permissões
                     //tipo de dados   //autorização de acesso
}

//aplica as configurações do cors no app (EXPRESS)
app.use(cors(corsOptions))

//importar controller
const controllerfilme = require('./controller/filme/controller_filme.js')

//import do arquivo de funções
app.post('/v1/senai/locadora/filme', bodyparserJSON, async function(request, response){
    //recebendo o body da requisição
    let dados = request.body
    
    //recebendo o tipo de dados da requisição para validar se é json
    let contentType = request.headers['content-type']

    let result = await controllerfilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)

})




app.listen(7070, function(){
    console.log('API aguardadndo novas requisições ...')
})