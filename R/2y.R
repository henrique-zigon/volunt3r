library('ggplot2')

VolunAtivo<-subset(Voluntario,Voluntario$Score>0)

p<-ggplot(VolunAtivo) + aes(TempoCasa) + geom_line(aes(y=Score/sapply(VolunAtivo['Score'],min),col="Score"))

p2<- p +geom_line(aes(y=Aderencia,col="Aderencia(%)")) 

p3<- p2 + scale_y_continuous(sec.axis = sec_axis(~.*sapply(VolunAtivo['Score'],min),name = "Score")) 

p3 + scale_color_manual(values = c("#F57E6B","#0D9ED7")) +
  labs(title = "Qnt X Score",x="Anos na empresa",y="Aderencia",colour=NULL) 
 
 #+ theme(legend.position = c(0.5,1))

#p/ salvar
ggsave(filename = "graficobonito.png",plo)

#-------------------Faiaxs------------------------------------------------------

Faixa1<-nrow(subset(Voluntario,Voluntario$Score>=0 & Voluntario$Score<500))
Faixa2<-nrow(subset(Voluntario,Voluntario$Score>=500 & Voluntario$Score<1000))
Faixa3<-nrow(subset(Voluntario,Voluntario$Score>=1000 & Voluntario$Score<1500))
Faixa4<-nrow(subset(Voluntario,Voluntario$Score>=1500 & Voluntario$Score<2000))
Faixa5<-nrow(subset(Voluntario,Voluntario$Score>=2000 & Voluntario$Score<2500))
Faixa6<-nrow(subset(Voluntario,Voluntario$Score>=2500))

conjLegal<-c(Faixa1,Faixa2,Faixa3,Faixa4,Faixa5,Faixa6)

conjFaix<-c("Faixa1","Faixa2","Faixa3","Faixa4","Faixa5","Faixa6")

conjDemi<-c(80,50,34,10,2,1)

conjTipo<-c("Total","Total","Total","Total","Total","Total","Demissao","Demissao","Demissao","Demissao","Demissao","Demissao")

Faixas<-data.frame("faixa"=conjFaix,"qnt"=conjLegal+conjDemi,"Tipo"=conjTipo)


FaixaDemi<-data.frame("faixaD"=conjFaix,"qntD"=conjLegal)


plotFaixa<-ggplot(Faixas,aes(faixa,qnt))  + geom_col()

ggplot(data=Faixas,aes(x=faixa,y=qnt,fill=Tipo)) + geom_bar(stat = 'identity' , position = 'stack')  
#proximo,precisa arrumar o fill q n ta batendo
#adicionar segundo eixo y

#-----------------------------------//------------------------------------------

