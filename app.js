
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

//onde se encontra a help
const controllerhelp = require('./controller/filme/controller_filme.js')

const controllerator = require('./controller/ator/controller_ator.js')
const controllerdiretor = require('./controller/diretor/controller_diretor.js')
const controllersexo = require('./controller/sexo/controller_sexo.js')
//const controller = require('./controller')
//const controller = require('./controller')

//import do arquivo de funções
//-------------------------filmes--------------------------xx
const filmerouter = require('./routes/filmes.router.js')
app.use('/v1/senai/locadora/filme', cors(), filmerouter)

//-------------------------genero--------------------------XX
//import do arquivo de rotas do genero
const generorouter = require('./routes/genero.router.js')
app.use('/v1/senai/locadora/genero', cors(), generorouter)

//----------------------classificação----------------------XX
const classificacaorouter = require('./routes/classificacao.router.js')
app.use('/v1/senai/locadora/classificacao', cors(), classificacaorouter)

//--------------------------sexo---------------------------XX
app.post('/v1/senai/locadora/sexo', bodyparserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllersexo.inserirnovosexo(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/sexo', async function(request, response) {
    let result = await controllersexo.listarsexo()

    response.status (result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/sexo/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllersexo.buscarsexo(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/senai/locadora/sexo/:id', bodyparserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllersexo.atualizarsexo(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/senai/locadora/sexo/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllersexo.excluirsexo(id)

    response.status(result.status_code)
    response.json(result)
})


//--------------------------ator----------------------------XX
app.post('/v1/senai/locadora/ator', bodyparserJSON, async function(request, response){
    let dados = request.body
    
    let contentType = request.headers['content-type']
    let result = await controllerator.inserirnovoator(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/ator', async function(request, response) {
    let result  = await controllerator.listarator()

    response.status (result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/ator/:id', async function(request, response) {
    let id = request.params.id

    let result  = await controllerator.buscarator(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/senai/locadora/ator/:id', bodyparserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerator.atualizarator(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/senai/locadora/ator/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerator.excluirator(id)

    response.status(result.status_code)
    response.json(result)
})


//------------------------diretor----------------------------XX
app.post('/v1/senai/locadora/diretor', bodyparserJSON, async function(request, response){
    let dados = request.body
    
    let contentType = request.headers['content-type']
    let result = await controllerdiretor.inserirnovo

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/diretor', async function(request, response) {
    let result = await

    response.status (result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/diretor/:id', async function(request, response) {
    let id = request.params.id

    let result = await

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/senai/locadora/diretor/:id', bodyparserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/senai/locadora/diretor/:id', async function(request, response) {
    let id = request.params.id
    let result = await

    response.status(result.status_code)
    response.json(result)
})




app.get('/v1/senai/locadora/help',  function (request, response) {
    let result = controllerhelp.help()
    let docAPI = {
        "api-description": "API para manipular dados de filmes de uma locadora",
        "date": "2026-05-06",
        "development": "Gabriel Renato",
        "version": 1.18,
        "endpoints": [
            {   "rota1": "/v1/senai/locadora/filme",
                "description": "Para adicionar um novo filme no Banco de Dados da locadora"
            },
            {   "rota2": "/v1/senai/locadora/filme",
                "description": "Retorna a lista de todos os filmes cadastrados na locadora"
            },
            {   "rota3": "/v1/senai/locadora/filme/:id",
                "description": "Retorna um filme buscando pelo id"
            },
            {   "rota4": "/v1/senai/locadora/filme/:id",
                "description": "Apaga o filme desejado pelo id"
            },
        ]
    }
    response.status(result.status_code)
    response.json(docAPI)
})


app.listen(7070, function(){
    console.log('API aguardadndo novas requisições ...')
})