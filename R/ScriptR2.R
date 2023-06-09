library(readr)
Eventos <- read_delim("C:/Users/ygor/Documents/volunt3r/R/Eventos.csv", 
                      ";", escape_double = FALSE, col_types = cols(dataEvento = col_date(format = "%d/%m/%Y"), 
                                                                   dataFechamento = col_date(format = "%d/%m/%Y")), 
                      trim_ws = TRUE)


Eventos$nParticipantes<-as.double(Eventos$nParticipantes)

Publicacoes <- read_delim("C:/Users/ygor/Documents/volunt3r/R/Publicacoes.csv", 
                          ";", escape_double = FALSE, trim_ws = TRUE)

library(readr)

Voluntario <- read_delim("C:/Users/ygor/Documents/volunt3r/R/Voluntario.csv", 
                         ";", escape_double = FALSE, trim_ws = TRUE)

library(readr)




#-----------------------Simulando 3 anos de eventos para tr�s-------------------
{
  set.seed(10)
  
  #for de ano
  contadorNovosEventos<-nrow(Eventos)+1
  anoTeste<-1
  for(ano in c(1:3)){
    qntEventSim<-sample((nrow(Eventos)):20,1)#qnts eventos ocorreram no ano
    
    for(eventoAno in c(1:qntEventSim)){
      esN1<-abs(round(rbinom(1,1,0.42)))#o evento da vez � N1? 1 sim 0 n�o
      
      
      if(esN1==0){                 #Porcentagens est� no excel
        esN2<-abs(round(rbinom(1,1,0.69)))
        if(esN2==0){
          esN3<-esN2<-abs(round(rbinom(1,1,0.77)))
          if(esN3==0){
            Eventos[contadorNovosEventos,2]<-"N4"
          }else{
            Eventos[contadorNovosEventos,2]<-"N3"
          }
        }else{
          Eventos[contadorNovosEventos,2]<-"N2"
        }
      }else{
        Eventos[contadorNovosEventos,2]<-"N1"
      }
      
      Eventos[contadorNovosEventos,1]<-paste("EventoBonito",contadorNovosEventos,sep = "")
      
      
      
      data1<-paste("201",(10-anoTeste) ,sep="")
      data1<-paste(data1,"-01-01" ,sep="")
      data1<-as.Date(data1)
      data2<-paste("201",(10-anoTeste),sep="")
      data2<-paste(data2,"-12-31" ,sep="")
      data2<-as.Date(data2)
      
      data3<-format(as.Date.character(sample(seq(as.Date(data1),
                                                 as.Date(data2),
                                                 by="day"), 1)),"%Y-%m-%d")
      Eventos[contadorNovosEventos,6]<-as.Date(data3)
      Eventos[contadorNovosEventos,7]<-as.Date(format(as.Date.character(sample(seq(as.Date
                                                                                   (data3),
                                                                                   as.Date(data2),
                                                                                   by="day"), 1)),"%Y-%m-%d"))
      contadorNovosEventos<-contadorNovosEventos+1
      
      
    }
    anoTeste<-anoTeste+1
  }
  
  for(eventao in c(1:nrow(Eventos))){
    if(as.character(Eventos[eventao,2])=="N1"){
      Eventos[eventao,4]<-20
    }else{
      if(as.character(Eventos[eventao,2])=="N2"){
        Eventos[eventao,4]<-45
      }else{
        if(as.character(Eventos[eventao,2])=="N3"){
          Eventos[eventao,4]<-60
        }
        else{
          Eventos[eventao,4]<-180
        }
      }
      
    }
    
    
  }
  
}

