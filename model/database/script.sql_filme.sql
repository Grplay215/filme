#permite criar um data base
create database db_filmes_20261_b;

#permite visualizar todos os batabases existentes(até de outros perfis)
show databases;

#permite escolher database a ser utilizado
use db_filmes_20261_b;

#permite verificar as tabelas existentes dentro do database
show tables;

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

#apaga a tabele desejada ou o database(ultimo caso)
#drop table ;
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
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão.
    Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    if('', null, 2)
);

select * from tbl_filme;
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


#delete from tbl_filme where id > 0