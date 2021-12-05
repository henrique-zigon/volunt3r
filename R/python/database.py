import pyodbc
import pandas as pandas

conn = pyodbc.connect(
    "DRIVER={MySQL ODBC 8.0 Unicode Driver};"
    "SERVER=localhost;"
    "PORT=3306;"
    "Database=volunt3r;"
    "UID=root;"
    "PASSWORD=admin;"
    "Trusted_Connection=no;") 
cursor = conn.cursor()

def insert_categorias(data):
    for row in data.itertuples():
        cursor.execute('''
            INSERT INTO categoria(nome_categoria, nivel, limite_bronze, limite_prata, limite_ouro, milhas_promocao, imagem_bronze, imagem_prata, imagem_ouro)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            row.nome_categoria,
            row.nivel,
            row.limite_bronze,
            row.limite_prata,
            row.limite_ouro,
            row.milhas_promocao,
            row.imagem_bronze,
            row.imagem_prata,
            row.imagem_ouro
        )
    conn.commit()

def insert_usuario(data):
    for row in data.itertuples():
        cursor.execute('''
            INSERT INTO usuario(nome_usuario, cargo, tipo_usuario, genero, email, status_usuario, area, quantidade_milhas)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            row.nome_usuario,
            row.cargo,
            row.tipo_usuario,
            row.sexo,
            row.email,
            row.status_usuario,
            row.area,
            row.quantidade_milhas
        )
    conn.commit()

def insert_evento(data):
    for row in data.itertuples():
        cursor.execute('''
            INSERT INTO evento(
                data_evento, 
                data_fechamento_evento, 
                endereco,
                maximo_participantes,
                horas,
                milhas_participacao,
                titulo,
                fk_categoria
                )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            row.data_evento,
            row.data_fechamento_evento,
            row.endereco,
            row.maximo_participantes,
            row.horas,
            row.milhas_participacao,
            row.titulo,
            row.fk_categoria
        )
    conn.commit()

def insert_publicacao(data):
    for row in data.itertuples():
        cursor.execute('''
            INSERT INTO publicacao(
                tipo, 
                descricao, 
                data_postagem,
                imagem,
                fk_usuario,
                fk_evento,
                publicacao_pai
                )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ''',
            row.tipo,
            row.descricao,
            row.data_postagem,
            row.imagem,
            row.fk_usuario,
            row.fk_evento,
            transform_to_null(row.publicacao_pai)
        )
    conn.commit()

def insert_inscricao(data):
    for row in data.itertuples():
        cursor.execute('''
            INSERT INTO inscricao_evento(
                fk_evento,
                fk_usuario, 
                status_UE
                )
            VALUES (?, ?, ?)
            ''',
            row.fk_evento,
            row.fk_usuario,
            row.status_ue
        )
    conn.commit()

def insert_clique(data):
    for row in data.itertuples():
        cursor.execute('''
            INSERT INTO clique(
                fk_publicacao,
                fk_usuario
                )
            VALUES (?, ?)
            ''',
            row.fk_publicacao,
            row.fk_usuario
        )
    conn.commit()

def insert_gostei(data):
    for row in data.itertuples():
        cursor.execute('''
            INSERT INTO gostei(
                fk_publicacao,
                fk_usuario
                )
            VALUES (?, ?)
            ''',
            row.fk_publicacao,
            row.fk_usuario
        )
    conn.commit()

def transform_to_null(value):
    if value == 0:
        return None
    else:
        return value