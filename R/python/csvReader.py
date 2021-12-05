import pandas as pandas

def csv_to_dataFrame(name):
    print(f"Importando arquivo {name}.csv . . .")
    data = pandas.read_csv(f'../CSV_Files/{name}.csv', encoding='latin-1', delimiter=";")
    print(f"Transformando em data frame")
    df = pandas.DataFrame(data)

    return df