#-------------------------------------------------------------------------------
{
  
  
  
  
  #-----------------------Populando Publicacoes-----------------------------------
  
  
  sorteioDono<-c(round(abs(rnorm(100,500,200))))
  testeFor<-c()
  for(i in 1:nrow(Publicacoes)){
    testeFor[i]<-(as.array(Voluntario[[sorteioDono[i],1]])  )
  } 
  
  sorteioDono1<-factor(sorteioDono,levels = sorteioDono,labels = testeFor)
  
  Publicacoes['Dono']<-sorteioDono1
  Publicacoes['Eventos(fk)']<-sample(nrow(Eventos):1,100,replace = TRUE)
  Publicacoes['Cliques']<-c(round(abs(rnorm(100,200,100))))
  Publicacoes['Likes']<-c(round(abs(rnorm(100,50,20))))
  
  
  #---------------------Contando quanto LIkes/Cliques cada evento teve------------
  
  
  f<-data.frame()
  for(i2 in c(1:nrow(Eventos))){
    f1<-subset(Publicacoes,Publicacoes$`Eventos(fk)`==i2,select=c('Cliques','Likes'))
    f1[is.na(f1)]<-data.frame(0,0)
    f[i2,1]<-(sum(f1$Cliques))
    f[i2,2]<-(sum(f1$Likes))
  }
  Eventos['Cliques']<-f$V1
  Eventos['Likes']<-f$V2
  
  
  #---------------------Sorteio Voluntario N1-------------------------------------
  
  
  # conjQnt<-c(abs(round(rbinom(1178,1,0.99)))) #Quase ngm na nossa base de dados n�o participou de nada 01%
  # 
  # #For p/ passar N1:N4
  # for(iCat in c(1:4)){
  #   
  #   #For p/ popular Hr e Qnt
  #   for(iVol in c(1:nrow(Voluntario))){
  #     if(conjQnt[iVol]==1){
  #       
  #       if(iCat==1){
  #         fezN1<-abs(round(rbinom(1,1,0.73)))#Ve se ele participou do n1 73% 
  #         if(fezN1>0){
  #           sorteioQnt<-abs(round(rnorm(1,1,2)))+1
  #           Voluntario$TotalQntN1[iVol]<-sorteioQnt
  #           Voluntario$TotalHrN1[iVol]<-(sorteioQnt*20) #N1=20 minutos
  #         }else{
  #           Voluntario$TotalQntN1[iVol]<-0
  #           Voluntario$TotalHrN1[iVol]<-0 
  #         }
  #     
  #       }
  #       
  #       if(iCat==2){
  #         fezN2<-abs(round(rbinom(1,1,0.17)))#Ve se ele participou do n2 17% 
  #         if(fezN2>0){                       #17% de 73
  #           sorteioQnt<-abs(round(rnorm(1,1,2)))+1
  #           Voluntario$TotalQntN2[iVol]<-sorteioQnt
  #           Voluntario$TotalHrN2[iVol]<-(sorteioQnt*45)
  #         }else{
  #           Voluntario$TotalQntN2[iVol]<-0
  #           Voluntario$TotalHrN2[iVol]<-0 
  #         }
  #         
  #         
  #       }
  #       
  #       if(iCat==3){
  #         fezN3<-abs(round(rbinom(1,1,0.08)))#Ve se ele participou do n3 08% 
  #         if(fezN3>0){
  #           sorteioQnt<-abs(round(rnorm(1,1,2)))+1
  #           Voluntario$TotalQntN3[iVol]<-sorteioQnt
  #           Voluntario$TotalHrN3[iVol]<-(sorteioQnt*60)
  #         }else{
  #           Voluntario$TotalQntN3[iVol]<-0
  #           Voluntario$TotalHrN3[iVol]<-0 
  #         }
  #       }
  #       
  #       if(iCat==4){
  #         fezN4<-abs(round(rbinom(1,1,0.02)))#Ve se ele participou do n4 % 
  #         if(fezN4>0){
  #           sorteioQnt<-abs(round(rnorm(1,1,2)))+1
  #           Voluntario$TotalQntN4[iVol]<-sorteioQnt
  #           Voluntario$TotalHrN4[iVol]<-(sorteioQnt*180)
  #         }else{
  #           Voluntario$TotalQntN4[iVol]<-0
  #           Voluntario$TotalHrN4[iVol]<-0 
  #         }
  #       }
  #       
  #       
  #     }
  #     else{
  #       if(iCat==1){
  #         Voluntario$TotalQntN1[iVol]<-0
  #         Voluntario$TotalHrN1[iVol]<-0
  #       }
  #       if(iCat==2){
  #         Voluntario$TotalQntN2[iVol]<-0
  #         Voluntario$TotalHrN2[iVol]<-0
  #       }
  #       if(iCat==3){
  #         Voluntario$TotalQntN3[iVol]<-0
  #         Voluntario$TotalHrN3[iVol]<-0
  #       }
  #       if(iCat==4){
  #         Voluntario$TotalQntN4[iVol]<-0
  #         Voluntario$TotalHrN4[iVol]<-0
  #       }
  #     }
  #   }
  # }
  
  #-------------------------------------------------------------------------------
  
  contN1<-0
  contN2<-0
  contN3<-0
  contN4<-0
  perfil<-0
  for(iVol5 in c(1:nrow(Voluntario))){
    print(iVol5)
    print("e")
    print(perfil)
    porct<-c(abs(round(rbinom(1,1,0.99))))
    if(porct>0){
      
      
      cabo<-FALSE
      while (cabo==FALSE) {
        es<-abs(round(rbinom(1,1,0.73)))
        if(es>0){
          perfil<-'N1'
          contN1<-contN1+1
          cabo=TRUE
        }
        es<-abs(round(rbinom(1,1,0.17)))
        if(es>0){
          perfil<-'N2'
          contN2<-contN2+1
          cabo=TRUE
        }
        es<-abs(round(rbinom(1,1,0.08)))
        if(es>0){
          perfil<-'N3'
          contN3<-contN3+1
          cabo=TRUE
        }
        es<-abs(round(rbinom(1,1,0.02)))
        if(es>0){
          perfil<-'N4'
          contN4<-contN4+1
          cabo=TRUE
        }
      }
      
      if(perfil=='N1'){
        sorteioQnt<-abs(round(rnorm(1,1,2)))+1
        Voluntario$TotalQntN1[iVol5]<-sorteioQnt
        Voluntario$TotalHrN1[iVol5]<-(sorteioQnt*20)
        
        #conjQntN1[iVol5]<-sorteioQnt
        
        Voluntario$TotalQntN2[iVol5]<-0
        Voluntario$TotalHrN2[iVol5]<-0
        
        Voluntario$TotalQntN3[iVol5]<-0
        Voluntario$TotalHrN3[iVol5]<-0
        
        Voluntario$TotalQntN4[iVol5]<-0
        Voluntario$TotalHrN4[iVol5]<-0
        
      }
      if(perfil=='N2'){
        
        fezN1<-abs(round(rbinom(1,1,0.73)))
        if(fezN1>0){
          sorteioQnt<-abs(round(rnorm(1,1,2)))+1
          Voluntario$TotalQntN1[iVol5]<-sorteioQnt
          #conjQntN1[iVol5]<-sorteioQnt
          Voluntario$TotalHrN1[iVol5]<-(sorteioQnt*20)
        }else{
          Voluntario$TotalQntN1[iVol5]<-0
          Voluntario$TotalHrN1[iVol5]<-0
        }
        
        sorteioQnt<-abs(round(rnorm(1,1,2)))+1
        Voluntario$TotalQntN2[iVol5]<-sorteioQnt
        Voluntario$TotalHrN2[iVol5]<-sorteioQnt*45
        
        Voluntario$TotalQntN3[iVol5]<-0
        Voluntario$TotalHrN3[iVol5]<-0
        
        
        Voluntario$TotalQntN4[iVol5]<-0
        Voluntario$TotalHrN4[iVol5]<-0
      }
      if(perfil=='N3'){
        
        fezN1<-abs(round(rbinom(1,1,0.73)))
        if(fezN1>0){
          sorteioQnt<-abs(round(rnorm(1,1,2)))+1
          Voluntario$TotalQntN1[iVol5]<-sorteioQnt
          #conjQntN1[iVol5]<-sorteioQnt
          Voluntario$TotalHrN1[iVol5]<-(sorteioQnt*20)
        }else{
          Voluntario$TotalQntN1[iVol5]<-0
          Voluntario$TotalHrN1[iVol5]<-0
        }
        
        fezN2<-abs(round(rbinom(1,1,0.17)))
        if(fezN2>0){
          sorteioQnt<-abs(round(rnorm(1,1,2)))+1
          Voluntario$TotalQntN2[iVol5]<-sorteioQnt
          Voluntario$TotalHrN2[iVol5]<-(sorteioQnt*45)
        }else{
          Voluntario$TotalQntN2[iVol5]<-0
          Voluntario$TotalHrN2[iVol5]<-0
        }
        
        sorteioQnt<-abs(round(rnorm(1,1,2)))+1
        Voluntario$TotalQntN3[iVol5]<-sorteioQnt
        Voluntario$TotalHrN3[iVol5]<-(sorteioQnt*60)
        
        Voluntario$TotalQntN4[iVol5]<-0
        Voluntario$TotalHrN4[iVol5]<-0
        
      }
      if(perfil=='N4'){
        
        fezN1<-abs(round(rbinom(1,1,0.73)))
        if(fezN1>0){
          sorteioQnt<-abs(round(rnorm(1,1,2)))+1
          Voluntario$TotalQntN1[iVol5]<-sorteioQnt
          #conjQntN1[iVol5]<-sorteioQnt
          Voluntario$TotalHrN1[iVol5]<-(sorteioQnt*20)
        }else{
          Voluntario$TotalQntN1[iVol5]<-0
          Voluntario$TotalHrN1[iVol5]<-0
        }
        
        fezN2<-abs(round(rbinom(1,1,0.17)))
        if(fezN2>0){
          sorteioQnt<-abs(round(rnorm(1,1,2)))+1
          Voluntario$TotalQntN2[iVol5]<-sorteioQnt
          Voluntario$TotalHrN2[iVol5]<-(sorteioQnt*45)
        }else{
          Voluntario$TotalQntN2[iVol5]<-0
          Voluntario$TotalHrN2[iVol5]<-0
        }
        
        fezN3<-abs(round(rbinom(1,1,0.08)))
        if(fezN3>0){
          sorteioQnt<-abs(round(rnorm(1,1,2)))+1
          Voluntario$TotalQntN3[iVol5]<-sorteioQnt
          Voluntario$TotalHrN3[iVol5]<-(sorteioQnt*60)
        }else{
          Voluntario$TotalQntN3[iVol5]<-0
          Voluntario$TotalHrN3[iVol5]<-0
        }
        
        sorteioQnt<-abs(round(rnorm(1,1,2)))+1
        Voluntario$TotalQntN4[iVol5]<-sorteioQnt
        Voluntario$TotalHrN4[iVol5]<-(sorteioQnt*180)
      }
      else{
        print("-cima-")
        print(perfil)
        print("-baixo-")    
      }
    }
    else{
      Voluntario$TotalQntN1[iVol5]<-0
      #conjQntN1[iVol5]<-0
      Voluntario$TotalHrN1[iVol5]<-0
      
      Voluntario$TotalQntN2[iVol5]<-0
      Voluntario$TotalHrN2[iVol5]<-0
      
      Voluntario$TotalQntN3[iVol5]<-0
      Voluntario$TotalHrN3[iVol5]<-0
      
      Voluntario$TotalQntN4[iVol5]<-0
      Voluntario$TotalHrN4[iVol5]<-0
    }
  }
  
  
  
  #Voluntario$TotalQntN1<-conjQntN1
  
  
  
  
  
  #----------Populando Score e total e  tempo de casa e aderencia(% particiapda)--
  
  
  somaHr<-c()
  somaQnt<-c()
  somaScore<-c()
  conjTempoCasa<-c()
  conjAderen<-c()
  #For para popular Total de Hr e qnt
  for (iVol1 in c(1:nrow(Voluntario))) {
    somaHr[iVol1]<-Voluntario[[iVol1,4]]+Voluntario[[iVol1,5]]+Voluntario[[iVol1,6]]+Voluntario[[iVol1,7]]
    
    somaQnt[iVol1]<-Voluntario[[iVol1,9]]+Voluntario[[iVol1,10]]+Voluntario[[iVol1,11]]+Voluntario[[iVol1,12]]
    
    somaScore[iVol1]<-as.double(somaHr[iVol1])*as.double(somaQnt[iVol1])
    
    #
    # 20min - 100 satisfa��o   |  1 evento - 100 satisfa��o
    # 40min - 140 satisfa��o   |  2 evento - 180 satisfa��o
    # 60min - 180 satisfa��o   |  3 evento - 240 satisfa��o
    #
    # 
    # 25h   - 
    
    if(somaScore[iVol1]<=500){
      sorteio <- rbinom(1,1,0.8) #80% de ter grande tempo de casa
      if(sorteio==1){
        tempSort<-abs(round(rnorm(1,12,1),2))
      }else{
        tempSort<-abs(round(rnorm(1,4,1),2))
      }
      conjTempoCasa[iVol1]<-tempSort
    }
    if(somaScore[iVol1]<=1000){
      sorteio <- rbinom(1,1,0.45) #45% de ter grande tempo de casa
      if(sorteio==1){
        tempSort<-abs(round(rnorm(1,6,1),2))
      }else{
        tempSort<-abs(round(rnorm(1,2,1),2))
      }
      conjTempoCasa[iVol1]<-tempSort
    }
    else{
      sorteio <- rbinom(1,1,0.2) #20% de ter grande tempo de casa
      if(sorteio==1){
        tempSort<-abs(round(rnorm(1,4,1),2))
      }else{
        tempSort<-abs(round(rnorm(1,1,1),2))
      }
      conjTempoCasa[iVol1]<-tempSort
    }
    
    
    
    
    
  }
  Voluntario['TotalHr']<-somaHr
  Voluntario['TotalQnt']<-somaQnt
  Voluntario['Score']<-somaScore
  Voluntario['TempoCasa']<-conjTempoCasa
  #---------------------------Aderencia do cara-----------------------------------
  
  conjAderen<-c()
  for (iVol2 in c(1:nrow(Voluntario))) {
    conjAderen[iVol2]<-as.numeric(Voluntario[iVol2,13])*100/nrow(Eventos)
  }
  
  
  Voluntario['Aderencia']<-conjAderen
  #-----------------------Classificando Voluntario--------------------------------
  
  
  classif<-c()
  for(iVolN in c(1:nrow(Voluntario))){
    
    p<-0
    
    for(iCatN in c(4:7)){
      if(Voluntario[iVolN,iCatN]>0){
        p<-iCatN
      }
      
    }
    if(p==0){
      classif[iVolN]<-paste("N",0,sep ="")
    }else{
      classif[iVolN]<-paste("N",p-3,sep ="")
    }
    
  }
  Voluntario['Classificacao']<-classif
  
  
  #-----------------------Simular qnt de participantes----------------------------
  
  
  n1Part<-abs(round(rnorm(length( subset(Eventos$categoria,Eventos$categoria=='N1')),7,116)))+1#7 mediana e 116 media
  #variavelX<-0
  while (length(subset(Voluntario$TotalQntN1,Voluntario$TotalQntN1>0))<max(n1Part)) {
    #variavelX<-variavelX+1
    n1Part<-abs(round(rnorm(length( subset(Eventos$categoria,Eventos$categoria=='N1')),7,116)))+1
  }
  
  n2Part<-abs(round(rnorm(length( subset(Eventos$categoria,Eventos$categoria=='N2')),1,7)))#1 mediana e 7 media
  #variavelY<-0
  while (length(subset(Voluntario$TotalQntN2,Voluntario$TotalQntN2>0))<max(n2Part)) {
    #variavelY<-variavelY+1
    n2Part<-abs(round(rnorm(length( subset(Eventos$categoria,Eventos$categoria=='N2')),1,7)))
  }
  
  n3Part<-abs(round(rnorm(length( subset(Eventos$categoria,Eventos$categoria=='N3')),9,15)))#9 mediana e 15 media
  #variavelZ<-0
  while (length(subset(Voluntario$TotalQntN3,Voluntario$TotalQntN3>0))<max(n3Part)) {
    #variavelZ<-variavelZ+1
    n3Part<-abs(round(rnorm(length( subset(Eventos$categoria,Eventos$categoria=='N3')),9,15)))
  }
  
  n4Part<-abs(round(rnorm(length(subset(Eventos$categoria,Eventos$categoria=='N4')),28,28)))#28 mediana e 28 media
  #variavelW<-0
  while (length(subset(Voluntario$TotalQntN4,Voluntario$TotalQntN4>0))<max(n4Part)) {
    #variavelW<-variavelW+1
    n4Part<-abs(round(rnorm(length(subset(Eventos$categoria,Eventos$categoria=='N4')),28,28)))
  }
  
  
  #--------------------------------Inser��o na tabela-----------------------------
  
  
  contN1<-1
  contN2<-1
  contN3<-1
  contN4<-1
  for( eventoVez in c(1:nrow(Eventos))){
    if(Eventos$categoria[eventoVez]=='N1'){
      if(n1Part[contN1]<=0){
        n1Part[contN1]<-1
      }
      Eventos[eventoVez,3]<-n1Part[contN1]
      contN1<-contN1+1
    }
    if(Eventos$categoria[eventoVez]=='N2'){
      if(n2Part[contN2]<=0){
        n2Part[contN2]<-1
      }
      Eventos[eventoVez,3]<-n2Part[contN2]
      contN2<-contN2+1
    }
    if(Eventos$categoria[eventoVez]=='N3'){
      if(n3Part[contN3]<=0){
        n3Part[contN3]<-1
      }
      Eventos[eventoVez,3]<-n3Part[contN3]
      contN3<-contN3+1
    }
    if(Eventos$categoria[eventoVez]=='N4'){
      if(n4Part[contN4]<=0){
        n4Part[contN4]<-1
      }
      Eventos[eventoVez,3]<-n4Part[contN4]
      contN4<-contN4+1
    }
  }
  
  
  #---------------------------Aderencia-------------------------------------------
  
  
  for( eventoVez1 in c(1:nrow(Eventos))){
    Eventos$Aderencia[eventoVez1]<-Eventos$nParticipantes[eventoVez1]*100/1179 
  }
  
  
  #-------------------Mudan�a no formato da coluna de datas-----------------------
  
  
  #Eventos$dataEvento<-as.Date(format(Eventos$dataEvento),"%d/%m/%Y")
  #Eventos$dataFechamento<-as.Date(format(Eventos$dataFechamento),"%d/%m/%Y")
  
  
  #-------------------------------------------------------------------------------
}

