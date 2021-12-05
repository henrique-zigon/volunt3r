#Novo R gerando as informações para plotar o banco

#Imports
library(readr)
library(randomNames)
library(tibble)
library(dplyr)
library(tidyverse)
library(stringr)

#Configuração
set.seed(333)

#Vamos começar com a base de funcionários

#Precisamos dessa base, que foi enviada pela B3 Social para ter as informações de cargos
base_pessoas_imp <- read_delim("C:/Users/ygor/Documents/volunt3r/R/Voluntario.csv", 
                               ";", escape_double = FALSE, trim_ws = TRUE)

#Colocando as informações de nomes e sexo
base_pessoas <- randomNames(nrow(base_pessoas_imp),
                            ethnicity=4,
                            which.names="both",
                            name.order="first.last",
                            name.sep=" ",
                            sample.with.replacement=TRUE,
                            return.complete.data=TRUE)

#Atribuindo um id para os usuários
base_pessoas$id_usuario <- 1:nrow(base_pessoas)

#Colocando os cargos conforme a base importada
base_pessoas$cargo <- base_pessoas_imp$Cargo

#Todos eles serão do tipo comum
base_pessoas$tipo_usuario <- "comum"

#Mudando o sexo para o nome por extenso e juntando o primeiro nome com o último nome
base_pessoas <- base_pessoas %>%
  mutate(sexo = case_when(
    gender == 0 ~ "Masculino",
    gender == 1 ~ "Feminino"
  )) %>%
  unite(nome_usuario, c("first_name","last_name"), sep=" ")

#Criando e-mails para os usuários
base_pessoas$email <- tolower(paste(
  word(base_pessoas$nome_usuario,1),
  ".",
  word(base_pessoas$nome_usuario,-1),
  "@b4.com.br",
  sep = ""
)
)

#Isso significa que todos eles são ativos
base_pessoas$status_usuario <- 1
base_pessoas$quantidade_milhas <- 0

#E aleatorizando as áreas que os voluntários fazem parte
base_pessoas$area <- sample(rep(
  c(
    rep("B3 Social", 2),
    rep("Produtos Analytics", 5),
    rep("Listados", 6),
    rep("Balcao", 6)
  ),
  times = nrow(base_pessoas) / 19
))

#Tirando as informações que não utilizaremos que a biblioteca randomNames dá
base_pessoas$gender <- NULL
base_pessoas$ethnicity <- NULL

base_pessoas[1, "tipo_usuario"] <- "b3_social"

rm(base_pessoas_imp)

#Criando as categorias para criar os eventos após isso
categorias_n1 <- data.frame(
  nome_categoria = c(
    "Doacao de Cestas Basicas",
    "Doacao de Cobertores e Agasalhos",
    "Sacolinha de fim de ano"
  ),
  nivel = 1,
  limite_bronze = 7,
  limite_prata = 10,
  limite_ouro =  15,
  milhas_promocao=5
)

categorias_n2 <- data.frame(
  nome_categoria = c(
    "Doacao de Sangue",
    "Indicacao de Projetos",
    "Workshops/Lives/Palestras",
    "Simulacao de Entrevista",
    "Multiroes Mao na Massa"
  ),
  nivel = 2,
  limite_bronze = 5,
  limite_prata = 10,
  limite_ouro =  15,
  milhas_promocao=5
)

categorias_n3 <- data.frame(
  nome_categoria = c(
    "Mentoria",
    "Aulas de Ingles"
  ),
  nivel = 3,
  limite_bronze = 2,
  limite_prata = 3,
  limite_ouro =  4,
  milhas_promocao=5
)


categorias_n4 <- data.frame(
  nome_categoria = c(
    "Comites Estrategicos",
    "Consultoria/Servicos a ONGs Parceiras"
  ),
  nivel = 4,
  limite_bronze = 1,
  limite_prata = 2,
  limite_ouro =  3,
  milhas_promocao=5
)

base_categorias <- rbind(categorias_n1,
                         categorias_n2,
                         categorias_n3,
                         categorias_n4)

base_categorias$id_categoria <- 1:nrow(base_categorias)

rm(categorias_n1, categorias_n2, categorias_n3, categorias_n4)

#Simbora criar os eventos
numero_eventos_ano <- 53 * 3
id_evento <- 1:numero_eventos_ano
data_evento <- sample(seq(as.Date('2021/01/01'), as.Date('2021/11/30'), by="day")
                      , numero_eventos_ano/3)
