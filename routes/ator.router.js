//import do express
const express = require('express')
const bodyparser = require('body-parser')

//permitindo a utilização do JSON no body das requisições
const bodyparserJSON = bodyparser.json()

//criando um objeto de rota para os andpoints de genero
const router = express.Router()

//import da controller do genero
const controllerator = require('../controller/ator/controller_ator')