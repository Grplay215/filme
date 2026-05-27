const knex = require('knex')

const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const { json } = require('body-parser')

const knexConection = knex(knexdatabaseConfig.development)

//ok
const insertfilmegenero = async function(filmegenero) {
    try {
        let sql = `insert into tbl_filme_genero(
    id_filme,
    id_genero
) values(
    ${filmegenero.id_filme},
    ${filmegenero.id_genero}
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
//ok
const updatefilmegenero = async function(filmegenero) { 
    try {
        let sql = `update tbl_filme_genero set
                        id_filme  = ${filmegenero.id_filme},
                        id_genero = ${filmegenero.id_genero}
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
const deletefilmegenero = async function(id) { 
    try {
        let sql = `delete from tbl_filme_genero where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}
//ok
const selectByIdfilmegenero = async function(id) { 
    try {
        let sql = `select * from tbl_filme_genero where id = ${id}`

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

//retorna os dados do genero filtrando pelo id do filme
const selectgenerosByIdfilme = async function(idfilme) { 
    try {
        let sql = `select tbl_genero.*
                   from tbl_filme
                    inner join tbl_filme_genero
                        on tbl_filme.id = tbl_filme_genero.id_filme
                    inner join tbl_genero
                        on tbl_genero.id = tbl_filme_genero.id_genero

                   where tbl_fime.id = ${idfilme}`

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
//retorna os dados do filme filtrando pelo id do genero
const selectfilmesByIdgenero = async function(idgenero) { 
    try {
        let sql = `select tbl_filme.*
                   from tbl_filme
                    inner join tbl_filme_genero
                        on tbl_filme.id = tbl_filme_genero.id_filme
                    inner join tbl_genero
                        on tbl_genero.id = tbl_filme_genero.id_genero

                   where tbl_genero.id = ${idgenero}`

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
const selectALLfilmegenero = async function() {
    try {
            
        let sql = 'select * from tbl_filme_genero order by id desc'
            
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

//função para excluir os generos relacionados com o filme
//ods: esta função sera
const deletegenerosByidFilme = async function(idfilme) { 
    try {
        let sql = `delete from tbl_filme_genero where id = ${id}`
       let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}
module.exports = {
        insertfilmegenero,
        updatefilmegenero,
        deletefilmegenero,
        selectByIdfilmegenero,
        selectALLfilmegenero,
        selectgenerosByIdfilme,
        selectfilmesByIdgenero,
        deletegenerosByidFilme
}