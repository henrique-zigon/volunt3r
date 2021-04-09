create database volunt3r;
use volunt3r;

create table Categoria(
	id_categoria int primary key auto_increment,
    nome_categoria varchar(100),
    nivel int,
    check (nivel = 1 or nivel = 2 or nivel = 3 or nivel = 4)
);

create table Usuario(
	id_usuario int primary key auto_increment,
    nome_usuario varchar(200),
    genero varchar(10),
    milhas int,
    tipo_usuario varchar(10),
    check (tipo_usuario = 'comum' or 'b3_social'),
    login varchar(42),
    senha varchar(50),
    cargo varchar(42),
    area varchar(100)
);

create table Ranque(
	id_ranque int primary key auto_increment,
    nome_ranque varchar(10),
    fk_usuario int,
    foreign key(fk_usuario) references Usuario(id_usuario),
    fk_categoria int,
    foreign key(fk_categoria) references Categoria(id_categoria)
);

create table Publicacao(
	id_publicacao int primary key auto_increment,
    titulo_publicacao varchar(100),
    descricao varchar(400),
    data_postagem datetime,
    imagem varchar(200), 
    fk_usuario int,
    foreign key (fk_usuario) references Usuario(id_usuario)
);

create table Evento(
	id_evento int primary key auto_increment,
    data_evento datetime,
    maximo_participantes int,
    horas float,
    fk_categoria int,
    foreign key (fk_categoria) references Categoria(id_categoria),
    fk_publicacao int,
    foreign key(fk_publicacao) references Publicacao(id_publicacao)
);

create table Usuario_Evento(
	fk_evento int,
    foreign key(fk_evento) references Evento(id_evento),
    fk_usuario int,
    foreign key(fk_usuario) references Usuario(id_usuario),
    status_UE varchar(10),
    check(status_UE = 'pendente'or status_UE = 'confirmado')
);

create table Comentario(
	#id_comentario int primary key auto_increment,
    data_comentario datetime,
    comentario varchar(400),
    fk_publicacao int,
    foreign key(fk_publicacao) references Publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references Usuario(id_usuario)
);

create table Gostei(
	#id_gostei int primary key auto_increment,
    fk_publicacao int,
    foreign key(fk_publicacao) references Publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references Usuario(id_usuario)
);

create table Clique(
	#id_clique int primary key auto_increment,
    fk_publicacao int,
    foreign key(fk_publicacao) references Publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references Usuario(id_usuario)
);
