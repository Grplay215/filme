#permite criar um data base
create database db_filmes_20261_b;

#permite visualizar todos os batabases existentes(até de outros perfis)
show databases;

#permite escolher database a ser utilizado
use db_filmes_20261_b;

#permite verificar as tabelas existentes dentro do database
show tables;


create table tbl_filmess (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null
);



create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null
    
);

#---------------------------------------------------------------------------------------------------------
#id_genero int not null,
#    constraint fk_genero_filme
#    foreign key(id_genero)
#    references tbl_genero(id),
    
#    id_classificacao int not null,

#	constraint fk_classificacao_filme
#    foreign key(id_classificacao)
#    references tbl_classificacao(id)
#--------------------------------------------------------------------------------------------------------------------


#apaga a tabele desejada ou o database(ultimo caso)
drop table tbl_filme;

alter table tbl_filme_ator
drop foreign key fk_filmeator;
alter table tbl_filme_diretor
drop foreign key fk_filmediretor;

#drop database ;

insert into tbl_filme(
	nome,
	sinopse,
	capa,
	data_lancamento,
	duracao,
	valor,
	avaliacao
) values(
	replace("Super Mario' Galaxy: O Filme", "'", ""),
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão.
    Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    if('', null, 2)
);
delete from tbl_classificacao;

alter table tbl_filme
	add column id_classificacao int not null,
	add constraint fk_classificacao_filme
		foreign key (id_classificacao)
        references tbl_classificacao(id);
        
desc tbl_filme;

select * from tbl_classificacao;
select * from tbl_filme order by id desc;
select * from tbl_filme where id = 20;

update tbl_filme set
	nome= 'filme 01',
    sinopse ='hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
    capa = 'hyrrrrrrrrrrrrrhhhhhhhhhhhhhhhhhrrrrrrrrrrrrrrrrr',
    data_lancamento ='2006-12-01',
    duracao = '06:59:00',
    valor = '23',
    avaliacao = '6'
where id = 20;


delete from tbl_filme where id = 19;

create table tbl_genero(
	id int not null auto_increment primary key,
    genero varchar(40) not null
);

insert into tbl_genero(
	genero
) values(
    'aventura'
);


create table tbl_classificacao(
	id int not null auto_increment primary key,
    classificacao varchar(30) not null
);

alter table tbl_classificacao
	add column idade int not null,
    add column descricao varchar(100) not null;

insert into tbl_classificacao(
	classificacao
) values(
    'aventura'
);


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

create table tbl_sexo_ator(
	id int not null auto_increment primary key,
    id_sexo int not null,
    constraint fk_sexoator
    foreign key (id_sexo)
    references tbl_sexo(id),
    
    id_ator int not null,
    constraint fk_ator_sexo
    foreign key (id_ator)
    references tbl_ator(id)
);

create table tbl_sexo_diretor(
	id int not null auto_increment primary key,
    id_sexo int not null,
    constraint fk_sexodiretor
    foreign key (id_sexo)
    references tbl_sexo(id),
    
    id_diretor int not null,
    constraint fk_diretor_sexo
    foreign key (id_diretor)
    references tbl_diretor(id)
);


create table tbl_filme_ator(
	id int not null auto_increment primary key,
    
    id_filme int not null,
    constraint fk_filmeator
    foreign key (id_filme)
    references tbl_filme(id),
    
    id_ator int not null,
    constraint fk_ator_filme
    foreign key (id_ator)
    references tbl_ator(id)
);

create table tbl_filme_diretor(
	id int not null auto_increment primary key,
    
    id_filme int not null,
    constraint fk_filmediretor
    foreign key (id_filme)
    references tbl_filme(id),
    
    id_diretor int not null,
    constraint fk_diretor_filme
    foreign key (id_diretor)
    references tbl_diretor(id)
);

desc tbl_sexo;



