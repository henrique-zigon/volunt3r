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
    milhas_promocao int,
    imagem_bronze varchar(255),
    imagem_prata varchar(255),
    imagem_ouro varchar(255)
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
    titulo varchar(100),
    fk_categoria int,
    foreign key (fk_categoria) references categoria(id_categoria)
);

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


-- select nome_categoria,count(nome_categoria) as quantidade, (case when count(nome_categoria)>=limite_ouro then 'ouro' 
--												when count(nome_categoria)>=limite_prata then 'prata' 
--                                                when count(nome_categoria)>=limite_bronze then 'bronze'
--                                               when count(nome_categoria)<limite_bronze then 'nada'END 
--											) as elo from Usuario as usu,Inscricao_Evento as ins,Evento as eve,Categoria as cat where id_usuario=ins.fk_usuario and id_evento=ins.fk_evento and id_categoria=eve.fk_categoria and id_usuario=1  group by nome_categoria;


-- create view view_quantidade_voluntario_categoria as select ano2021 as categoria,
-- count(nomeUsuario) as quantidade_voluntarios 
-- from Voluntario group by ano2021;

CREATE OR REPLACE VIEW view_voluntariados AS
SELECT 
	data_definitiva,
    fk_usuario,
    nome_usuario,
    genero,
    tipo_usuario,
    cargo,
    area,
    status_usuario,
    max(nivel) as nivel,
    sum(CASE WHEN nivel = 1 then horas else 0 end) as total_horas_N1,
    sum(CASE WHEN nivel = 2 then horas else 0 end) as total_horas_N2,
    sum(CASE WHEN nivel = 3 then horas else 0 end) as total_horas_N3,
    sum(CASE WHEN nivel = 4 then horas else 0 end) as total_horas_N4,
    sum(horas) as total_Horas,
    sum(CASE WHEN nivel = 1 then 1 else 0 end) as total_participacoes_n1,
    sum(CASE WHEN nivel = 2 then 1 else 0 end) as total_participacoes_n2,
    sum(CASE WHEN nivel = 3 then 1 else 0 end) as total_participacoes_n3,
    sum(CASE WHEN nivel = 4 then 1 else 0 end) as total_participacoes_n4,
    count(*) as total_participacoes,
    sum(horas) * count(*) as score,
    count(*) * 100 / 53 as aderencia
FROM (
	SELECT 
		*
	FROM (
		SELECT 
			RIGHT(eventos.data_evento, 4) as data_definitiva,
			inscricao.*,
			eventos.*
		FROM  
			volunt3r.inscricao_evento inscricao
		LEFT JOIN
			volunt3r.evento eventos
		ON inscricao.fk_evento = eventos.id_evento
        WHERE inscricao.status_UE = 'CONFIRMADO'
	) sub1
	LEFT JOIN
		volunt3r.usuario usuarios
	ON sub1.fk_usuario = usuarios.id_usuario
) sub2
LEFT JOIN
	volunt3r.categoria categorias
ON sub2.fk_categoria = categorias.id_categoria
-- WHERE 
--	fk_usuario = 2
--	data_definitiva = "2021"
GROUP BY 1, 2, 3, 4, 5, 6, 7, 8;

CREATE OR REPLACE VIEW view_historico_voluntario AS
SELECT
	*,
    CONCAT(perfil_comparativo,'-',perfil_ano) AS perfil_completo
FROM (
	SELECT 
		*,
		CASE
			WHEN `2021` = `2020` THEN '2_ESTAGNADO'
			WHEN `2021` > `2020` THEN '3_CRESCENTE'
			ELSE '1_DECRESCENTE'
		END AS perfil_comparativo,
		CASE
			WHEN score2021 = 0 THEN '1_FANTASMA'
			WHEN score2021 <= 0.25 THEN '2_TIMIDO'
			WHEN score2021 <= 1.5 THEN '3_AMADOR'
			WHEN score2021 <= 10.0 THEN '4_CASUAL'
			WHEN score2021 <= 25 THEN '5_ATIVO'
			ELSE '6_ENGAJADO'
		END AS perfil_ano
	FROM (
		SELECT 
		fk_usuario,
		MAX(IF(data_definitiva = '2019', nivel, 0)) AS '2019', 
		MAX(IF(data_definitiva = '2020', nivel, 0)) AS '2020',
		MAX(IF(data_definitiva = '2021', nivel, 0)) AS '2021',
		MAX(IF(data_definitiva = '2019', score, 0)) AS score2019, 
		MAX(IF(data_definitiva = '2020', score, 0)) AS score2020,
		MAX(IF(data_definitiva = '2021', score, 0)) AS score2021
		FROM (
		SELECT 
			data_definitiva, fk_usuario, nivel, score
		FROM 
			volunt3r.view_voluntariados
		) sub
		GROUP BY fk_usuario
		ORDER BY fk_usuario
	) sub2
) sub3;

