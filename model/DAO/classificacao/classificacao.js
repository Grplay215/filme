const knex = require('knex')

const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const { json } = require('body-parser')

const knexConection = knex(knexdatabaseConfig.development)

const insertclassificacao = async function(classificacao) {
    try {
        let sql = `insert into tbl_classificacao(
    classificacao
) values(
    '${classificacao}'
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
                        genero            = '${classificacao.classificacao}'
                    where id = ${classificacao.id}`
        
        let result = await knexConection.raw(sql)
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
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

}