data_evento <- c(data_evento, sample(seq(as.Date('2020/01/01'), as.Date('2020/11/30'), by="day")
                                     , numero_eventos_ano/3))
data_evento <- c(data_evento, sample(seq(as.Date('2019/01/01'), as.Date('2019/11/30'), by="day")
                                     , numero_eventos_ano/3))
data_fechamento_evento = data_evento + 30
endereco <- paste("Rua ", id_evento, " de 2021")
set.seed(69)
fk_categoria <- round(runif(numero_eventos_ano, 1, 12))
set.seed(333)
# Para definir os seguintes valores utilizarei uma tabela auxiliar de categoria
#        (Ou seja, nesse caso, simularemos baseando-se na categoria)
#    maximo_participantes
#    horas
#    milhas_participacao
#    titulo

categorias_aux <- data.frame(
  id = base_categorias$id_categoria,
  nome = base_categorias$nome_categoria,
  nivel = base_categorias$nivel
)

categorias_aux$maximo_participantes <- c(
  0,  #Doação de Cestas Básicas
  0,  #Doação de Cobertores e Agasalhos
  0,  #Sacolinha de fim de ano
  0,  #Doação de Sangue
  0,  #Indicação de Projetos
  10, #Workshops/Lives/Palestras
  7,  #Simulação de Entrevista
  20, #Multirões Mão na Massa
  5,  #Mentoria
  8,  #Aulas de Inglês
  4,  #Comitês Estratégicos
  4   #Consultoria/Serviços a ONGs Parceiras
)

categorias_aux$horas <- c(
  0.25,  #Doação de Cestas Básicas
  1,     #Doação de Cobertores e Agasalhos
  0.25,  #Sacolinha de fim de ano
  8,     #Doação de Sangue
  0.5,   #Indicação de Projetos
  2,     #Workshops/Lives/Palestras
  5,     #Simulação de Entrevista
  8,     #Multirões Mão na Massa
  20,    #Mentoria
  10,    #Aulas de Inglês
  5,     #Comitês Estratégicos
  20     #Consultoria/Serviços a ONGs Parceiras
)

categorias_aux$milhas_participacao <- c(
  5,  #Doação de Cestas Básicas
  10, #Doação de Cobertores e Agasalhos
  5,  #Sacolinha de fim de ano
  15, #Doação de Sangue
  10, #Indicação de Projetos
  15, #Workshops/Lives/Palestras
  20, #Simulação de Entrevista
  20, #Multirões Mão na Massa
  30, #Mentoria
  25, #Aulas de Inglês
  25, #Comitês Estratégicos
  30  #Consultoria/Serviços a ONGs Parceiras
)

eventos_aux <- data.frame(
  fk_categoria
)

eventos_aux$maximo_participantes <- categorias_aux$maximo_participantes[eventos_aux$fk_categoria]
eventos_aux$horas                <- categorias_aux$horas[eventos_aux$fk_categoria]
eventos_aux$milhas_participacao  <- categorias_aux$milhas_participacao[eventos_aux$fk_categoria]
eventos_aux$titulo               <- paste("Evento de", categorias_aux$nome[eventos_aux$fk_categoria])

base_eventos <- data.frame(
  id_evento,
  data_evento,
  data_fechamento_evento,
  endereco,
  maximo_participantes = eventos_aux$maximo_participantes,
  horas                = eventos_aux$horas,
  fk_categoria         = eventos_aux$fk_categoria,
  titulo               = eventos_aux$titulo,
  milhas_participacao  = eventos_aux$milhas_participacao
)

#Criando publicações

base_publicacao <- data.frame(
  id_publicacao = base_eventos$id_evento,
  descricao = paste("Descrição adequada do", base_eventos$titulo),
  data_postagem = base_eventos$data_evento,
  imagem = paste("evento_",base_eventos$id_evento,".jpg", sep=""),
  fk_usuario = rep(1, nrow(base_eventos)),
  fk_evento = base_eventos$id_evento,
  publicacao_pai = rep(0, nrow(base_eventos)),
  tipo = rep("EVENTO", nrow(base_eventos))
)


numero_publicacoes <- numero_eventos_ano * 5
fk_usuario <- round(runif(numero_publicacoes, 1, nrow(base_pessoas)))
fk_evento <- rep(
  1:nrow(base_eventos),
  5
)
publicacao_pai <- fk_evento

