left_join(
  x = base_inscricoes,
  y = base_eventos,
  by = c("fk_evento" = "id_evento")
) -> base_teste
  
base_teste %>%
  mutate(data_definitiva = format(data_evento, format="%Y")) %>%
  group_by(data_definitiva) %>%
  summarise(n = n())

-> base_teste


base_teste %>%
  group_by(data_definitiva) %>%
  summarise(n = n_distinct(fk_usuario))

left_join(
  x = base_teste,
  y = base_pessoas,
  by = c("fk_usuario" = "id_usuario")
) -> base_teste_2

left_join(
  x = base_teste_2,
  y = base_categorias,
  by = c("fk_categoria" = "id_categoria")
) -> base_joins


base_joins %>%
  group_by(data_definitiva, fk_usuario) %>%
  summarise(nivel = max(nivel), 
            qtdHoras = sum(horas), 
            qtdParticipacoes = n(),
            score = qtdHoras * qtdParticipacoes) -> base_show
base_show %>%
  filter(data_definitiva == 2021) -> base_show_v2

hist(base_show_v2$score)

left_join(base_pessoas, base_show_v2, by = c("id_usuario" = "fk_usuario")) %>%
  replace(is.na(.), 0) %>%
  group_by(id_usuario) %>%
  summarise(perfil2 = ifelse(score == 0, "FANTASMA", 
                             ifelse(score <= 0.25, "TIMIDO", 
                                    ifelse(score <= 1.5, "AMADOR", 
                                           ifelse(score <= 10.0, "CASUAL", 
                                                  ifelse(score <= 25, "ATIVO", "ENGAJADO")))))) -> teste_join_perfil

left_join(teste_join_perfil, serase, by=c("id_usuario" = "fk_usuario")) -> base_show_v3
base_show_v3$perfilv2_2021 <- base_show_v3$perfil2
base_show_v3$full_perfil <- paste(base_show_v3$perfil, base_show_v3$perfil2)

barplot(table(base_show_v3$full_perfil), horiz=TRUE, names.arg = unique(base_show_v3$full_perfil), las=2)
barplot(table(base_show_v3$full_perfil), t,rotation=45)

base_show %>%
  rownames_to_column() %>%
  gather(data_definitiva, nivel, -rowname) %>%
  spread(rowname, nivel) -> teste_base_show

  
library(tidyverse)
library(dplyr)

base_show %>%
  pivot_wider(names_from = data_definitiva, values_from = nivel) %>%
  replace(is.na(.), 0) %>%
  mutate(perfil = ifelse(`2021` == `2020`, "ESTAGNADO", 
                         ifelse(`2020` < `2021`, "CRESCENTE", "DESCRESENTE"))) -> serase

         