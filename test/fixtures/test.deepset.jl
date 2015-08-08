using Distributions
using JSON

a = -3
b = 3
c = 2
d = TriangularDist( a,b,c )

x = linspace( -5, 5, 100 )

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	("a", a),
	("b", b),
	("c", c),
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/deepset.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