pub_aux <- data.frame(
  fk_usuario,
  fk_evento,
  publicacao_pai
)

pub_aux <- pub_aux[sample(1:numero_publicacoes, numero_publicacoes/2), ]

data_postagem_pub <- c()
for(i in pub_aux$fk_evento) {
  x = sample(seq(base_eventos[i,]$data_evento, base_eventos[i,]$data_fechamento_evento+5, by="day"), 1)
  data_postagem_pub <- c(data_postagem_pub, x)
}
data_postagem_pub
data_postagem_pub <- as.Date(data_postagem_pub, "1970-01-01")
pub_aux <- data.frame(
  id_publicacao = (1+nrow(base_publicacao)):(nrow(pub_aux)+nrow(base_publicacao)),
  descricao = paste("Descricao adequada da publicação ", pub_aux$fk_evento),
  data_postagem = data_postagem_pub,
  imagem = paste("pub_",1:nrow(pub_aux),".jgp", sep=""),
  fk_usuario = pub_aux$fk_usuario,
  fk_evento = pub_aux$fk_evento,
  publicacao_pai = pub_aux$publicacao_pai,
  tipo = "PUBLICACAO"
)
base_publicacao <- rbind(base_publicacao, pub_aux)

rm(categorias_aux,eventos_aux, pub_aux)
rm(data_evento, data_fechamento_evento, data_postagem_pub, endereco, 
   fk_categoria, fk_evento, fk_usuario, i, id_evento, numero_eventos_ano,
   numero_publicacoes, publicacao_pai, titulo, x)

#SIMBORA COMENTARIOS
numero_comentarios <- (nrow(base_publicacao) - nrow(base_eventos)) * 10
fk_usuario <- round(runif(numero_comentarios, 1, nrow(base_pessoas)))
publicacao_pai <- rep(
  (1+nrow(base_eventos)):nrow(base_publicacao),
  10
)
fk_evento <- base_publicacao[publicacao_pai,]$fk_evento

coment_aux <- data.frame(
  fk_usuario,
  fk_evento,
  publicacao_pai
)

coment_aux <- coment_aux[sample(1:numero_comentarios, numero_comentarios/2),]

data_postagem_coment <- c()
for(i in coment_aux$publicacao_pai) {
  x = sample(seq(base_publicacao[i, ]$data_postagem, base_publicacao[i, ]$data_postagem+5,  by="day"), 1)
  data_postagem_coment <- c(data_postagem_coment, x)
}
data_postagem_coment <- as.Date(data_postagem_coment, "1970-01-01")
coment_aux <- data.frame(
  id_publicacao = (1+nrow(base_publicacao)):(nrow(coment_aux)+nrow(base_publicacao)),
  descricao = paste("Descricao adequada do comentario da publicação ", coment_aux$publicacao_pai),
  data_postagem = data_postagem_coment,
  imagem = paste("coment_",1:nrow(coment_aux),".jgp", sep=""),
  fk_usuario = coment_aux$fk_usuario,
  fk_evento = coment_aux$fk_evento,
  publicacao_pai = coment_aux$publicacao_pai,
  tipo = "COMENTARIO"
)
base_publicacao <- rbind(base_publicacao, coment_aux)

rm(coment_aux, data_postagem_coment, fk_evento, fk_usuario, i, numero_comentarios, publicacao_pai, x)

#Vamos inscrever os usuários nos eventos
#Primeiro, filtrarei todos os eventos que não são ilimitados
eventos_aux <- base_eventos %>%
  filter(maximo_participantes != 0)

quantidade_inscricoes <- sum(eventos_aux$maximo_participantes)

base_inscricoes <- data.frame(
  id_inscricao_evento = 1:quantidade_inscricoes,
  fk_evento = c(rep(eventos_aux$id_evento, eventos_aux$maximo_participantes)),
  fk_usuario = round(runif(quantidade_inscricoes, 1, nrow(base_pessoas))),
  status_ue = "CONFIRMADO"
)

base_inscricoes %>%
  group_by(fk_usuario) %>%
  summarise(n = n())

rm(eventos_aux, quantidade_inscricoes)

#Agora as inscrições dos eventos de participações ilimitadas
eventos_aux <- base_eventos %>%
  filter(maximo_participantes == 0)

porcentagem_por_evento <- 0.08

