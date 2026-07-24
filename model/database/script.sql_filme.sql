#permite criar um data base
create database db_filmes_20261_b;

#permite visualizar todos os batabases existentes(até de outros perfis)
show databases;

#permite escolher database a ser utilizado
use db_filmes_20261_b;


create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null,
    id_classificacao int not null,
    
	constraint fk_classificacao_filme
	foreign key (id_classificacao)
	references tbl_classificacao(id)
);


create table tbl_genero(
	id int not null auto_increment primary key,
    genero varchar(40) not null
);


create table tbl_classificacao(
	id int not null auto_increment primary key,
    idade int not null,
    descricao varchar(100) not null
);


alter table tbl_filme
	add column id_classificacao int not null,
    
	add constraint fk_classificacao_filme
		foreign key (id_classificacao)
        references tbl_classificacao(id);

create table tbl_ator(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    idade year not null,
    personagem varchar(100) not null,
    ano_inicio_carreira year
);

create table tbl_diretor(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    idade year not null
);

create table tbl_sexo(
	id int not null auto_increment primary key,
    sigla varchar(3),
    sexo varchar(15)
);


#-----------tbl entermediarias------------


create table tbl_filme_genero(
	id int not null auto_increment primary key, 
    id_filme int not null,
    id_genero int not null,
    
    constraint fk_filmegenero_filme
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint fk_generofilme_filme
    foreign key (id_genero)
    references tbl_genero(id)
);


#permite verificar as tabelas existentes dentro do database
show tables;