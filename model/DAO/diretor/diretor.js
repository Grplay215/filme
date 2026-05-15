//import da biblioteca para manipular dados no banco de dados mysql
const knex = require('knex')

//import do arquivo de configuracao para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const { json } = require('body-parser')


const insert = async function() {
    try {
        let sql = `insert into tbl_(
    
) values(
    ''
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

const selectALL = async function() {
    try {
            
        let sql = 'select * from tbl_ order by id desc'
            
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

const selectById = async function(id) { 
    try {
        let sql = `select * from tbl_ where id = ${id}`

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

const update = async function() { 
    try {
        let sql = `update tbl_ set
                        genero            = '${p}'
                    where id = ${id}`
        
        let result = await knexConection.raw(sql)
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const delet = async function(id) { 
    try {
        let sql = `delete from tbl_ where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}

module.exports = {

}