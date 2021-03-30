import json
from os import path

# open json file
basepath = path.dirname(__file__)
filepath = path.abspath(path.join(basepath,"data","staghunt_formatted.json"))
with open(filepath) as f:
  data = json.load(f)

def check_equal(A,B):
    n = len(A)
    if(len(B) != n or len(A[0]) != len(B[0])):
        return 0
    for i in range(n):
        for j in range(n):
            if (A[i][j] != B[i][j]):
                return 0
    return 1

maps = []
for each in data:
    map = each['map']
    if(map not in maps):
        maps.append(map)

formatted = "[\n"
for matrix in maps:
    formatted += "\t[\n"
    for row in matrix:
        formatted += "\t\t" + str(row) + ",\n"
    formatted += "\t],\n"
formatted += "]"
# with open('maps.json', 'w') as outfile:
#     json.dump(maps, outfile, indent=2)
basepath = path.dirname(__file__)
filepath = path.abspath(path.join(basepath,"data","maps.json"))
f = open(filepath, "w")
f.write(formatted)
f.close()
