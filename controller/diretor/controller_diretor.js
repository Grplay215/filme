const configmessages = require('../modulo/configMessages.js')

const diretorDAO = require('../../model/DAO/diretor/diretor.js')


const inserirnovodiretor = async function(classificacao, contentType) {

let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        
    } catch (error) {
        //console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500 controll
    }
}
const atualizardiretor = async function(classificacao, contentType, id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        
    } catch (error) {
        console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listardiretor = async function() {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
            
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const buscardiretor = async function(id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {

       
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const excluirdiretor = async function(id) {
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        
    } catch (error) {
        console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validardados = async function() {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    if(classificacao.classificacao == undefined || classificacao.classificacao == null || classificacao.classificacao == '' || classificacao.classificacao.length > 40){
        vegapunk.ERROR_BAD_REQUEST.field = '[CLASSIFICACAO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else{
        return false 
    }
}
const tratardados = async function() {
    classificacao.classificacao =    classificacao.classificacao.replaceAll("'", "")

    return 
}

module.exports ={
    inserirnovo,
    atualizar,
    listar,
    buscar,
    excluir,
}