library(randomNames)
library(tibble)
library(dplyr)
library(readr)
library(tidyverse)
library(stringr)
library(readr)

set.seed(333)

base_pessoas_imp <- read_delim("C:/Users/ygor/Documents/volunt3r/R/Voluntario.csv", 
                               ";", escape_double = FALSE, trim_ws = TRUE)
#  nome_usuario OK 
#  genero OK
#  bio SEM
#  quantidade_milhas SEM
#  tipo_usuario OK
#  email OK 
#  senha SEM
#  cargo OK
#  area OK
#  imagem_perfil SEM
#  imagem_capa SEM
#  status_usuario  OK

base_pessoas <- randomNames(nrow(base_pessoas_imp),
                            ethnicity=4,
                            which.names="both",
                            name.order="first.last",
                            name.sep=" ",
                            sample.with.replacement=TRUE,
                            return.complete.data=TRUE)

base_pessoas$id_usuario <- 1:nrow(base_pessoas)

base_pessoas$cargo <- Voluntario$Cargo

base_pessoas$tipo_usuario <- "comum"

base_pessoas <- base_pessoas %>%
  mutate(sexo = case_when(
    gender == 0 ~ "Masculino",
    gender == 1 ~ "Feminino"
  )) %>%
  unite(nome_usuario, c("first_name","last_name"), sep=" ")

