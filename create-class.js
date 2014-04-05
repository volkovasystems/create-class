try{ var base = window; }catch( error ){ var base = exports; }
( function module( base ){
	define( "createClass",
		[
			"argumentsToArray",
			"hardenProperty"
		],
		function construct( ){
			var createClass = function createClass( className, classConstructor ){
				if( typeof className != "string" || !className ){
					throw new Error( "invalid class name" );
				}

				if( typeof classConstructor != "function" 
					|| !classConstructor )
				{
					throw new Error( "invalid class constructor" );
				}

				var pseudoClass = function pseudoClass( ){
					var parameters = argumentsToArray( arguments );
					if( this instanceof pseudoClass ){
						if( "parent" in this ){
							this.parent.apply( this, parameters );
						}
						classConstructor.apply( this, parameters );
					}else{
						return new pseudoClass.apply( this, parameters );
					}
				};

				eval( "pseudoClass = " pseudoClass.toString( ).replace( "pseudoClass", className ) + ";" );

				

			};

			base.createClass = createClass;
		} );
} )( base );