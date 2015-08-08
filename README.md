Moment-Generating Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Triangular](https://en.wikipedia.org/wiki/triangular_distribution) distribution moment-generating function (MGF).

The [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) for a [triangular](https://en.wikipedia.org/wiki/triangular_distribution) random variable is

<div class="equation" align="center" data-raw-text="
    M_X(t) := \mathbb{E}\!\left[e^{tX}\right] =  	2\frac{(b\!-\!c)e^{at}\!-\!(b\!-\!a)e^{ct}\!+\!(c\!-\!a)e^{bt}} {(b-a)(c-a)(b-c)t^2}" data-equation="eq:mgf_function">
	<img src="https://cdn.rawgit.com/distributions-io/triangular-mgf/58d571b26689f09d4d02dba374f92d1b577b4b8d/docs/img/eqn.svg" alt="Moment-generating function (MGF) for a triangular distribution.">
	<br>
</div>

where `a` is the lower limit, `b` is the upper limit and `c` is the mode of the distribution. The parameters must satisfy `b > a ` and `a <= b <= c`.

## Installation

``` bash
$ npm install distributions-triangular-mgf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var mgf = require( 'distributions-triangular-mgf' );
```

#### mgf( t[, options] )

Evaluates the [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) (MGF) for the [triangular](https://en.wikipedia.org/wiki/triangular_distribution) distribution. `t` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	t,
	i;

out = mgf( 1 );
// returns ~1.683

out = mgf( -1 );
// returns ~0.619

t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];
out = mgf( t );
// returns [ 1, ~1.291, ~1.683, ~2.218, ~2.952, ~3.969 ]

t = new Int8Array( t );
out = mgf( t );
// returns Float64Array( [1,1,~1.683,~1.683,~2.952,~2.952] )

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.5;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = mgf( mat );
/*
	[  1     ~1.291
      ~1.683 ~2.218
      ~2.952 ~3.969 ]
*/
```

The function accepts the following `options`:

*	__a__: lower limit. Default: `0`.
*	__b__: upper limit. Default: `1`.
*	__c__: mode. Default: `( a + b ) / 2`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [triangular](https://en.wikipedia.org/wiki/triangular_distribution) distribution is a function of 3 parameter(s): `a`(lower limit) and `b`(upper limit) and `c`(mode). By default, `a` is equal to `0` and `b` is equal to `1` and `c` is equal to `0.5`. To adjust either parameter, set the corresponding option.

``` javascript
var t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

var out = mgf( t, {
	'a': 1,
	'b': 6,
	'c': 2
});
// returns [ 1, ~5.236, ~37.736, ~356.47, ~4062.784, ~52293.185 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.5],
	[2,1],
	[3,1.5],
	[4,2],
	[5,2.5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = mgf( data, {
	'accessor': getValue
});
// returns [ 1, ~1.291, ~1.683, ~2.218, ~2.952, ~3.969 ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.5]},
	{'x':[2,1]},
	{'x':[3,1.5]},
	{'x':[4,2]},
	{'x':[5,2.5]}
];

var out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,1]},
		{'x':[1,~1.291]},
		{'x':[2,~1.683]},
		{'x':[3,~2.218]},
		{'x':[4,~2.952]},
		{'x':[5,~3.969]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var t, out;

t = new Int8Array( [0,1,2,3,4] );

out = mgf( t, {
	'dtype': 'int32'
});
// returns Int32Array( [1,1,2,5,10] )

// Works for plain arrays, as well...
out = mgf( [0,1,2,3,4], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,1,2,5,10] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	t,
	i;

t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

out = mgf( t, {
	'copy': false
});
// returns [ 1, ~1.291, ~1.683, ~2.218, ~2.952, ~3.969 ]

bool = ( t === out );
// returns true

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.5;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = mgf( mat, {
	'copy': false
});
/*
	[  1     ~1.291
      ~1.683 ~2.218
      ~2.952 ~3.969 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [MGF](https://en.wikipedia.org/wiki/triangular_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = mgf( null );
	// returns NaN

	out = mgf( true );
	// returns NaN

	out = mgf( {'a':'b'} );
	// returns NaN

	out = mgf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = mgf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = mgf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = mgf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var mgf = require( 'distributions-triangular-mgf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = mgf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = mgf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = mgf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = mgf( mat );

// Matrices (custom output data type)...
out = mgf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-triangular-mgf.svg
[npm-url]: https://npmjs.org/package/distributions-triangular-mgf

[travis-image]: http://img.shields.io/travis/distributions-io/triangular-mgf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/triangular-mgf

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/triangular-mgf/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/triangular-mgf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/triangular-mgf.svg
[dependencies-url]: https://david-dm.org/distributions-io/triangular-mgf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/triangular-mgf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/triangular-mgf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/triangular-mgf.svg
[github-issues-url]: https://github.com/distributions-io/triangular-mgf/issues
