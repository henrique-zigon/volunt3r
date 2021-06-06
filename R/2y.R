library('ggplot2')
library(tidyr)

VolunAtivo<-subset(Voluntario,Voluntario$Score>0 & Voluntario$Classificacao!='N0')

p<-ggplot(VolunAtivo) + aes(TempoCasa) + geom_line(aes(y=Score/sapply(VolunAtivo['Score'],min),col="Score"))

p2<- p +geom_line(aes(y=Aderencia,col="Aderencia(%)")) 

p3<- p2 + scale_y_continuous(sec.axis = sec_axis(~.*sapply(VolunAtivo['Score'],min),name = "Score")) 

p3 + scale_color_manual(values = c("#F57E6B","#0D9ED7")) +
  labs(title = "Qnt X Score",x="Anos na empresa",y="Aderencia",colour=NULL) 
 
 #+ theme(legend.position = c(0.5,1))

#p/ salvar
ggsave(filename = "graficobonito.png",plo)

#-------------------Faixas------------------------------------------------------

Faixa1<-nrow(subset(Voluntario,Voluntario$Score>=0 & Voluntario$Score<500))
Faixa2<-nrow(subset(Voluntario,Voluntario$Score>=500 & Voluntario$Score<1000))
Faixa3<-nrow(subset(Voluntario,Voluntario$Score>=1000 & Voluntario$Score<1500))
Faixa4<-nrow(subset(Voluntario,Voluntario$Score>=1500 & Voluntario$Score<2000))
Faixa5<-nrow(subset(Voluntario,Voluntario$Score>=2000 & Voluntario$Score<2500))
Faixa6<-nrow(subset(Voluntario,Voluntario$Score>=2500))

p3 + scale_color_manual(values = c("#F57E6B","#0D9ED7")) +
  labs(title = "Qnt X Score",x="Anos na empresa",y="Aderencia",colour=NULL) +
  geom_hline(yintercept = 500/sapply(VolunAtivo['Score'],min))+
  geom_hline(yintercept = 1000/sapply(VolunAtivo['Score'],min))+
  geom_hline(yintercept = 1500/sapply(VolunAtivo['Score'],min))+
  geom_hline(yintercept = 2000/sapply(VolunAtivo['Score'],min))+
  geom_hline(yintercept = 2500/sapply(VolunAtivo['Score'],min))

conjLegal<-c(Faixa1,Faixa2,Faixa3,Faixa4,Faixa5,Faixa6)

conjFaix<-c("Faixa1","Faixa2","Faixa3","Faixa4","Faixa5","Faixa6")

conjDemi<-c(80,50,34,10,2,1)

Faixas<-data.frame("faixa"=conjFaix,"qnt"=conjLegal+conjDemi,"qntD"=conjDemi)

xoxo<-Faixas %>% gather("qnt","qntD",-faixa)

position_stack(vjust =  0)

ggplot(xoxo,aes(x=faixa,y=qntD,fill=qnt))+geom_col(position="dodge")+geom_line(aes(y=))

plotFaixa<-ggplot(Faixas,aes(faixa,qnt))  + geom_col()



#-----------------------------------//------------------------------------------

VolunAtivo1<-nrow(subset(Voluntario,Voluntario$Score>0 & Voluntario$Classificacao=='N1'))
VolunAtivo2<-nrow(subset(Voluntario,Voluntario$Score>0 & Voluntario$Classificacao=='N2'))
VolunAtivo3<-nrow(subset(Voluntario,Voluntario$Score>0 & Voluntario$Classificacao=='N3'))
VolunAtivo4<-nrow(subset(Voluntario,Voluntario$Score>0 & Voluntario$Classificacao=='N4'))

totalVol<-c(VolunAtivo1,VolunAtivo2,VolunAtivo3,VolunAtivo4)


barplot(totalVol)
abline(lm(VolunAtivo$TempoCasa~VolunAtivo$Score))




#-------------------------------------------------------------------------------
plot(VolunAtivo$TempoCasa,VolunAtivo$Score)
abline(lm(VolunAtivo$Score~VolunAtivo$TempoCasa))
#-------------------------------------------------------------------------------
#
#
#
#-------------------------------------------------------------------------------

pie(table(Eventos$categoria))

acompanhamentoEvento<-Eventos[11:16,]
ggplot(acompanhamentoEvento) + aes(dataEvento) + geom_line(aes(y=nParticipantes))

