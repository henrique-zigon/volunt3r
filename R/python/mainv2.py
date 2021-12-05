import database as db
from csvReader import csv_to_dataFrame

print("-----------------------------------")
df_categorias = csv_to_dataFrame("CATEGORIAS")
print("Inserindo categorias")
db.insert_categorias(df_categorias)


print("-----------------------------------")
df_usuarios = csv_to_dataFrame("PESSOAS")
print("Inserindo usuários")
db.insert_usuario(df_usuarios)

print("-----------------------------------")
df_eventos = csv_to_dataFrame("EVENTOS")
print("Inserindo eventos")
db.insert_evento(df_eventos)

print("-----------------------------------")
df_publicacao = csv_to_dataFrame("PUBLICACAO")
print("Inserindo publicações")
db.insert_publicacao(df_publicacao)

print("-----------------------------------")
df_inscricao = csv_to_dataFrame("INSCRICOES")
print("Inserindo inscrições")
db.insert_inscricao(df_inscricao)

print("-----------------------------------")
df_clique = csv_to_dataFrame("CLIQUES")
print("Inserindo cliques")
db.insert_clique(df_clique)

print("-----------------------------------")
df_gostei = csv_to_dataFrame("GOSTEI")
print("Inserindo gosteis")
db.insert_gostei(df_gostei)
