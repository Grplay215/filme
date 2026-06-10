//import da biblioteca para manipular dados no banco de dados mysql
const knex = require('knex')

//import do arquivo de configuracao para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexdatabaseConfig.development)



const insertator = async function(ator) {
    try {
        let sql = `insert into tbl_ator(
            nome,
            idade,
            personagem,
            ano_inicio_carreira
        ) values(
            '${ator.nome}',
            '${ator.idade}',
            '${ator.personagem}',
            if('${ator.ano_inicio_carreira}' = '', 0, '${ator.ano_inicio_carreira}')
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

const selectALLator = async function() {
    try {
            
        let sql = 'select * from tbl_ator order by id desc'
            
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

const selectByIdator = async function(id) { 
    try {
        let sql = `select * from tbl_ator where id = ${id}`

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

const updateator = async function(ator) { 
    try {
        let sql = `update tbl_ator set
                        nome                    =    ${ator.nome},
                        idade                   =    ${ator.idade},
                        personagem              =    ${ator.personagem},
                        ano_inicio_carreira     =    if('${ator.ano_inicio_carreira}' = '', 0, '${ator.ano_inicio_carreira}')
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

const deletator = async function(id) { 
    try {
        let sql = `delete from tbl_ator where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}

module.exports = {
    insertator,
    selectALLator,
    selectByIdator,
    updateator,
    deletator
}