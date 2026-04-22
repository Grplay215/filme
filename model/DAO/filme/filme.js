/****************************************************************************************************
 * Objetivo responsavel pelo CRUD de dados do filme no banco de dados Mysql
 * Data: 15/04/2026
 * Versão: 1.0
 * 
 * 
 ****************************************************************************************************/
//import da biblioteca para manipular dados no banco de dados mysql
const knex = require('knex')

//import do arquivo de configuracao para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')

//criar a conexão com o BD mysql conforme o arquivo de configuração
const knexConection = knex(knexdatabaseConfig.development)

//função para inserir um novo filme no banco de dados
const insertFilme = async function(filme) {
    try {
        
        let sql = `insert into tbl_filme(
	        nome,
	        sinopse,
	        capa,
	        data_lancamento,
	        duracao,
	        valor,
	        avaliacao
        ) values(
	        '${filme.nome}',
            '${filme.sinopse}',
            '${filme.capa}',
            '${filme.data_lancamento}',
            '${filme.duracao}',
            if('${filme.valor}' = '', 0, '${filme.valor}'),
            if('${filme.avaliacao}' = '', null, '${filme.avaliacao}')
        );`

        //console.log(sql)

        //encaminha para o BD o scriptSQL
        let luffy = await knexConection.raw(sql)

        if(luffy)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para atualizar filme existente no banco de dados
const updatFilme = async function(filme) {
    
}

//função para retornar todos os dados de filme do banco de dados
const selectALLfilme = async function (filme) {
    
}

//função para retornar todos dos dados de um filme específico do banco de dados filtrando pelo id
const selectByIdFilme = async function (id) {
    
}

//função para excluir o filme específico do banco de dados filtrando pelo id
const deleteFilme = async function (id) {
    
}

module.exports={
    insertFilme,
    updatFilme,
    selectALLfilme,
    selectByIdFilme,
    deleteFilme
}