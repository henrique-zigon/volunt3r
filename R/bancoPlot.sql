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
	id int primary key auto_increment,
    nome varchar(45),
    cargo varchar(10),
    classificacao varchar(2),
    totalHrN1 int,
    totalHrN2 int,
    totalHrN3 int,
    totalHrN4 int,
    totalHr int,
    totalQntN1 int,
    totalQntN2 int,
    totalQntN3 int,
    totalQntN4 int,
    totalQnt int,
    score int,
    tempoCasa double
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
drop table Evento;
drop table Publicacao;
insert into Evento (evento) values ("x");