const configmessages = require('../modulo/configMessages.js')

const atorDAO = require('../../model/DAO/ator/ator.js')


const inserirnovo = async function(classificacao, contentType) {

let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        
    } catch (error) {
        //console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500 controll
    }
}
const atualizar = async function(classificacao, contentType, id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        
    } catch (error) {
        console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listar = async function() {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
            
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const buscar = async function(id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {

       
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const excluir = async function(id) {
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

    return genero
}

module.exports ={
    inserirnovo,
    atualizar,
    listar,
    buscar,
    excluir,
}