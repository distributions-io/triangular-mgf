'use strict';

// FUNCTIONS //

var exp = Math.exp,
	pow = Math.pow;


// PARTIAL //

/**
* FUNCTION: partial( a, b, c )
*	Partially applies lower limit `a` and upper limit `b` and mode `c` and returns a function for evaluating the moment-generating function (MGF) for a triangular distribution.
*
* @param {Number} a - lower limit
* @param {Number} b - upper limit
* @param {Number} c - mode
* @returns {Function} MGF
*/
function partial( a, b, c ) {
	var bmc, bma, cma;
	bmc = b - c;
	bma = b - a;
	cma = c - a;
	/**
	* FUNCTION: mgf( t )
	*	Evaluates the moment-generating function (MGF) for a triangular distribution.
	*
	* @private
	* @param {Number} t - input value
	* @returns {Number} evaluated MGF
	*/
	return function mgf( t ) {
		var ret;

		if ( t === 0 ) {
			return 1;
		}

		ret = 2 * ( bmc * exp( a * t) - bma * exp( c * t ) +
			cma * exp( b * t ) );

		ret /= bma * cma * bmc * pow( t, 2 );
		return ret;
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