participados <- data.frame()
for(ev in eventos_aux$id_evento) {
  participados_now <- data.frame(
    id_evento = ev,
    participou = runif(nrow(base_pessoas),0, 1) < porcentagem_por_evento,
    id_usuario = 1:nrow(base_pessoas)
  )
  
  participados_now <- participados_now %>%
    filter(participou)
  
  participados <- rbind(participados, participados_now)
} 

inscricoes_aux <- data.frame(
  id_inscricao_evento = (1+nrow(base_inscricoes)):(nrow(participados)+nrow(base_inscricoes)),
  fk_evento = participados$id_evento,
  fk_usuario = participados$id_usuario,
  status_ue = "CONFIRMADO"
)

base_inscricoes <- rbind(base_inscricoes, inscricoes_aux)

base_inscricoes %>%
  group_by(fk_usuario) %>%
  summarise(n = n()) -> teste_usuario

nrow(base_pessoas) - nrow(teste_usuario) 

rm(eventos_aux, inscricoes_aux, participados, participados_now, teste_usuario, ev, porcentagem_por_evento)

#Simulando os gosteis de EVENTOS
pubs_aux <- base_publicacao %>%
  filter(tipo == "EVENTO")
porcentagem_por_evento <- 0.2

curtidos <- data.frame()
for(pub in pubs_aux$id_publicacao) {
  curtidos_now <- data.frame(
    id_publicacao = pub,
    curtiu = runif(nrow(base_pessoas), 0, 1) < porcentagem_por_evento,
    id_usuario = 1:nrow(base_pessoas)
  )
  
  curtidos_now <- curtidos_now %>%
    filter(curtiu)
  
  curtidos <- rbind(curtidos, curtidos_now)
}

base_gostei <- data.frame(
  id_gostei = 1:nrow(curtidos),
  fk_publicacao = curtidos$id_publicacao,
  fk_usuario = curtidos$id_usuario
)

rm(curtidos, curtidos_now, porcentagem_por_evento, pub, pubs_aux)

#Simulando os gosteis de PUBLICACOES
pubs_aux <- base_publicacao %>%
  filter(tipo == "PUBLICACAO")
porcentagem_por_evento <- 0.08

curtidos <- data.frame()
for(pub in pubs_aux$id_publicacao) {
  curtidos_now <- data.frame(
    id_publicacao = pub,
    curtiu = runif(nrow(base_pessoas), 0, 1) < porcentagem_por_evento,
    id_usuario = 1:nrow(base_pessoas)
  )
  
  curtidos_now <- curtidos_now %>%
    filter(curtiu)
  
  curtidos <- rbind(curtidos, curtidos_now)
}

gostei_aux <- data.frame(
  id_gostei = (1+nrow(base_gostei)):(nrow(curtidos)+nrow(base_gostei)),
  fk_publicacao = curtidos$id_publicacao,
  fk_usuario = curtidos$id_usuario
)

base_gostei <- rbind(base_gostei, gostei_aux)

rm(curtidos, curtidos_now, porcentagem_por_evento, pub, pubs_aux, gostei_aux)

#Simulando os gosteis de COMENTARIOS
pubs_aux <- base_publicacao %>%
  filter(tipo == "COMENTARIO")
porcentagem_por_evento <- 0.003

curtidos <- data.frame()
for(pub in pubs_aux$id_publicacao) {
  curtidos_now <- data.frame(
    id_publicacao = pub,
    curtiu = runif(nrow(base_pessoas), 0, 1) < porcentagem_por_evento,
    id_usuario = 1:nrow(base_pessoas)
  )
  
  curtidos_now <- curtidos_now %>%
    filter(curtiu)
  
  curtidos <- rbind(curtidos, curtidos_now)
}

gostei_aux <- data.frame(
  id_gostei = (1+nrow(base_gostei)):(nrow(curtidos)+nrow(base_gostei)),
  fk_publicacao = curtidos$id_publicacao,
  fk_usuario = curtidos$id_usuario
)

base_gostei <- rbind(base_gostei, gostei_aux)

rm(curtidos, curtidos_now, porcentagem_por_evento, pub, pubs_aux, gostei_aux)


#Simulando os cliques de EVENTOS
pubs_aux <- base_publicacao %>%
  filter(tipo == "EVENTO")
porcentagem_por_evento <- 0.2

clicados <- data.frame()
for(pub in pubs_aux$id_publicacao) {
  clicados_now <- data.frame(
    id_publicacao = pub,
    clicou = runif(nrow(base_pessoas), 0, 1) < porcentagem_por_evento,
    id_usuario = 1:nrow(base_pessoas)
  )
  
  clicados_now <- clicados_now %>%
    filter(clicou)
  
  clicados <- rbind(clicados, clicados_now)
}

