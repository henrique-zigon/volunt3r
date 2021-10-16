drop database volunt3r;
create database volunt3r;
use volunt3r;

create table categoria(
	id_categoria int auto_increment primary key,
    nome_categoria varchar(100),
    nivel int,
    check (nivel = 1 or nivel = 2 or nivel = 3 or nivel = 4),
    limite_bronze int,
    limite_prata int,
    limite_ouro int,
    milhas_promocao int    
);
insert into categoria (nome_categoria,nivel,limite_bronze,limite_prata,limite_ouro) values ('cat1',1,2,5,10),('cat2',2,3,5,10),('cat3',2,20,50,10);

create table curso(
    id_curso int auto_increment primary key,
    titulo varchar(50),
    preco int,
    duracao float,
    descricao varchar(250),
    categoria varchar(50),
    path_imagem varchar(255)
);


create table usuario(
	id_usuario int auto_increment primary key,
    nome_usuario varchar(200),
    genero varchar(10),
    bio varchar(255),
    quantidade_milhas int,
    tipo_usuario varchar(10),
    check (tipo_usuario = 'comum' or tipo_usuario='b3_social'),
    email varchar(50),
    senha varchar(70),
    cargo varchar(50),
    area varchar(100),
    imagem_perfil varchar(255),
    imagem_capa varchar(255),
    status_usuario int,
    check(status_usuario = 0 or status_usuario = 1)
);
insert into usuario  values (1,'nome1','homi','bio1',1,'comum','email@email.com','senha123','cargo1','area1','img1','img1',1),(2,'nome2','muie','bio2',2,'comum','email2@email.com','senha1223','cargo2','area1','img2','img2',1);

create table transacao_compra(
    id_transacao_compra int auto_increment primary key,
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario),
    fk_curso int,
    foreign key(fk_curso) references curso(id_curso)
);

create table ranque(
	id_ranque int auto_increment primary key,
    nome_ranque varchar(10),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario),
    fk_categoria int,
    foreign key(fk_categoria) references categoria(id_categoria)
);

create table evento(
	id_evento int auto_increment primary key,
    data_evento varchar(15),
    data_fechamento_evento varchar(15),
    endereco varchar(255),
    maximo_participantes int,
    horas float,
    milhas_participacao int,
    titulo varchar(45),
    fk_categoria int,
    foreign key (fk_categoria) references categoria(id_categoria)
);
 insert into evento (data_evento,data_fechamento_evento,endereco,maximo_participantes,horas,milhas_participacao,titulo,fk_categoria) values ('01/01/2000','01/01/2001','minha c123123asa',10,15,10,'titulo',3),('01/01/2010','01/01/2011','min23123ha vila',10,15,10,'titulo2',3),('01/01/2100','01/01/2101','minh111111a 1111casa',10,15,10,'titulo3',3);
 
create table publicacao(
	id_publicacao int auto_increment primary key,
    tipo varchar(10),
	check(tipo = 'publicacao' or tipo='evento' or tipo='comentario'),
    descricao varchar(400),
    data_postagem varchar(15),
    imagem varchar(200), 
    fk_usuario int,
    foreign key (fk_usuario) references usuario(id_usuario),
    fk_evento int,
    foreign key (fk_evento) references evento(id_evento),
    publicacao_pai int,
    foreign key (publicacao_pai) references publicacao(id_publicacao)
);

create table inscricao_evento(
    id_inscricao_evento int auto_increment primary key,
	fk_evento int,
    foreign key(fk_evento) references evento(id_evento),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario),
    status_UE varchar(10),
    check(status_UE = 'pendente'or status_UE = 'confirmado')
);
insert into inscricao_evento values (1,1,1,'confirmado'),(2,2,1,'pendente'),(3,1,2,'confirmado');

create table inscricao_categoria(
    id_inscricao_categoria int primary key auto_increment,
    fk_categoria int,
    foreign key(fk_categoria) references categoria(id_categoria),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

create table gostei(
    id_gostei int auto_increment primary key,
    fk_publicacao int,
    foreign key(fk_publicacao) references publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

create table clique(
	id_clique int auto_increment primary key,
    fk_publicacao int,
    foreign key(fk_publicacao) references publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

#alter table publicacao add tipo varchar(10);
#alter table publicacao add check(tipo in ('comentario','publicacao','evento'));


insert into Evento value (3,"15/10/10","11/11/11","minha vila",10,14.30,2);
insert into categoria value(1,"doacao sangue", 2);
insert into categoria value(2,"doacao cesta", 1);
insert into inscricao_evento value(3,3,2,"confirmado");

select*from Usuario;
select*from inscricao_evento;
select*from Evento;
select*from Usuario;

select * from Usuario,Inscricao_Evento,Evento,Categoria;
select nome_usuario,id_evento,nome_categoria from Usuario,Inscricao_Evento,Evento,Categoria where id_usuario=fk_usuario and id_evento=fk_evento and id_categoria=fk_categoria and fk_usuario=2 ;
select nome_categoria,count(nome_categoria) as qnt from Usuario,Inscricao_Evento,Evento,Categoria where id_usuario=fk_usuario and id_evento=fk_evento and id_categoria=fk_categoria and fk_usuario=2 group by nome_categoria;
select fk_categoria from Evento where id_evento=1;


select nome_categoria,count(nome_categoria) as quantidade, (case when count(nome_categoria)>=limite_ouro then 'ouro' 
												when count(nome_categoria)>=limite_prata then 'prata' 
                                                when count(nome_categoria)>=limite_bronze then 'bronze'
                                                when count(nome_categoria)<limite_bronze then 'nada'END 
											) as elo from Usuario as usu,Inscricao_Evento as ins,Evento as eve,Categoria as cat where id_usuario=ins.fk_usuario and id_evento=ins.fk_evento and id_categoria=eve.fk_categoria and id_usuario=1  group by nome_categoria;
