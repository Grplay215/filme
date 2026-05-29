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
	        avaliacao,
            id_classificacao
        ) values(
	        '${filme.nome}',
            '${filme.sinopse}',
            '${filme.capa}',
            '${filme.data_lancamento}',
            '${filme.duracao}',
            if('${filme.valor}' = '', 0, '${filme.valor}'),
            if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
            ${filme.id_classificacao}
        );`

        //encaminha para o BD o scriptSQL
        let luffy = await knexConection.raw(sql)
    
        if(luffy)
            return luffy[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

//função para atualizar filme existente no banco de dados
const updatFilme = async function(filme) {
    try {
        let sql = `update tbl_filme set
                        nome             = '${filme.nome}',
                        sinopse          = '${filme.sinopse}',
                        capa             = '${filme.capa}',
                        data_lancamento  = '${filme.data_lancamento}',
                        duracao          = '${filme.duracao}',
                        valor            = if('${filme.valor}' = '', 0, '${filme.valor}'),
                        avaliacao        = if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                        id_classificacao = ${filme.id_classificacao}
                    where id = ${filme.id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else 
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todos os dados de filme do banco de dados
const selectALLfilme = async function (filme) {
    try {
        //script para listar todos os filmes
        let sql = 'select * from tbl_filme order by id desc'

        //executa no BD o script e guarda o retorno do BD, pode ser um erro(false) ou um array com os dados
        let result = await knexConection.raw(sql)

        //validação para verificar se o resultado do BD é um array ou um boolean(false)
        if(Array.isArray(result)){
            return result[0] //retorna somente o indice com a lista de filmes
        }else {
            return false
        }
    } catch (error) {
        
    }
}

//função para retornar todos dos dados de um filme específico do banco de dados filtrando pelo id
const selectByIdFilme = async function (id) {
    try {
        let sql = `select * from tbl_filme where id = ${id}`

        let result = await knexConection.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

//função para excluir o filme específico do banco de dados filtrando pelo id
const deleteFilme = async function (id) {
   try {
       let sql = `delete from tbl_filme where id = ${id}`

       let result = await knexConection.raw(sql)
      
       return result
   } catch (error) {
    return false
   } 
}

module.exports={
    insertFilme,
    updatFilme,
    selectALLfilme,
    selectByIdFilme,
    deleteFilme
}