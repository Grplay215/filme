//import da biblioteca para manipular dados no banco de dados mysql
const knex = require('knex')

//import do arquivo de configuracao para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const { json } = require('body-parser')


const insertsexo = async function(sexo) {
    try {
        let sql = `insert into tbl_sexo(
     sigla,
     sexo
) values(
    '${sexo.sigla}',
    '${sexo.sexo}'
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

const selectALLsexo = async function(sexo) {
    try {
            
        let sql = 'select * from tbl_sexo order by id desc'
            
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

const selectByIdsexo = async function(id) { 
    try {
        let sql = `select * from tbl_sexo where id = ${id}`

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

const updatesexo = async function(sexo) { 
    try {
        let sql = `update tbl_sexo set
                        sigla            = '${sexo.sigla}'
                        sexo             = '${sexo.sexo}'
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

const deletsexo = async function(id) { 
    try {
        let sql = `delete from tbl_sexo where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}

module.exports = {
    insertsexo,
    selectALLsexo,
    selectByIdsexo,
    updatesexo,
    deletsexo
}

