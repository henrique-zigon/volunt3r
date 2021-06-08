from bancoMySql import Mysql
from sprintPython import function_evento


#---------------------------------------------------
mysql=Mysql('root','admin','localhost','PLOTS')
mysql.connect()
#---------------------------------------------------

tabelaEvento=function_evento()
print(len(tabelaEvento))

#mysql.insert_evento(tabelaEvento[0])

for even in range(len(tabelaEvento)):
    print(tabelaEvento[even])
    print(".")
    mysql.insert_evento(tabelaEvento[even])
    