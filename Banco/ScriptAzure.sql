create table categoria(
	id_categoria int identity primary key,
    nome_categoria varchar(100),
    nivel int,
    check (nivel = 1 or nivel = 2 or nivel = 3 or nivel = 4),
    limite_bronze int,
    limite_prata int,
    limite_ouro int,
    milhas_promocao int
);

create table curso(
    id_curso int identity primary key,
    titulo varchar(50),
    preco int,
    duracao float,
    descricao varchar(250),
    categoria varchar(50),
    path_imagem varchar(255)
);

create table usuario(
	id_usuario int identity primary key,
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
    id_transacao_compra int identity primary key,
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario),
    fk_curso int,
    foreign key(fk_curso) references curso(id_curso)
);

create table ranque(
	id_ranque int identity primary key,
    nome_ranque varchar(10),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario),
    fk_categoria int,
    foreign key(fk_categoria) references categoria(id_categoria)
);

create table evento(
	id_evento int identity primary key,
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
	id_publicacao int identity primary key,
    tipo varchar(50),
    check(tipo = 'publicacao' or tipo='evento' or tipo='comentario')
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
    id_inscricao_evento int identity primary key,
	fk_evento int,
    foreign key(fk_evento) references evento(id_evento),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario),
    status_UE varchar(10),
    check(status_UE = 'pendente'or status_UE = 'confirmado')
);

create table inscricao_categoria(
    id_inscricao_categoria int identity primary key,
    fk_categoria int,
    foreign key(fk_categoria) references categoria(id_categoria),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

create table gostei(
    id_gostei int identity primary key,
    fk_publicacao int,
    foreign key(fk_publicacao) references publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

create table clique(
	id_clique int identity primary key,
    fk_publicacao int,
    foreign key(fk_publicacao) references publicacao(id_publicacao),
    fk_usuario int,
    foreign key(fk_usuario) references usuario(id_usuario)
);

#PLOT:
create table Voluntario(
                           idUsuario int primary key identity ,
                           nomeUsuario varchar(45),
                           cargo varchar(20),
                           ano2019 varchar(2),
                           ano2020 varchar(2),
                           ano2021 varchar(2),
                           totalMinutosN1 int,
                           totalMinutosN2 int,
                           totalMinutosN3 int,
                           totalMinutosN4 int,
                           totalMinutos int,
                           totalParticipacoesN1 int,
                           totalParticipacoesN2 int,
                           totalParticipacoesN3 int,
                           totalParticipacoesN4 int,
                           totalParticipacoes int,
                           score int,
                           tempoCasa float,
                           aderencia float
);

#alter table publicacao add tipo varchar(10);
#alter table publicacao add check(tipo in ('comentario','publicacao','evento'));

#alter table evento add titulo varchar(50);
#alter table publicacao drop column titulo_publicacao