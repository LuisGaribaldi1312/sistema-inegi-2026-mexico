# -*- coding: utf-8 -*-
with open('data/mexico_data.js', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('"parent_name":"México"', '"parent_name":"Estado de México"')
c = c.replace('"parent_name": "México"', '"parent_name": "Estado de México"')

with open('data/mexico_data.js', 'w', encoding='utf-8') as f:
    f.write(c)

with open('data/mexico_geo.js', 'r', encoding='utf-8') as f:
    g = f.read()

g = g.replace('"parent_name":"México"', '"parent_name":"Estado de México"')
g = g.replace('"parent_name": "México"', '"parent_name": "Estado de México"')

with open('data/mexico_geo.js', 'w', encoding='utf-8') as f:
    f.write(g)

print("Estado de México unified to 125 munis!")