base_pessoas$email <- tolower(paste(
  word(base_pessoas$nome_usuario,1),
  ".",
  word(base_pessoas$nome_usuario,-1),
  "@b4.com.br",
  sep = ""
)
)

base_pessoas$status_usuario <- 1

base_pessoas$area <- sample(rep(
  c(
    rep("B3 Social", 2),
    rep("Produtos Analytics", 5),
    rep("Listados", 6),
    rep("Balcao", 6)
  ),
  times = nrow(base_pessoas) / 19
))

base_pessoas$gender <- NULL
base_pessoas$ethnicity <- NULL

categorias <- data.frame(
  id_categoria = c(1,2,3,4),
  nome_categoria = c("Live Instagram",
                     "Doacao",
                     "Mentoria",
                     "Curso Intensivo"),
  nivel = c(1,2,3,4),
  limite_bronze = c(5,5,2,1),
  limite_prata = c(10,10,3,2),
  limite_ouro = c(15,15,4,3),
  milhas_promocao = 5
)


library("dplyr")
library("ggplot2")
library("alluvial")
# devtools::install_github('thomasp85/ggforce')
library("ggforce")
# devtools::install_github("corybrunson/ggalluvial")
library("ggalluvial")
library("ggparallel")

#global variables
A_col <- "darkorchid1"
B_col <- "darkorange1"
C_col <- "skyblue1"
D_col <- "burlywood"
alpha <- 0.7 # transparency value
fct_levels <- c("A","C","B","D")

