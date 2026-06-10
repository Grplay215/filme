//import do express
const express = require('express')
const bodyparser = require('body-parser')

//permitindo a utilização do JSON no body das requisições
const bodyparserJSON = bodyparser.json()

//criando um objeto de rota para os andpoints de genero
const router = express.Router()

//import da controller do genero
const controllergenero = require('../controller/genero/controller_genero.js')

//-------------------------genero--------------------------
router.post('/', bodyparserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllergenero.inserirnovogenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})
router.get('/', async function(request, response) {
    let result = await controllergenero.listargenero()

    response.status(result.status_code)
    response.json(result)
})
router.delete('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllergenero.excluirgenero(id)

    response.status(result.status_code)
    response.json(result)
})
router.get('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllergenero.buscargenero(id)

    response.status(result.status_code)
    response.json(result)
})
router.put('/:id', bodyparserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllergenero.atualizargenero(dados, contentType, id)


    response.status(result.status_code)
    response.json(result)
})

//export do objeto de rotas do genero
module.exports = router