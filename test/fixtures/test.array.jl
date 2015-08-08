using Distributions
using JSON

a = 0
b = 1
c = 0.8
d = TriangularDist( a,b,c )

x = linspace( -5,5, 100 )

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

outfile = open("./test/fixtures/array.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
