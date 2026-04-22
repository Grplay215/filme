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
    Response: {}
}

//mensagens de ERRO do projeto de filmes
const ERROR_BAD_REQUEST                  = {status: false, status_code:400, message: 'Não foi possivel procesar a requisição devido a erros de entrada de dados.'}
const ERROR_INTERNAL_SERVER_MODEL        = {status: false, status_code:500, message: 'Não foi possivel processar a requisição devido a um erro interno no servidor [MODEL]'}
const ERROR_INTERNAL_SERVER_CONTROLLER   = {status: false, status_code:500, message: 'Não foi possivel processar a requisição devido a um erro interno no servidor [CONTROLLER]'}
const ERROR_CONTENT_TYPE                 = {status: false, status_code:415, message: 'Não foi possivel procesar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON.'}

//mensagem de sucesso do projeto de filmes
const SUCESS_CREATED_ITEM = {
    status: true, status_code: 201, message: 'Item inserido com sucesso......eu acho'
}

module.exports ={
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
}