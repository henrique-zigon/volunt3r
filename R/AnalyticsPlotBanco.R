#Novo R gerando as informações para plotar o banco

#Imports
library(readr)
library(randomNames)
library(tibble)
library(dplyr)
library(readr)
library(tidyverse)
library(stringr)
library(readr)

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

rm(base_pessoas_imp)

#Criando as categorias para criar os eventos após isso
categorias_n1 <- data.frame(
  nome_categoria = c(
    "Doação de Cestas Básicas",
    "Doação de Cobertores e Agasalhos",
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
    "Doação de Sangue",
    "Indicação de Projetos",
    "Workshops/Lives/Palestras",
    "Simulação de Entrevista",
    "Multirões Mão na Massa"
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
    "Aulas de Inglês"
  ),
  nivel = 3,
  limite_bronze = 2,
  limite_prata = 3,
  limite_ouro =  4,
  milhas_promocao=5
)


categorias_n4 <- data.frame(
  nome_categoria = c(
    "Comitês Estratégicos",
    "Consultoria/Serviços a ONGs Parceiras"
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
numero_eventos_ano <- 53
id_evento <- 1:numero_eventos_ano
data_evento <- sample(seq(as.Date('2021/01/01'), as.Date('2021/11/30'), by="day")
                      , numero_eventos_ano)
data_fechamento_evento = data_evento + 30
endereco <- paste("Rua ", id_evento, " de 2021")
set.seed(69)
fk_categoria <- round(runif(numero_eventos_ano, 1, 12))
set.seed(333)
titulo <- paste("Evento ", id_evento, " de 2021")

# Para definir os seguintes valores utilizarei uma tabela auxiliar de categoria
#        (Ou seja, nesse caso, simularemos baseando-se na categoria)
#    maximo_participantes
#    horas
#    milhas_participacao

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

base_eventos <- data.frame(
  id_evento,
  data_evento,
  data_fechamento_evento,
  endereco,
  maximo_participantes = eventos_aux$maximo_participantes,
  horas                = eventos_aux$horas,
  fk_categoria         = eventos_aux$fk_categoria,
  titulo,
  milhas_participacao  = eventos_aux$milhas_participacao
)

#Criando publicações
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

write.table(export_data, "C:/Users/Ygor/Pictures/upload_arquivo", quote = FALSE, append = FALSE, row.names = FALSE, col.names = FALSE, fileEncoding="UTF-8")


