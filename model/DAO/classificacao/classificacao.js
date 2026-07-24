const knex = require('knex')

const knexdatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexdatabaseConfig.development)

const insertclassificacao = async function(classificacao) {
    try {
        let sql = `insert into tbl_classificacao(
    idade,
    descricao
) values(
    '${classificacao.idade}',
    '${classificacao.descricao}'
);`

        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
        return false

    } catch (error) {
        return false
    }
}

const selectALLclassificacao = async function(classificacao) {
    try {
            
        let sql = 'select * from tbl_classificacao order by id desc'
            
        let result = await knexConection.raw(sql)
        if(result && result[0]){
            return JSON.parse(JSON.stringify(result[0])) 
        }else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectByIdclassificacao = async function(id) { 
    try {
        let sql = `select * from tbl_classificacao where id = ${id}`

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

const updateclassificacao = async function(classificacao) { 
    try {
        let sql = `update tbl_classificacao set
                        idade	                 =  ${classificacao.idade},	
                        descricao	             = '${classificacao.descricao}'
                    where id = ${classificacao.id}`
        
        let result = await knexConection.raw(sql)
        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
    }
}

const deleteclassificacao = async function(id) { 
    try {
        let sql = `delete from tbl_classificacao where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}

module.exports = {
    insertclassificacao,
    selectALLclassificacao,
    selectByIdclassificacao,
    updateclassificacao,
    deleteclassificacao
}

