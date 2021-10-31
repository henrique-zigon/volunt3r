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

#Simbora criar os eventos
numero_eventos_ano <- 53
datas <- sample(seq(as.Date('2021/01/01'), as.Date('2021/11/30'), by="day"), numero_eventos_ano)
numero_participantes <- as.integer(rnorm(numero_eventos_ano, 15, 5))
set.seed(69)
fk_categoria <- round(runif(numero_eventos_ano, 1, 12))
set.seed(333)

base_eventos <- data.frame(
  id_evento = 1:numero_eventos_ano,
  data_evento = datas,
  data_fechamento_evento = datas + 30,
  maximo_participantes = numero_participantes,
  fk_categoria,
  
)
#Pensar na possibilidade de utilizar a base enviada pela B3SOCIAL
#Existem eventos que não tem limite de participantes


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