matriz_pessoas_nivel <- data.frame(
  idUsuario = base_pessoas$id_usuario,
  nomeUsuario = base_pessoas$nome_usuario,
  ano2019 = sample(c("N1","N2","N3","N4"),nrow(base_pessoas_imp),
                   replace = TRUE,prob=c(0.7,0.15,0.10, 0.05)),
  ano2020  = sample(c("N1","N2","N3","N4"),nrow(base_pessoas_imp),
                    replace = TRUE,prob=c(0.6,0.2,0.25, 0.1)),
  ano2021 = Voluntario$Classificacao,
  totalMinutosN1 = Voluntario$TotalHrN1,
  totalMinutosN2 = Voluntario$TotalHrN2,
  totalMinutosN3 = Voluntario$TotalHrN3,
  totalMinutosN4 = Voluntario$TotalHrN4,
  totalMinutos = Voluntario$TotalHr,
  totalParticipacoesN1 = Voluntario$TotalQntN1,
  totalParticipacoesN2 = Voluntario$TotalQntN2,
  totalParticipacoesN3 = Voluntario$TotalQntN3,
  totalParticipacoesN4 = Voluntario$TotalQntN4,
  totalParticipacoes = Voluntario$TotalQnt,
  score = Voluntario$Score,
  tempoCasa = Voluntario$TempoCasa,
  aderencia = Voluntario$Aderencia,
  stringsAsFactors = FALSE
)

