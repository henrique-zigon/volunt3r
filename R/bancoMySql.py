from mysql import connector
import mysql.connector
from rpy2.robjects import NULL
import pyodbc 

class Mysql:
    def __init__(self, user, password, host, database):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.mysql = None
        self.cursor = None
        self.driver= '{ODBC Driver 17 for SQL Server}'

    def connect(self):
        try:


            driver_name = ''
            driver_names = [x for x in pyodbc.drivers() if x.endswith(' for SQL Server')]
            if driver_names:
                driver_name = driver_names[0]
            if driver_name:
                conn_str = 'DRIVER={}; ...'.format(driver_name)
    # then continue with ...
    # pyodbc.connect(conn_str)
    # ... etc.
            else:
                print('(No suitable driver found. Cannot connect.)')

            self.mysql= pyodbc.connect('DRIVER='+self.driver+';SERVER=tcp:'+self.host+';PORT=1433;DATABASE='+self.database+';UID='+self.user+';PWD='+ self.password)
            # self.mysql = mysql.connector.connect(
            # user=self.user, password=self.password, host=self.host, database=self.database,auth_plugin='mysql_native_password')
            # #Criando cursor para manipulação do banco.
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
        print("Data=")
        values = data 
        print(values)
        print("------")       
        query = ("INSERT INTO Voluntario"
        "(nomeUsuario,cargo,ano2019,ano2020,ano2021,totalMinutosN1,totalMinutosN2,"
        "totalMinutosN3,totalMinutosN4,totalMinutos,totalParticipacoesN1,totalParticipacoesN2,"
        "totalParticipacoesN3,totalParticipacoesN4,totalParticipacoes,score,tempoCasa, aderencia)" 
        "VALUES('{}','{}','{}','{}','{}',{},{},{},{},{},{},{},{},{},{},{},{},{})"
        ).format(values[1],values[2],values[3],
        values[4],values[5],values[6],values[7],values[8],
        values[9],values[10],values[11],values[12],values[13],
        values[14],values[15],values[16],values[17],values[18])
     
        
        try:
            self.cursor.execute(query)
            self.mysql.commit()

        except Exception as err:
            print(err)
            self.mysql.rollback()
            self.close()



    def close(self):
        self.mysql.close()