base_cliques <- data.frame(
  id_gostei = 1:nrow(clicados),
  fk_publicacao = clicados$id_publicacao,
  fk_usuario = clicados$id_usuario
)

rm(clicados, clicados_now, porcentagem_por_evento, pub, pubs_aux)

base_eventos$data_evento <- strftime(base_eventos$data_evento,"%d/%m/%Y")
base_eventos$data_fechamento_evento <- strftime(base_eventos$data_fechamento_evento,"%d/%m/%Y")
base_publicacao$data_postagem <- strftime(base_publicacao$data_postagem,"%d/%m/%Y")


#A gente decidiu colocar imagem das categorias
base_categorias$imagem_bronze <- c(
  "cestas_bronze.PNG",
  "roupa_bronze.PNG",
  "sacolinha_bronze.PNG",
  "sangue_bronze.PNG",
  "projetos_bronze.PNG",
  "workshop_bronze.PNG",
  "entrevista_bronze.PNG",
  "multirao_bronze.PNG",
  "mentoria_bronze.PNG",
  "ingles_bronze.PNG",
  "estrategico_bronze.PNG",
  "ong_bronze.PNG"
)

base_categorias$imagem_prata <- c(
  "cestas_prata.PNG",
  "roupa_prata.PNG",
  "sacolinha_prata.PNG",
  "sangue_prata.PNG",
  "projetos_prata.PNG",
  "workshop_prata.PNG",
  "entrevista_prata.PNG",
  "multirao_prata.PNG",
  "mentoria_prata.PNG",
  "ingles_prata.PNG",
  "estrategico_prata.PNG",
  "ong_prata.PNG"
)

base_categorias$imagem_ouro <- c(
  "cestas_ouro.PNG",
  "roupa_ouro.PNG",
  "sacolinha_ouro.PNG",
  "sangue_ouro.PNG",
  "projetos_ouro.PNG",
  "workshop_ouro.PNG",
  "entrevista_ouro.PNG",
  "multirao_ouro.PNG",
  "mentoria_ouro.PNG",
  "ingles_ouro.PNG",
  "estrategico_ouro.PNG",
  "ong_ouro.PNG"
)

#Exportando os dados
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
  paste(
    "04",
    format(base_categorias$nome_categoria, width=50),
    format(base_categorias$nivel, width=1),
    gsub(" ", "0", format(base_categorias$limite_bronze, width=3, justify="right")),
    gsub(" ", "0", format(base_categorias$limite_prata, width=3, justify="right")),
    gsub(" ", "0", format(base_categorias$limite_ouro, width=3, justify="right")),
    gsub(" ", "0", format(base_categorias$milhas_promocao, width=3, justify="right")),
    sep=""
  ),
  paste("01",gsub(" ", "0", format(nrow(base_categorias) + nrow(base_pessoas), width=5, justify="right")), sep="")
)

#write.table(export_data, "C:/Users/Ygor/Pictures/upload_arquivo", quote = FALSE, append = FALSE, row.names = FALSE, col.names = FALSE, fileEncoding="UTF-8")

funcao <- function(base, nome) {
  con <- file(nome, open="w", encoding="UTF-8")
  write.table(base, nome, sep = ";", row.names = FALSE, quote=FALSE)
  close(con)
}

funcao(base_categorias, "C:/Users/Ygor/Documents/volunt3r/R/CSV_Files/CATEGORIAS.csv")
funcao(base_cliques, "C:/Users/Ygor/Documents/volunt3r/R/CSV_Files/CLIQUES.csv")
funcao(base_eventos, "C:/Users/Ygor/Documents/volunt3r/R/CSV_Files/EVENTOS.csv")
funcao(base_gostei, "C:/Users/Ygor/Documents/volunt3r/R/CSV_Files/GOSTEI.csv")
funcao(base_inscricoes, "C:/Users/Ygor/Documents/volunt3r/R/CSV_Files/INSCRICOES.csv")
funcao(base_pessoas, "C:/Users/Ygor/Documents/volunt3r/R/CSV_Files/PESSOAS.csv")
funcao(base_publicacao, "C:/Users/Ygor/Documents/volunt3r/R/CSV_Files/PUBLICACAO.csv")

rm(export_data)
