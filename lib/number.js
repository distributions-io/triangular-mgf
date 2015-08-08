'use strict';

// FUNCTIONS //

var exp = Math.exp,
	pow = Math.pow;


// MGF //

/**
* FUNCTION: mgf( x, a, b, c )
*	Evaluates the moment-generating function (MGF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c` at a value `t`.
*
* @param {Number} t - input value
* @param {Number} a - lower limit
* @param {Number} b - upper limit
* @param {Number} c - mode
* @returns {Number} evaluated MGF
*/
function mgf( t, a, b, c ) {
	var bmc, bma, cma, ret;
	bmc = b - c;
	bma = b - a;
	cma = c - a;

	if ( t === 0 ) {
		return 1;
	}

	ret = 2 * ( bmc * exp( a * t) - bma * exp( c * t ) +
		cma * exp( b * t ) );
	ret /= bma * cma * bmc * pow( t, 2 );
	return ret;
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
