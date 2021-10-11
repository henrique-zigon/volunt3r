# coding: utf8
# -*- coding: utf-8 -*-
from rpy2.rinterface_lib.sexp import StrSexpVector
import rpy2.robjects as robjects
from rpy2.robjects.conversion import Converter
import rpy2.robjects.packages as rpackages
from rpy2.robjects.vectors import StrVector
import datetime


utils=rpackages.importr('utils')
utils.chooseCRANmirror(ind=1)
utils.install_packages('randomNames')
utils.install_packages('tidyverse')
utils.install_packages('dplyr')
utils.install_packages('stringr')
utils.install_packages('tibble')
utils.install_packages('tibble')

package_names = ('afex','emmeans')

if all(rpackages.isinstalled(x) for x in package_names):
    have_package=True
    
else:
    have_package=False

if not have_package:
    
    utils.chooseCRANmirror(ind=1)

    packnames_to_install=[x for x in package_names if not rpackages.isinstalled(x)]

    if len(packnames_to_install)>0:
        utils.install_packages(StrVector(packnames_to_install))

    
#-----------------------------------------------------------------------------------

robjects.r('source("C:/Users/Henrique/Desktop/ScriptR2(2).R")')



# def function_evento():
#     robjects.r('Eventos$dataEvento<-as.character(Eventos$dataEvento)')
#     robjects.r('Eventos$dataFechamento<-as.character(Eventos$dataFechamento)')
    
#     tabelEvent=robjects.r('Eventos')
#     nRowEven=robjects.r('nrow(Eventos)')
#     #nColEven=robjects.r('length(Eventos)')

#     print(tabelEvent)
#     #convertido=datetime.date(int(tabelEvent[6][6]))
#     #print(convertido)
#     tabelaEvento={}
#     for ev in range(int(nRowEven[0])):
#         objEven={}
#         objEven[0]=tabelEvent[0][ev]
#         objEven[1]=tabelEvent[1][ev]
#         objEven[2]=tabelEvent[2][ev]
#         objEven[3]=tabelEvent[3][ev]
#         objEven[4]=tabelEvent[4][ev]
#         objEven[5]=tabelEvent[5][ev]
#         objEven[6]=tabelEvent[6][ev]
#         #objEven[6]=robjects.r('as.character(Eventos$dataEvento[{}])'.format(ev))
#         #print(str(objEven[6]))
#         objEven[7]=tabelEvent[7][ev]
#         #objEven[7]=robjects.r('as.character(Eventos$dataFechamento[{}])'.format(ev))
#         #print(str(objEven[7]))
#         objEven[8]=tabelEvent[8][ev]
#         tabelaEvento[ev]=objEven
#     return tabelaEvento

def function_voluntario():
    
    tabelVolu=robjects.r('matriz_pessoas_nivel')
    nRowVol=robjects.r('nrow(matriz_pessoas_nivel)')
    print(int(nRowVol[0]))
    #print(tabelVolu[0][0])
    #convertido=datetime.date(int(tabelEvent[6][6]))
    #print(convertido)
    tabelaVoluntario={}
    for ev in range(int(nRowVol[0])):
        objVol={}
        
        objVol[0]=tabelVolu[0][ev]
        objVol[1]=tabelVolu[1][ev]
        objVol[2]=tabelVolu[2][ev]
        objVol[3]=tabelVolu[3][ev]
        objVol[4]=tabelVolu[4][ev]
        objVol[5]=tabelVolu[5][ev]
        objVol[6]=int(tabelVolu[6][ev])
        objVol[7]=int(tabelVolu[7][ev])
        objVol[8]=int(tabelVolu[8][ev])
        objVol[9]=int(tabelVolu[9][ev])
        objVol[10]=int(tabelVolu[10][ev])
        objVol[11]=int(tabelVolu[11][ev])
        objVol[12]=int(tabelVolu[12][ev])
        objVol[13]=int(tabelVolu[13][ev])
        objVol[14]=int(tabelVolu[14][ev])
        objVol[15]=int(tabelVolu[15][ev])
        objVol[16]=int(tabelVolu[16][ev])
        objVol[17]=tabelVolu[17][ev]
        objVol[18]=tabelVolu[18][ev]
      
        tabelaVoluntario[ev]=objVol
    return tabelaVoluntario