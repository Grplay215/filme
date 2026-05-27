//import do arquivo de configurações de mensagens do projeto
const configmessages = require('../modulo/configMessages.js')

//import do arquivo do DAO para manipular os dados de filme no banco de dados
const filmegeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

//import das controllers
const controllerClassificacao = require('../classificacao/controller_classificacao.js')
const controllerGenero = require('../genero/controller_genero.js')

//função para inserir um novo filme
const inserirNovoFilmeGenero = async function(filmegenero) { 

    //criar uma copia dos json do arquivo de configuração de mensagens
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

try {
        
    //chama a função para validar a entrada dos dados do filme
    let validar =  await validardados(filmegenero)

    //retorna um json de erro caso algum atributo esetja ou seja invalido, senão retorna um false(n teve erro)
    if(validar){
        return validar //400
    }else{
        //encaminha os dados do filme para o DAO inserir no banco de dados
        let resultado = await filmegeneroDAO.insertfilmegenero(filmegenero)
       
        if(resultado){ //201
            //cria o id no json no filme e adiciona o ID gerado no DAO
            filmegenero.id = resultado

            vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_CREATED_ITEM.status
            vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_CREATED_ITEM.status_code
            vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_CREATED_ITEM.message
            vegapunk.DEFAULT_MESSAGE.response = filmegenero

            return vegapunk.DEFAULT_MESSAGE//201
        }else{ //erro 500(model)
           return vegapunk.ERROR_INTERNAL_SERVER_MODEL//500(model)
        }
        
    }
   
} catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
}

}

//função para atualizar filme existente
const atualizarfilmeGenero = async function(filmegenero, id) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

        try {
            
                //chama a função validar filme e validar se o id está correto, se ele existe no banco e se o filme existe
                let resultbuscarfilme = await buscarfilmeGenero(id)

                if(resultbuscarfilme.status){
                    //chama a função para validar os dados para alteração do filme (body)
                    let validar = await validardados(filmegenero)

                    if(!validar){

                        //adiciona um atributo id no json de filme, para enviar ao  dao um unico objeto
                        filmegenero.id = Number(id)

                        //chama a função para atualizar o filme no banco de dados
                        let result = await filmegeneroDAO.updatefilmegenero(filmegenero)

                        if(result){
                            vegapunk.DEFAULT_MESSAGE.status         = vegapunk.SUCESS_UPDATED_ITEM.status
                            vegapunk.DEFAULT_MESSAGE.status_code    = vegapunk.SUCESS_UPDATED_ITEM.status_code
                            vegapunk.DEFAULT_MESSAGE.message        = vegapunk.SUCESS_UPDATED_ITEM.message
                            vegapunk.DEFAULT_MESSAGE.response       = filmegenero

                            return vegapunk.DEFAULT_MESSAGE// 200 (atualização)
                        }else{
                            return vegapunk.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return validar //400 de validação dos campos do banco de dados
                    }
                }else {
                    return resultbuscarfilme //400(id invalido) ou 404(n encontrado) ou 500(controller ou dao)
                }
            
        } catch (error) {
            return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller
        }
}

//função para retornar todos os filmes existentes
const listarfilmeGenero = async function() {
    //criar uma copia dos json do arquivo de configuração de mensagens
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

        try {
            //chamando a função do DAO para retornar a lista de filme do Banco de Dado
            let result = await filmegeneroDAO.selectALLfilmegenero()
            
            //validação para verificar se o DAO conseguiu processar o script no banco de dados
            if(result){

                //validação para verificar se o conteudo do ARRAY tem dados de retorno ou ta vazio
                if(result.length>0){
                
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.count = result.length
                    vegapunk.DEFAULT_MESSAGE.response.filme_genero = result

                    return vegapunk.DEFAULT_MESSAGE
                }else {
                    return vegapunk.ERROR_NOT_FOUND//404
                }
            }else{
                return vegapunk.ERROR_INTERNAL_SERVER_MODEL//500(model)
            }

        } catch (error) {
            return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER//500(controller)
            
        }
}

//função  para retornar um filme filtrando pelo ID
const buscarfilmeGenero = async function(id) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        //validação para garantir q o id seja um numero valido
        if( id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            vegapunk.ERROR_BAD_REQUEST.field = '[ID] inválido'
            return vegapunk.ERROR_BAD_REQUEST //400
        }else{

        //chama a função do DAO para pesquiasar o filme pelo id
            let result = await filmegeneroDAO.selectByIdfilmegenero(id)

            //validação para verifiar se o DAO retornou dados ou um false
            if(result){
                //validação para verificar se o dao tem algum registro ou dado no array
                if(result.length>0){


                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.filme_genero = result

                    return vegapunk.DEFAULT_MESSAGE //200
                }else{
                    return vegapunk.ERROR_NOT_FOUND //404
                }
            }else{
                return vegapunk.ERROR_INTERNAL_SERVER_MODEL //500(model)
            }
        }

        
        
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER//500(controller)
    }

}

