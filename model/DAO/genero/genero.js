//import da biblioteca para manipular dados no banco de dados mysql
const knex = require('knex')

//import do arquivo de configuracao para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const { json } = require('body-parser')

//criar a conexão com o BD mysql conforme o arquivo de configuração
const knexConection = knex(knexdatabaseConfig.development)

//ok
const insertgenero = async function(genero) {
    try {
        let sql = `insert into tbl_genero(
	genero
) values(
    '${genero}'
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

const updategenero = async function(genero) { 
    try {
        let sql = `update tbl_genero set
                        genero            = '${genero.genero}'
                    where id = ${genero.id}`
        
        let result = await knexConection.raw(sql)
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}
//ok
const deletegenero = async function(id) { 
    try {
        let sql = `delete from tbl_genero where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}
//ok
const selectByIdGenero = async function(id) { 
    try {
        let sql = `select * from tbl_genero where id = ${id}`

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
//ok
const selectALLgenero = async function(genero) {
    try {
            
        let sql = 'select * from tbl_genero order by id desc'
            
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

module.exports = {
        insertgenero,
        updategenero,
        deletegenero,
        selectByIdGenero,
        selectALLgenero
}