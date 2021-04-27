drop database volunt3r;
create database volunt3r;
use volunt3r;

create table categoria(
	id_categoria int auto_increment primary key,
    nome_categoria varchar(100),
    nivel int,
    check (nivel = 1 or nivel = 2 or nivel = 3 or nivel = 4)
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
    senha varchar(50),
    cargo varchar(42),
    area varchar(100)
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
    maximo_participantes int,
    horas float,
    fk_categoria int,
    foreign key (fk_categoria) references categoria(id_categoria)
);

create table publicacao(
	id_publicacao int auto_increment primary key,
    titulo_publicacao varchar(100),
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
	fk_evento int,
    foreign key(fk_evento) references evento(id_evento),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario),
    status_UE varchar(10),
    check(status_UE = 'pendente'or status_UE = 'confirmado')
);

create table inscricao_categoria(
	fk_categoria int,
    foreign key(fk_categoria) references categoria(id_categoria),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

create table gostei(
	#id_gostei int auto_increment primary key,
    fk_publicacao int,
    foreign key(fk_publicacao) references publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

create table clique(
	#id_clique int auto_increment primary key,
    fk_publicacao int,
    foreign key(fk_publicacao) references publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);