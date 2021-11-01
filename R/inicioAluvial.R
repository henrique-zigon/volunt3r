library(ggplot2)
library(ggalluvial)
head(as.data.frame(UCBAdmissions), n = 12)

is_alluvia_form(as.data.frame(UCBAdmissions), axes = 1:3, silent = TRUE)

ggplot(as.data.frame(UCBAdmissions),
       aes(y = Freq, axis1 = Gender, axis2 = Dept)) +
  geom_alluvium(aes(fill = Admit), width = 1/12) +
  geom_stratum(width = 1/12, fill = "black", color = "grey") +
  geom_label(stat = "stratum", aes(label = after_stat(stratum))) +
  scale_x_discrete(limits = c("Gender", "Dept"), expand = c(.05, .05)) +
  scale_fill_brewer(type = "qual", palette = "Set1") +
  ggtitle("UC Berkeley admissions and rejections, by sex and department")


data(vaccinations)
vaccinations <- transform(vaccinations,
                          response = factor(response, rev(levels(response))))
ggplot(vaccinations,
       aes(x = survey, stratum = response, alluvium = subject,
           y = freq,
           fill = response, label = response)) +
  scale_x_discrete(expand = c(.1, .1)) +
  geom_flow() +
  geom_stratum(alpha = .5) +
  geom_text(stat = "stratum", size = 3) +
  theme(legend.position = "none") +
  ggtitle("vaccination survey responses at three points in time")







# outro tutorial

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

dat_raw <- data.frame(ano2020 = sample(c("N1","N2","N3","N4"),2000,
                                       replace = TRUE,prob=c(0.7,0.15,0.10, 0.05)),
                      ano2021  = sample(c("N1","N2","N3","N4"),2000,
                                       replace = TRUE,prob=c(0.6,0.2,0.25, 0.1)),
                      ano2022 = sample(c("N1","N2","N3","N4"),2000,
                                    replace = TRUE,prob=c(0.3,0.6,0.3, 0.15)),
                      stringsAsFactors = FALSE)
dat <- dat_raw %>%
  group_by(ano2020,ano2021,ano2022) %>%
  summarise(freq = n()) %>%
  ungroup()

dat_ggforce <- dat  %>%
  gather_set_data(1:3) %>%        # <- ggforce helper function
  arrange(x,ano2020,ano2021,desc(ano2022))

ggplot(dat_ggforce, aes(x = x, id = id, split = y, value = freq)) +
  geom_parallel_sets(aes(fill = ano2020), alpha = alpha, axis.width = 0.2,
                     n=2000, strength = 0.5) +
  geom_parallel_sets_axes(axis.width = 0.25, fill = "gray95",
                          color = "gray80", size = 0.15) +
  geom_parallel_sets_labels(colour = 'gray35', size = 4.5, angle = 0, fontface="bold") +
  scale_fill_manual(values  = c(A_col, B_col, C_col, D_col)) +
  scale_color_manual(values = c(A_col, B_col, C_col, D_col)) +
  theme_minimal() +
  theme(
    legend.position = "none",
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    axis.text.y = element_blank(),
    axis.text.x = element_text(size = 20, face = "bold"),
    axis.title.x  = element_blank()
  )
ggsave(path = "C:/Users/Ygor/Pictures", width = 9, height = 10, device='png', dpi=700, filename="graph.png")


dat_ggforce2 <- dat_ggforce %>%
  mutate_at(vars(Modeled, Tested), 
            funs(factor(., levels = fct_levels)))

ggplot(dat_ggforce2, aes(x = x, id = id, split = y, value = freq)) +
  geom_parallel_sets(aes(fill = Tested), alpha = alpha, axis.width = 0.2,
                     n=100, strength = 0.5) +
  geom_parallel_sets_axes(axis.width = 0.25, fill = "gray95",
                          color = "gray80", size = 0.15) +
  geom_parallel_sets_labels(colour = 'gray35', size = 4.5, angle = 0, fontface="bold") +
  scale_fill_manual(values  = c(A_col, C_col, B_col)) +
  scale_color_manual(values = c(A_col, C_col, B_col)) +
  theme_minimal() +
  theme(
    legend.position = "none",
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    axis.text.y = element_blank(),
    axis.text.x = element_text(size = 20, face = "bold"),
    axis.title.x  = element_blank()
  )


dat_ggalluvial <- dat

ggplot(dat_ggalluvial,
       aes(weight = freq, axis1 = Modeled, axis2 = Tested)) +
  geom_alluvium(aes(fill = Tested, color = Tested), 
                width = 1/12, alpha = alpha, knot.pos = 0.4) +
  geom_stratum(width = 1/6,color = "grey") +
  scale_fill_manual(values  = c(A_col, B_col, C_col)) +
  scale_color_manual(values = c(A_col, B_col, C_col)) +
  geom_text(stat = "stratum", label.strata = TRUE) +
  scale_x_continuous(breaks = 1:2, labels = c("Modeled", "Tested")) +
  theme_minimal() +
  theme(
    legend.position = "none",
    panel.grid.major = element_blank(), 
    panel.grid.minor = element_blank(),
    axis.text.y = element_blank(),
    axis.text.x = element_text(size = 18, face = "bold")
  )


















# três variaveis

data(vaccinations)
vaccinations <- transform(vaccinations,
                          response = factor(response, rev(levels(response))))
ggplot(dat_ggforce,
       aes(x = x, stratum = y, alluvium = id,
           y = freq,
           fill = y, label = y)) +
  scale_x_discrete(expand = c(.1, .1)) +
  geom_flow() +
  geom_stratum(alpha = .5) +
  geom_text(stat = "stratum", size = 3) +
  theme(legend.position = "none") +
  ggtitle("Evolução do voluntariado ao passar dos anos")
  xlab("Ano de referência")
  ylab("Quantidade de voluntários")
ggsave(path = "C:/Users/Ygor/Pictures", width = 9, height = 10, device='png', dpi=700, filename="graph.png")
