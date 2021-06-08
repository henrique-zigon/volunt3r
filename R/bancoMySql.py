from mysql import connector
import mysql.connector

class Mysql:
    def __init__(self, user, password, host, database):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.mysql = None
        self.cursor = None

    def connect(self):
        try:
            self.mysql = mysql.connector.connect(
            user=self.user, password=self.password, host=self.host, database=self.database,auth_plugin='mysql_native_password')
            #Criando cursor para manipulação do banco.
            print(self.mysql)
            print("\033[32m", "Conexao ao Banco Estabelecida", "\033[0;0m")
            self.cursor = self.mysql.cursor()
        except Exception as err:
            print(err)
            print("\033[31m", "Erro na Conexão ao Banco", "\033[0;0m")                                                                                  
            raise

    def insert_evento(self, data):
        # print("Data=")
        # print(data)
        # print("------") 
        values = data       
        query = ("INSERT INTO Evento"
         "(evento, categoria, nParticipantes,horas,"
         "aderencia,dataEvento,dataFechamento,cliques,likes)"
        "VALUES('{}','{}',{}, {},{} ,'{}', '{}', {},{})"
        ).format(values[0],values[1],values[2],values[3],
        values[4],values[5],values[6],values[7],values[8])
     
        
        try:
            self.cursor.execute(query)
            self.mysql.commit()

        except Exception as err:
            print(err)
            self.mysql.rollback()
            self.close()

    def insert_voluntario(self, data):
        # print("Data=")
        # print(data)
        # print("------") 
        values = data       
        query = ("INSERT INTO Voluntario"
         "(nome, cargo, classificacao,totalHrN1,"
         "totalHrN2,totalHrN3,totalHrN4,totalHr,totalQntN1,"
         "totalQntN2,totalQntN3,totalQntN4,totalQnt,score,tempoCasa)"
        "VALUES('{}','{}','{}',{},{},{},{},{},{},{},{},{},{},{},{})"
        ).format(values[0],values[1],values[2],values[3],
        values[4],values[5],values[6],values[7],values[8],
        values[9],values[10],values[11],values[12],values[13],
        values[14])
     
        
        try:
            self.cursor.execute(query)
            self.mysql.commit()

        except Exception as err:
            print(err)
            self.mysql.rollback()
            self.close()



    def close(self):
        self.mysql.close()
