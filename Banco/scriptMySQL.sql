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
    
);


