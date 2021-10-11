drop database plots;
create database Plots;
use Plots;

create table Evento(
	id int primary key auto_increment,
    evento varchar(45),
    categoria varchar(2),
    nParticipantes int,
    horas int,
    aderencia double,
    dataEvento varchar(10),
    dataFechamento varchar(20),
    cliques int,
	likes int
);

create table Voluntario(
	idUsuario int primary key auto_increment,
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
    tempoCasa double,
    aderencia double
);

create table Publicacao(
	id int primary key auto_increment,
    publicacao varchar(20),
    dono varchar(45),
    eventosFk int,
    foreign key(eventosFk)references Evento(id),
    cliques int,
    likes int
);

select*from Evento;
select*from Voluntario;
drop table Evento;
drop table Publicacao;
insert into Evento (evento) values ("x");