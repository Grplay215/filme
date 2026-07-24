const configmessages = require('../modulo/configMessages.js')

const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')


const inserirnovaclassificacao = async function(classificacao, contentType) {

let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                let validar = await validardados(classificacao)
                if (validar){
                    return validar
                }else{
                    let dadostratados = await tratardados(classificacao)
                    let resultado = await classificacaoDAO.insertclassificacao(dadostratados)
    
                    if(resultado){
                        classificacao.id = resultado
                        
                        vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_CREATED_ITEM.status
                        vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_CREATED_ITEM.status_code
                        vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_CREATED_ITEM.message
                        vegapunk.DEFAULT_MESSAGE.response = classificacao
    
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

const atualizarclassificacao = async function(classificacao, contentType, id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                    let resultbuscar = await buscarclassificacao(id)
        
                    if(resultbuscar.status){
                        let validar = await validardados(classificacao)
        
                        if(!validar){
                            classificacao.id = Number(id)
                            
                            let resultado = await classificacaoDAO.updateclassificacao(await tratardados(classificacao))

                            if(resultado){
                                vegapunk.DEFAULT_MESSAGE.status         = vegapunk.SUCESS_UPDATED_ITEM.status
                                vegapunk.DEFAULT_MESSAGE.status_code    = vegapunk.SUCESS_UPDATED_ITEM.status_code
                                vegapunk.DEFAULT_MESSAGE.message        = vegapunk.SUCESS_UPDATED_ITEM.message
                                vegapunk.DEFAULT_MESSAGE.response       = classificacao
        
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
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarclassificacao = async function() {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        let result = await classificacaoDAO.selectALLclassificacao()
        
        if(result){

            if(result.length>0){
                vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                vegapunk.DEFAULT_MESSAGE.response.count = result.length
                vegapunk.DEFAULT_MESSAGE.response.classificacao = result

                return vegapunk.DEFAULT_MESSAGE
            }else {
                return vegapunk.ERROR_NOT_FOUND
            }
        }else{
            return vegapunk.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarclassificacao = async function(id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        if( id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
                    vegapunk.ERROR_BAD_REQUEST.field = '[ID] inválido'
                    return vegapunk.ERROR_BAD_REQUEST //400
                }else{
                    let result = await classificacaoDAO.selectByIdclassificacao(id)
        
                    if(result){
                        
                        if(result.length>0){
                            vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                            vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                            vegapunk.DEFAULT_MESSAGE.response.classificacao = result
        
                            return vegapunk.DEFAULT_MESSAGE //200
                        }else{
                            return vegapunk.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return vegapunk.ERROR_INTERNAL_SERVER_MODEL 
                    }
                }
       
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirclassificacao = async function(id) {
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        let validar = await buscarclassificacao(id)
        
                    if(validar.status){
                        let result = await classificacaoDAO.deleteclassificacao(id)
                        if(result){
        
                        vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_DELETE_ITEM.status
                        vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                        vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_DELETE_ITEM.message
        
                        return vegapunk.DEFAULT_MESSAGE
        
                        }else{
                            return vegapunk.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return validar
                    }

    } catch (error) {
        console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validardados = async function(classificacao) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    if(classificacao.idade == undefined     || classificacao.idade         == null || classificacao.idade         == '' || isNaN(classificacao.idade)){
        vegapunk.ERROR_BAD_REQUEST.field = '[CLASSIFICACAO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }
    else if(classificacao.descricao == undefined || classificacao.descricao     == null || classificacao.descricao     == '' || classificacao.descricao.length > 100){
        vegapunk.ERROR_BAD_REQUEST.field = '[CLASSIFICACAO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }
    else{
        return false 
    }
}

const tratardados = async function(classificacao) {

    classificacao.descricao =    classificacao.descricao.replaceAll("'", "")

    return classificacao
}

module.exports ={
    inserirnovaclassificacao,
    atualizarclassificacao,
    listarclassificacao,
    buscarclassificacao,
    excluirclassificacao,
}