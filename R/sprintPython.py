# coding: utf8
# -*- coding: utf-8 -*-
from rpy2.rinterface_lib.sexp import StrSexpVector
import rpy2.robjects as robjects
from rpy2.robjects.conversion import Converter
import rpy2.robjects.packages as rpackages
from rpy2.robjects.vectors import StrVector
import datetime


package_names = ('afex','emmeans')

if all(rpackages.isinstalled(x) for x in package_names):
    have_package=True
    
else:
    have_package=False

if not have_package:
    utils=rpackages.importr('utils')
    utils.chooseCRANmirror(ind=1)

    packnames_to_install=[x for x in package_names if not rpackages.isinstalled(x)]

    if len(packnames_to_install)>0:
        utils.install_packages(StrVector(packnames_to_install))
#-----------------------------------------------------------------------------------

robjects.r('source("C:/Users/Henrique/Desktop/ScriptR2.R")')



def function_evento():
    robjects.r('Eventos$dataEvento<-as.character(Eventos$dataEvento)')
    robjects.r('Eventos$dataFechamento<-as.character(Eventos$dataFechamento)')
    
    tabelEvent=robjects.r('Eventos')
    nRowEven=robjects.r('nrow(Eventos)')
    nColEven=robjects.r('length(Eventos)')

    print(tabelEvent)
    #convertido=datetime.date(int(tabelEvent[6][6]))
    #print(convertido)
    tabelaEvento={}
    for ev in range(int(nRowEven[0])):
        objEven={}
        objEven[0]=tabelEvent[0][ev]
        objEven[1]=tabelEvent[1][ev]
        objEven[2]=tabelEvent[2][ev]
        objEven[3]=tabelEvent[3][ev]
        objEven[4]=tabelEvent[4][ev]
        objEven[5]=tabelEvent[5][ev]
        objEven[6]=tabelEvent[6][ev]
        #objEven[6]=robjects.r('as.character(Eventos$dataEvento[{}])'.format(ev))
        #print(str(objEven[6]))
        objEven[7]=tabelEvent[7][ev]
        #objEven[7]=robjects.r('as.character(Eventos$dataFechamento[{}])'.format(ev))
        #print(str(objEven[7]))
        objEven[8]=tabelEvent[8][ev]
        tabelaEvento[ev]=objEven
    return tabelaEvento
