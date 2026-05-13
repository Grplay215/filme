//import do arquivo de configurações de mensagens do projeto
const configmessages = require('../modulo/configMessages.js')

//import do arquivo do DAO para manipular os dados de filme no banco de dados
const generoDAO = require('../../model/DAO/genero/genero.js')


const inserirnovogenero = async function(genero, contentType) {

let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validardados(genero)
            if (validar){
                return validar
            }else{
                let dadostratados = await tratardados(genero)
                let resultado = await generoDAO.insertgenero(dadostratados.genero)

                if(resultado){
                    genero.id = resultado
                    
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_CREATED_ITEM.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_CREATED_ITEM.status_code
                    vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_CREATED_ITEM.message
                    vegapunk.DEFAULT_MESSAGE.response = genero

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
const atualizargenero = async function(genero, contentType, id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultbuscar = await buscargenero(id)

            if(resultbuscar.status){
                let validar = await validardados(genero)

                if(!validar){
                    genero.id = Number(id)
                    let dadostratados = await tratardados(genero)
                    let resultado = await generoDAO.updategenero({
                        id: genero.id,
                        genero: dadostratados.genero})

                    if(resultado){

                        vegapunk.DEFAULT_MESSAGE.status         = vegapunk.SUCESS_UPDATED_ITEM.status
                        vegapunk.DEFAULT_MESSAGE.status_code    = vegapunk.SUCESS_UPDATED_ITEM.status_code
                        vegapunk.DEFAULT_MESSAGE.message        = vegapunk.SUCESS_UPDATED_ITEM.message
                        vegapunk.DEFAULT_MESSAGE.response       = genero

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
const listargenero = async function() {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {

        let result = await generoDAO.selectALLgenero()

            if(result){

                if(result.length>0){
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.count = result.length
                    vegapunk.DEFAULT_MESSAGE.response.genero = result

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
const buscargenero = async function(id) {
let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {

        if( id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            vegapunk.ERROR_BAD_REQUEST.field = '[ID] inválido'
            return vegapunk.ERROR_BAD_REQUEST //400
        }else{
            let result = await generoDAO.selectByIdGenero(id)

            if(result){
                
                if(result.length>0){
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.filme = result

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
const excluirgenero = async function(id) {
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        let validar = await buscargenero(id)

            if(validar.status){
                let result = await generoDAO.deletegenero(id)
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

const validardados = async function(genero) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    if(genero.genero == undefined || genero.genero == null || genero.genero == '' || genero.genero.length > 40){
        vegapunk.ERROR_BAD_REQUEST.field = '[GENERO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else{
        return false 
    }
}
const tratardados = async function(genero) {
    genero.genero =    genero.genero.replaceAll("'", "")

    return genero
}

module.exports ={
    inserirnovogenero,
    atualizargenero,
    listargenero,
    buscargenero,
    excluirgenero
}