
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
const controllergenero = require('./controller/genero/controller_genero.js')

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
app.get('/v1/senai/locadora/filme', async function(request, response) {
    let result = await controllerfilme.listarfilme()

    response.status (result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/filme/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerfilme.buscarfilme(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/senai/locadora/filme/:id', bodyparserJSON, async function(request, response){
    //recebe o content-type para validar se é jsom
    let contentType = request.headers['content-type']

    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //recebe os dados do body q serão atualizados/modificados no BD
    let dados = request.body

    //chama a função para atualizar o filme, devemos encaminhar as 3 na mesma sequencia colocada na hr da criação da função na controller
    let result = await controllerfilme.atualizarfilme(dados, contentType, id)

   

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/senai/locadora/filme/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerfilme.excluirfilme(id)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/help',  function (request, response) {
    let result = controllerfilme.help()
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

//-------------------------genero--------------------------
app.post('/v1/senai/locadora/genero', bodyparserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllergenero.inserirnovogenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/genero', async function(request, response) {
    let result = await controllergenero.listargenero()

    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/senai/locadora/genero/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllergenero.excluirgenero(id)

    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/senai/locadora/genero/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllergenero.buscargenero(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/senai/locadora/genero/:id', bodyparserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllergenero.atualizargenero(dados, contentType, id)

    
    response.status(result.status_code)
    response.json(result)
})
app.listen(7070, function(){
    console.log('API aguardadndo novas requisições ...')
})