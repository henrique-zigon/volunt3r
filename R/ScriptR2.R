library(readr)
Eventos <- read_delim("C:/Users/Henrique/Desktop/EstudoR/Eventos.csv", 
                      ";", escape_double = FALSE, trim_ws = TRUE)


Eventos$nParticipantes<-as.double(Eventos$nParticipantes)

Publicacoes <- read_delim("C:/Users/Henrique/Desktop/EstudoR/Publicacoes.csv", 
                          ";", escape_double = FALSE, trim_ws = TRUE)

library(readr)

Voluntario <- read_delim("C:/Users/Henrique/Desktop/EstudoR/Voluntario.csv", 
                         ";", escape_double = FALSE, trim_ws = TRUE)

library(readr)




#-----------------------Simulando 3 anos de eventos para trás-------------------
{
  set.seed(10)
  
  #for de ano
  contadorNovosEventos<-nrow(Eventos)+1
  anoTeste<-1
  for(ano in c(1:3)){
    qntEventSim<-sample((nrow(Eventos)):20,1)#qnts eventos ocorreram no ano
    
    for(eventoAno in c(1:qntEventSim)){
      esN1<-abs(round(rbinom(1,1,0.42)))#o evento da vez é N1? 1 sim 0 não
      
      
      if(esN1==0){                 #Porcentagens está no excel
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
  
  
  # conjQnt<-c(abs(round(rbinom(1178,1,0.99)))) #Quase ngm na nossa base de dados não participou de nada 01%
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
  
  
  #--------------------------------Inserção na tabela-----------------------------
  
  
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
  
  
  #-------------------Mudança no formato da coluna de datas-----------------------
  
  
  #Eventos$dataEvento<-as.Date(format(Eventos$dataEvento),"%d/%m/%Y")
  #Eventos$dataFechamento<-as.Date(format(Eventos$dataFechamento),"%d/%m/%Y")
  
  
  #-------------------------------------------------------------------------------
}