//função  para buscar os generos filtrando pelo ID do filme
const buscargenerosidfilme = async function(idfilme) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        //validação para garantir q o id seja um numero valido
        if( idfilme == undefined || String(idfilme).replaceAll(' ', '') == '' || idfilme == null || isNaN(idfilme) || idfilme <= 0){
            vegapunk.ERROR_BAD_REQUEST.field = '[ID_FILME] inválido'
            return vegapunk.ERROR_BAD_REQUEST //400
        }else{

        //chama a função do DAO para pesquiasar o filme pelo id
            let result = await filmegeneroDAO.selectgenerosByIdfilme(idfilme)

            //validação para verifiar se o DAO retornou dados ou um false
            if(result){
                //validação para verificar se o dao tem algum registro ou dado no array
                if(result.length>0){


                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.filme_genero = result

                    return vegapunk.DEFAULT_MESSAGE //200
                }else{
                    return vegapunk.ERROR_NOT_FOUND //404
                }
            }else{
                return vegapunk.ERROR_INTERNAL_SERVER_MODEL //500(model)
            }
        }

        
        
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER//500(controller)
    }

}

//função  para buscar os generos filtrando pelo ID do filme
const buscarfilmesidgenero = async function(idgenero) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        //validação para garantir q o id seja um numero valido
        if( idgenero == undefined || String(idgenero).replaceAll(' ', '') == '' || idgenero == null || isNaN(idgenero) || idgenero <= 0){
            vegapunk.ERROR_BAD_REQUEST.field = '[ID_GENERO] inválido'
            return vegapunk.ERROR_BAD_REQUEST //400
        }else{

        //chama a função do DAO para pesquiasar o filme pelo id
            let result = await filmegeneroDAO.selectfilmesByIdgenero(idgenero)

            //validação para verifiar se o DAO retornou dados ou um false
            if(result){
                //validação para verificar se o dao tem algum registro ou dado no array
                if(result.length>0){


                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.filme_genero = result

                    return vegapunk.DEFAULT_MESSAGE //200
                }else{
                    return vegapunk.ERROR_NOT_FOUND //404
                }
            }else{
                return vegapunk.ERROR_INTERNAL_SERVER_MODEL //500(model)
            }
        }

        
        
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER//500(controller)
    }

}

//função para excluir um filme
const excluirfilmeGenero =async function(id) {
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        //chama a função buscarfilme para validar se o filme existe
        let validarid = await buscarfilmeGenero(id)

        if(validarid.status){
            let result = await filmegeneroDAO.deletefilmegenero(id)
            if(result){

                vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_DELETE_ITEM.status
                vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_DELETE_ITEM.message

                return vegapunk.DEFAULT_MESSAGE
                
            } else{
                return vegapunk.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return validarid
        }
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para excluir a relação de generos com o filme
const excluirgenerosidfilme =async function(idfilme) {
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {

        
            let result = await filmegeneroDAO.deletegenerosByidFilme(idfilme)

            if(result){
                vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_DELETE_ITEM.status
                vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_DELETE_ITEM.message

                console.log(vegapunk.DEFAULT_MESSAGE)
                return vegapunk.DEFAULT_MESSAGE
                
            } else{
                return vegapunk.ERROR_INTERNAL_SERVER_MODEL
            }

        
    } catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para validar os dados do filme
const validardados = async function(filmegenero) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    if(filmegenero.id_filme                   == undefined                       || filmegenero.id_filme            == null         || filmegenero.id_filme            == ''         || isNaN(filmegenero.id_filme)  || filmegenero.id_filme <= 0){
        vegapunk.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST//400

    }
    else if(filmegenero.id_genero              == undefined                      || filmegenero.id_genero           == null         || filmegenero.id_genero           == ''         || isNaN(filmegenero.id_genero) || filmegenero.id_genero <= 0){
        vegapunk.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST//400

    } else{
        return false
    }
}


module.exports = {
    inserirNovoFilmeGenero,
    atualizarfilmeGenero,
    listarfilmeGenero,
    buscarfilmeGenero,
    excluirfilmeGenero,
    buscarfilmesidgenero,
    buscargenerosidfilme,
    excluirgenerosidfilme
}