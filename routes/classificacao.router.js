//import do express
const express = require('express')
const bodyparser = require('body-parser')

//permitindo a utilização do JSON no body das requisições
const bodyparserJSON = bodyparser.json()

//criando um objeto de rota para os andpoints de genero
const router = express.Router()

//import da controller do genero
const controllerclassificacao = require('../controller/classificacao/controller_classificacao.js')

//-----------------------classificação----------------------XX
router.post('/', bodyparserJSON, async function(request, response){
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerclassificacao.inserirnovaclassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})
router.get('/', async function(request, response) {
    let result = await controllerclassificacao.listarclassificacao()

    response.status (result.status_code)
    response.json(result)
})
router.get('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerclassificacao.buscarclassificacao(id)

    response.status(result.status_code)
    response.json(result)
})
router.put('/:id', bodyparserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerclassificacao.atualizarclassificacao(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})
router.delete('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerclassificacao.excluirclassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router