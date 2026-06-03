//import da biblioteca para manipular dados no banco de dados mysql
const knex = require('knex')

//import do arquivo de configuracao para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexdatabaseConfig.development)



const insertdiretor = async function(diretor) {
    try {
        let sql = `insert into tbl_sexo(
            nome,
            idade
        ) values(
            '${diretor.nome}',
            '${diretor.idade}'
        );`

        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
        return false

    } catch (error) {
        return error
        
    }
}

const selectALLdiretor = async function() {
    try {
            
        let sql = 'select * from tbl_diretor order by id desc'
            
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

const selectByIddiretor = async function(id) { 
    try {
        let sql = `select * from tbl_diretor where id = ${id}`

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

const updatediretor = async function(diretor) { 
    try {
        let sql = `update tbl_diretor set
                        nome                    =    ${diretor.nome},
                        idade                   =    ${diretor.idade}
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

const deletdiretor = async function(id) { 
    try {
        let sql = `delete from tbl_diretor where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}

module.exports; {
    insertdiretor,
    selectALLdiretor,
    selectByIddiretor,
    updatediretor,
    deletdiretor
}