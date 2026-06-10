const configmessages = require('../modulo/configMessages.js')

const atorDAO = require('../../model/DAO/ator/ator.js')


const inserirnovo = async function(ator, contentType) {

let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validardados(ator)
            if(validar){
                return validar
            }else{
                let dadostratados = await tratardados(ator)
                let resultado = await atorDAO(dadostratados)

                if(resultado){
                    ator.id = resultado
                                
                                vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_CREATED_ITEM.status
                                vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_CREATED_ITEM.status_code
                                vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_CREATED_ITEM.message
                                vegapunk.DEFAULT_MESSAGE.response = ator
                                
                                return vegapunk.DEFAULT_MESSAGE
                }else{
                    return vegapunk.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return vegapunk.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        //console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500 controll
    }
}
const atualizar = async function(ator, contentType, id) {
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

    if(autor.nome == undefined || autor.nome == null || autor.nome == '' || autor.nome.length > 40){
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