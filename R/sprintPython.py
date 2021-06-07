import rpy2.robjects as robjects
import rpy2.robjects.packages as rpackages
from rpy2.robjects.vectors import StrVector



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

#-----------------------------------------------------------------------------------

data = robjects.r('View(Eventos)')

#-----------------------------------------------------------------------------------

varTeste=robjects.r('Eventos')
print(varTeste)