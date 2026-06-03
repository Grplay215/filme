const configmessages = require('../modulo/configMessages.js')

const sexoDAO = require('../../model/DAO/sexo/sexo.js')
const validarIDClassificacao = require('../classificacao/controller_classificacao.js')

const inserirnovosexo = async function(sexo, contentType) {

let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                        let validar = await validardados(sexo)
                        if (validar){
                            return validar
                        }else{
                            let dadostratados = await tratardados(sexo)
                            let resultado = await sexoDAO.insertsexo(dadostratados)
                            
                            if(resultado){
                                sexo.id = resultado
                                
                                vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_CREATED_ITEM.status
                                vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_CREATED_ITEM.status_code
                                vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_CREATED_ITEM.message
                                vegapunk.DEFAULT_MESSAGE.response = sexo
                                
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
const atualizarsexo = async function(sexo, contentType, id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                let resultbuscar = await validarIDClassificacao.buscarclassificacao(id)
                if(resultbuscar.status){
                    let validar = await validardados(sexo)

                    if(!validar){
                        sexo.id = Number(id)

                        let resultado = await sexoDAO.updatesexo(await tratardados(sexo))

                        if(resultado){
                            vegapunk.DEFAULT_MESSAGE.status         = vegapunk.SUCESS_UPDATED_ITEM.status
                            vegapunk.DEFAULT_MESSAGE.status_code    = vegapunk.SUCESS_UPDATED_ITEM.status_code
                            vegapunk.DEFAULT_MESSAGE.message        = vegapunk.SUCESS_UPDATED_ITEM.message
                            vegapunk.DEFAULT_MESSAGE.response       = sexo 
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
const listarsexo = async function() {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
            let result = await sexoDAO.selectALLsexo()
            if(result){

                if(result.length>0){
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.count = result.length
                    vegapunk.DEFAULT_MESSAGE.response.classificacao = result

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
const buscarsexo = async function(id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        let resultBuscar = await validarIDClassificacao.buscarclassificacao(id)
        if(resultBuscar.status){
            let result = await sexoDAO.selectByIdsexo(id)

            if(result){
                if(result.length>0){
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.classificacao = result

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
const excluirsexo = async function(id) {
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        
    } catch (error) {
        console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
const validardados = async function(sexo) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    if(sexo.sigla == undefined || sexo.sigla == null || sexo.sigla == '' || sexo.sigla.length > 3){
        vegapunk.ERROR_BAD_REQUEST.field = '[SIGLA] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }
    else if(sexo.sexo == undefined || sexo.sexo == null || sexo.sexo == '' || sexo.sexo.length > 15){
        vegapunk.ERROR_BAD_REQUEST.field = '[SEXO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else{
        return false 
    }
}
const tratardados = async function(sexo) {
    sexo.sigla =    sexo.sigla.replaceAll("'", "")
    sexo.sexo  =    sexo.sexo.replaceAll("'", "")

    return sexo
}

module.exports = {
    inserirnovosexo,
    atualizarsexo,
    listarsexo,
    buscarsexo,
    excluirsexo,
}