dimensao_alluvial <- matriz_pessoas_nivel %>%
  group_by(ano2019,ano2020,ano2021) %>%
  summarise(freq = n()) %>%
  ungroup()

dat_ggforce <- dimensao_alluvial  %>%
  gather_set_data(1:3) %>%        # <- ggforce helper function
  arrange(x,ano2019,ano2020,desc(ano2021))

#ggplot(dat_ggforce,
#       aes(x = x, stratum = y, alluvium = id,
#           y = freq,
#           fill = y, label = y)) +
#  scale_x_discrete(expand = c(.1, .1)) +
#  geom_flow() +
#  geom_stratum(alpha = .5) +
#  geom_text(stat = "stratum", size = 3) +
#  theme(legend.position = "none") +
#  ggtitle("Evolu��o do voluntariado ao passar dos anos") +
#  xlab("Ano de refer�ncia") +
#  ylab("Quantidade de volunt�rios")

#ggsave(path = "C:/Users/Ygor/Pictures", width = 9, height = 10, device='png', dpi=700, filename="graph.png")

export_data <- c(
  paste("00UPLOAD07-10-202123:42:0001"),
  paste(
    "02",
    format(base_pessoas$nome_usuario, width = 200, justify="left"),
    format(base_pessoas$sexo, width = 10, justify="left"),
    format(base_pessoas$tipo_usuario, width = 10, justify="left"),
    format(base_pessoas$email, width = 55, justify="left"),
    format(base_pessoas$cargo, width = 50, justify="left"),
    format(base_pessoas$area, width = 100, justify="left"),
    sep=""
  ),
  "0101178"
)


#write.table(export_data, "C:/Users/Ygor/Pictures/tests", quote = FALSE, append = FALSE, row.names = FALSE, col.names = FALSE)

#library("writexl")
#write_xlsx(matriz_pessoas_nivel,"C:/Users/Ygor/Pictures/dimensao_voluntarios.xlsx")
