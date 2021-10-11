from bancoMySql import Mysql
#from sprintPython import function_evento
from sprintPython import function_voluntario
import time
import pyodbc 

#---------------------------------------------------
# mysql=Mysql('root','admin','localhost','plots')
# mysql.connect()

server = 'servidor-volunt3r.database.windows.net'
database = 'Volunt3rDataBase'
username = 'urubu100'
password = '#Gfgrupo4'   

mysql=Mysql(username,password,server,database)
mysql.connect()

#---------------------------------------------------

print("INSERINDO VOLUNTARIOS-POR FAVOR AGUARDE")


# tabelaEvento=function_evento()
# print(len(tabelaEvento))

# for even in range(len(tabelaEvento)):
#     # print(tabelaEvento[even])
#     # print(".")
#     mysql.insert_evento(tabelaEvento[even])
    


time.sleep(0.1)
print("INSERINDO VOLUNTARIOS-POR FAVOR AGUARDE")
time.sleep(0.1)



tabelaVoluntario=function_voluntario()

for volu in range(len(tabelaVoluntario)):
    # print(tabelaVoluntario[volu])
    # print(".")
    mysql.insert_voluntario(tabelaVoluntario[volu])
    
