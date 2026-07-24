const configmessages = require('../modulo/configMessages.js')

const atorDAO = require('../../model/DAO/ator/ator.js')
const validarID = require('../classificacao/controller_classificacao.js')

const inserirnovoator = async function(ator, contentType) {

let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validardados(ator)

            if(validar){
                return validar
            }else{
                let dadostratados = await tratardados(ator)
                let resultado = await atorDAO.insertator(dadostratados)

                if(resultado){
                    ator.id = Number(resultado)
                                
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
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500 controll
    }
}
const atualizar = async function(ator, contentType, id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                            let resultbuscar = await validarID.buscarclassificacao(id)
                
                            if(resultbuscar.status){
                                let validar = await validardados(ator)
                
                                if(!validar){
                                    ator.id = Number(id)
                                    
                                    let resultado = await atorDAO.updateator(await tratardados(ator))
        
                                    if(resultado){
                                        vegapunk.DEFAULT_MESSAGE.status         = vegapunk.SUCESS_UPDATED_ITEM.status
                                        vegapunk.DEFAULT_MESSAGE.status_code    = vegapunk.SUCESS_UPDATED_ITEM.status_code
                                        vegapunk.DEFAULT_MESSAGE.message        = vegapunk.SUCESS_UPDATED_ITEM.message
                                        vegapunk.DEFAULT_MESSAGE.response       = ator
                
                                        return vegapunk.DEFAULT_MESSAGE
                                    }else{
                                        return vegapunk.ERROR_INTERNAL_SERVER_MODEL
                                    }
                                }else{
                                    return validar
                                }
                            }else{
                                return resultbuscar
                            }
                        }else{
                            return vegapunk.ERROR_CONTENT_TYPE
                        }

        
    } catch (error) {
        console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const listar = async function() {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
            let result = await atorDAO.selectALLator()
                        if(result){
            
                            if(result.length>0){
                                vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                                vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                                vegapunk.DEFAULT_MESSAGE.response.count = result.length
                                vegapunk.DEFAULT_MESSAGE.response.ator = result
            
                                return vegapunk.DEFAULT_MESSAGE
                            }else{
                                return vegapunk.ERROR_NOT_FOUND
                            }
                        }else{
                            return vegapunk.ERROR_INTERNAL_SERVER_MODEL
                        }
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const buscar = async function(id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {

        let resultBuscar = await validarID.buscarclassificacao(id)
                if(resultBuscar.status){
                    let result = await atorDAO.selectByIdator(id)
        
                    if(result){
                        if(result.length>0){
                            vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                            vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                            vegapunk.DEFAULT_MESSAGE.response.ator = result
        
                            return vegapunk.DEFAULT_MESSAGE //200
                    }else{
                        return vegapunk.ERROR_NOT_FOUND
                    }
                }else{
                    return vegapunk.ERROR_INTERNAL_SERVER_MODEL
                }
            }
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
const validardados = async function(ator) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    if(ator.nome == undefined || ator.nome == null || ator.nome == '' || ator.nome.length > 40){
        vegapunk.ERROR_BAD_REQUEST.field = '[ATOR] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else{
        return false 
    }
}
const tratardados = async function(ator) {
    ator.nome =    ator.nome.replaceAll("'", "")

    return ator
}

module.exports ={
    inserirnovoator,
    atualizar,
    listar,
    buscar,
    excluir,
}