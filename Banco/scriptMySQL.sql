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

create table publicacao(
	id_publicacao int auto_increment primary key,
    tipo varchar(50),
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