'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.a=0] - lower limit
* @param {Number} [options.b=1] - upper limit
* @param {Number} [options.c=0.5] - mode
* @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {String} [options.sep] - deep get/set key path separator
* @param {String} [options.path] - deep get/set key path
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'mgf()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'a' ) ) {
		opts.a = options.a;
		if ( !isNumber( opts.a ) ) {
			return new TypeError( 'mgf()::invalid option. `a` parameter must be a number primitive. Option: `' + opts.a + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'b' ) ) {
		opts.b = options.b;
		if ( !isNumber( opts.b ) ) {
			return new TypeError( 'mgf()::invalid option. `b` parameter must be a number primitive. Option: `' + opts.b + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'c' ) ) {
		opts.c = options.c;
		if ( !isNumber( opts.c ) ) {
			return new TypeError( 'mgf()::invalid option. `c` parameter must be a number primitive. Option: `' + opts.c + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'mgf()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'mgf()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'path' ) ) {
		opts.path = options.path;
		if ( !isString( opts.path ) ) {
			return new TypeError( 'mgf()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'mgf()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'mgf()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;