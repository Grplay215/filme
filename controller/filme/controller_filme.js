/**************************************************************************************
 * objetivo: arquivi responsavel pela validação, tratamento, manipulação de dados para
 *      realizar o CRUD de filme
 * data: 17/04/20206
 * autor: Gabriel Renato
 * versão: 1.0
 **************************************************************************************/
//import do arquivo de configurações de mensagens do projeto
const configmessages = require('../modulo/configMessages.js')

//import do arquivo do DAO para manipular os dados de filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')


//função para inserir um novo filme
const inserirNovoFilme = async function(filme, contentType) { 
    //console.log(filme)

    //criar uma copia dos json do arquivo de configuração de mensagens
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

try {
        
    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
    //chama a função para validar a entrada dos dados do filme
    let validar =  await validardados(filme)

    //retorna um json de erro caso algum atributo esetja ou seja invalido, senão retorna um false(n teve erro)
    if(validar){
        return validar //400
    }else{
        //encaminha os dados do filme para o DAO inserir no banco de dados
        let resultado = await filmeDAO.insertFilme(filme)
        //console.log(resultado)
        if(resultado){ //201
            vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_CREATED_ITEM.status
            vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_CREATED_ITEM.status_code
            vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_CREATED_ITEM.message

            return vegapunk.DEFAULT_MESSAGE//201
        }else{ //erro 500(model)
           return vegapunk.ERROR_INTERNAL_SERVER_MODEL//500(model)
        }
        
    }
    } else{
        return vegapunk.ERROR_CONTENT_TYPE
    } 
} catch (error) {
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500(controller)
}

}

//função para atualizar filme existente
const atualizarfilme = async function(filme, contentType, id) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

        try {
            //validação para verificar se o conteudo é um json
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                //chama a função validar filme e validar se o id está correto, se ele existe no banco e se o filme existe
                let resultbuscarfilme = await buscarfilme(id)

                if(resultbuscarfilme.status){
                    //chama a função para validar os dados para alteração do filme (body)
                    let validar = await validardados(filme)

                    if(!validar){

                        //adiciona um atributo id no json de filme, para enviar ao  dao um unico objeto
                        filme.id = Number(id)

                        //chama a função para atualizar o filme no banco de dados
                        let result = await filmeDAO.updatFilme(filme)

                        if(result){
                            vegapunk.DEFAULT_MESSAGE.status         = vegapunk.SUCESS_UPDATED_ITEM.status
                            vegapunk.DEFAULT_MESSAGE.status_code    = vegapunk.SUCESS_UPDATED_ITEM.status_code
                            vegapunk.DEFAULT_MESSAGE.message        = vegapunk.SUCESS_UPDATED_ITEM.message

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
            }else{
                return vegapunk.ERROR_CONTENT_TYPE
            }
            
        } catch (error) {
            return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller
        }
}

//função para retornar todos os filmes existentes
const listarfilme = async function() {
    //criar uma copia dos json do arquivo de configuração de mensagens
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

        try {
            //chamando a função do DAO para retornar a lista de filme do Banco de Dado
            let result = await filmeDAO.selectALLfilme()
            
            //validação para verificar se o DAO conseguiu processar o script no banco de dados
            if(result){

                //validação para verificar se o conteudo do ARRAY tem dados de retorno ou ta vazio
                if(result.length>0){
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.count = result.length
                    vegapunk.DEFAULT_MESSAGE.response.filme = result

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
const buscarfilme = async function(id) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        //validação para garantir q o id seja um numero valido
        if( id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            vegapunk.ERROR_BAD_REQUEST.field = '[ID] inválido'
            return vegapunk.ERROR_BAD_REQUEST //400
        }else{

        //chama a função do DAO para pesquiasar o filme pelo id
            let result = await filmeDAO.selectByIdFilme(id)

            //validação para verifiar se o DAO retornou dados ou um false
            if(result){
                //validação para verificar se o dao tem algum registro ou dado no array
                if(result.length>0){
                    vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_RESPONSE.status
                    vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_RESPONSE.status_code
                    vegapunk.DEFAULT_MESSAGE.response.filme = result

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
const excluirfilme =async function(id) {
    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    try {
        let validarid = await buscarfilme(id)

        if(validarid){
            let result = await filmeDAO.deleteFilme(id)
            if(result){

                vegapunk.DEFAULT_MESSAGE.status = vegapunk.SUCESS_DELETE_ITEM.status
                vegapunk.DEFAULT_MESSAGE.status_code = vegapunk.SUCESS_DELETE_ITEM.status_code
                vegapunk.DEFAULT_MESSAGE.message = vegapunk.SUCESS_DELETE_ITEM.message

                return vegapunk.DEFAULT_MESSAGE
                
            } 

        }else{
            return validarid
        }
    } catch (error) {
        console.log(error)
        return vegapunk.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para validar os dados do filme
const validardados = async function(filme) {

    let vegapunk = JSON.parse(JSON.stringify(configmessages))

    if(filme.nome                   == undefined                       || filme.nome            == null         || filme.nome            == ''         || filme.nome.length > 80){
        vegapunk.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else if(filme.sinopse          == undefined                       || filme.sinopse         == null         || filme.sinopse         == '' ){
        vegapunk.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else if (filme.capa            == undefined                       || filme.capa            == null         || filme.capa            == ''         || filme.capa.length > 255){
        vegapunk.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else if (filme.data_lancamento == undefined                       || filme.data_lancamento == null         || filme.data_lancamento == ''         || filme.data_lancamento.length != 10){
        vegapunk.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else if(filme.duracao          == undefined                       || filme.duracao         == null         || filme.duracao         == ''         || filme.duracao.length < 5 ){
        vegapunk.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else if(filme.valor            == undefined                       || isNaN(filme.valor)                    || filme.valor.length > 5){
        vegapunk.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    }else if(filme.avaliacao        == undefined                       || isNaN(filme.avaliacao)                || filme.avaliacao.length > 3){
        vegapunk.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return vegapunk.ERROR_BAD_REQUEST
    } else{
        return false
    }
}
 

module.exports ={
    inserirNovoFilme,
    atualizarfilme,
    listarfilme,
    buscarfilme,
    excluirfilme,
}