CREATE OR REPLACE VIEW view_aluvial_passado AS
SELECT 
	ROW_NUMBER() OVER(ORDER BY `2019`) AS id_fake,
    `2019` as ano2019, 
    `2020` as ano2020,
    COUNT(*) as contador
FROM 
	volunt3r.view_historico_voluntario
GROUP BY 
	ano2019, 
    ano2020
;

CREATE OR REPLACE VIEW view_aluvial_atual AS
SELECT 
	ROW_NUMBER() OVER(ORDER BY `2020`) AS id_fake,
    `2020` as ano2020, 
    `2021` as ano2021,
    COUNT(*) as contador
FROM 
	volunt3r.view_historico_voluntario
GROUP BY 
	ano2020, 
    ano2021
;
#Não sei o que rolou aqui
-- CREATE OR REPLACE VIEW view_aluvial_atual AS
-- SELECT 
--	id_publicacao,
--    titulo,
--    tipo,
--    imagem,
--    categoria.nivel
-- FROM 
--	publicacao,
--    evento,
--    categoria
-- WHERE 
--	id_evento = publicacao.fk_evento
-- AND 
--	id_categoria = evento.fk_categoria
-- ;

CREATE OR REPLACE VIEW view_quantidade_voluntario_categoria AS
	SELECT
		`2021` AS categoria,
        COUNT(*) AS quantidade_voluntarios
	FROM 
		volunt3r.view_historico_voluntario
	GROUP BY
		categoria
;

CREATE OR REPLACE VIEW view_cache_publicacao AS
select id_publicacao, titulo, tipo, imagem, categoria.nivel, evento.data_fechamento_evento
from publicacao,
     evento,
     categoria
where id_evento = publicacao.fk_evento
  and id_categoria = evento.fk_categoria and tipo="EVENTO";

 select * from volunt3r.evento where fk_categoria = 12;
select * from volunt3r.inscricao_evento;
insert into volunt3r.inscricao_evento(fk_usuario, fk_evento, status_UE) values (1, 41, 'CONFIRMADO');

select * from volunt3r.view_quantidade_voluntario_categoria;
SELECT * FROM volunt3r.categoria;
select * from view_cache_publicacao;

select * from view_aluvial_atual;
select * from view_aluvial_passado;
-- select * from categoria;

CREATE OR REPLACE VIEW view_aderencia_eventos AS
SELECT 
	fk_evento,
    titulo,
    data_fechamento_evento,
    count(*) as participacoes,
    count(*)*100/(select count(*) from volunt3r.usuario) as aderencia
FROM (
	SELECT 
		*
	FROM (
		SELECT 
			DATE_FORMAT(eventos.data_evento, "%Y") as data_definitiva,
			inscricao.*,
			eventos.*
		FROM  
			volunt3r.inscricao_evento inscricao
		LEFT JOIN
			volunt3r.evento eventos
		ON inscricao.fk_evento = eventos.id_evento
	) sub1
	LEFT JOIN
		volunt3r.usuario usuarios
	ON sub1.fk_usuario = usuarios.id_usuario
) sub2
LEFT JOIN
	volunt3r.categoria categorias
ON sub2.fk_categoria = categorias.id_categoria
GROUP BY
    fk_evento,
    titulo
ORDER BY
	data_fechamento_evento 
DESC
;

CREATE OR REPLACE VIEW view_full_joins AS
SELECT 
	*
FROM (
	SELECT 
		*
	FROM (
		SELECT 
			RIGHT(eventos.data_evento, 4) as data_definitiva,
			inscricao.*,
			eventos.*
		FROM  
			volunt3r.inscricao_evento inscricao
		LEFT JOIN
			volunt3r.evento eventos
		ON inscricao.fk_evento = eventos.id_evento
	) sub1
	LEFT JOIN
		volunt3r.usuario usuarios
	ON sub1.fk_usuario = usuarios.id_usuario
) sub2
LEFT JOIN
	volunt3r.categoria categorias
ON sub2.fk_categoria = categorias.id_categoria
;

select * from view_full_joins;