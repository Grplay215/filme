
use db_filmes_20261_b;

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


insert into tbl_genero(
	genero
) values(
    'aventura'
);



insert into tbl_classificacao(
	idade,
    descricao
) values(
    '18',
    'muito sexo'
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







