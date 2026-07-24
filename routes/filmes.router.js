//import do express
const express = require('express')
const bodyparser = require('body-parser')

//permitindo a utilização do JSON no body das requisições
const bodyparserJSON = bodyparser.json()

//criando um objeto de rota para os andpoints de genero
const router = express.Router()

//import da controller do genero
const controllerfilme = require('../controller/filme/controller_filme')

//-------------------------------filmes-------------------------------
router.post('/', bodyparserJSON, async function(request, response){
    //recebendo o body da requisição
    let dados = request.body
    
    //recebendo o tipo de dados da requisição para validar se é json
    let contentType = request.headers['content-type']
    let result = await controllerfilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})
router.get('/', async function(request, response) {
    let result = await controllerfilme.listarfilme()

    response.status (result.status_code)
    response.json(result)
})
router.get('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerfilme.buscarfilme(id)

    response.status(result.status_code)
    response.json(result)
})
router.put('/:id', bodyparserJSON, async function(request, response){
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
router.delete('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerfilme.excluirfilme(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router