/*****************************************************************************
 * objetivo: arquivo responsavel pela padronização das mensagens e status code
 *  do projeto de filmes
 * data: 17/04/2026
 * autor:Gabriel Renato
 * versão: 1.0
******************************************************************************/

//padronização dos retornos da API (cabeçalho)
const DEFAULT_MESSAGE = {
    api_descreiption: 'api para controlar projetos de filmes',
    development: 'Gabriel Renato',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//mensagens de ERRO do projeto de filmes
const ERROR_BAD_REQUEST                  = {status: false, status_code:400, message: 'Não foi possivel procesar  a requisição devido a erros de entrada de dados.'}
const ERROR_INTERNAL_SERVER_MODEL        = {status: false, status_code:500, message: 'Não foi possivel processar a requisição devido a um erro interno no servidor [MODEL]'}
const ERROR_INTERNAL_SERVER_CONTROLLER   = {status: false, status_code:500, message: 'Não foi possivel processar a requisição devido a um erro interno no servidor [CONTROLLER]'}
const ERROR_CONTENT_TYPE                 = {status: false, status_code:415, message: 'Não foi possivel procesar  a requisição, pois o formato de dados encaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON.'}
const ERROR_NOT_FOUND                    = {status: false, status_code:404, message: 'Não foram encontrados dados para retorno da requisição.'}


//mensagem de sucesso do projeto de filmes
const SUCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'Item inserido com sucesso......eu acho'}
const SUCESS_CREATED_ITEM_WARNING = { status: true, status_code: 201, message: 'Item inserido com sucesso mas.........alguns dados n foram possíveis de serem cadastrados (dados de relacionamento)'}
const SUCESS_RESPONSE ={ status: true, status_code:200}
const SUCESS_UPDATED_ITEM ={ status: true, status_code:200, message: 'Item atualizado com sucesso'}
const SUCESS_DELETE_ITEM ={status: true, status_code:204, message: 'Item deletado com sucesso'}

module.exports ={
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_NOT_FOUND,
    SUCESS_RESPONSE,
    SUCESS_UPDATED_ITEM,
    SUCESS_DELETE_ITEM,
    SUCESS_CREATED_ITEM_WARNING
    
}