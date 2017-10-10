/**
 * @author bhouston / http://exocortex.com
 */

QUnit.module( "Sphere" );

QUnit.test( "constructor" , function( assert ) {
	var a = new GLMath.Sphere();
	assert.ok( a.center.equals( zero3 ), "Passed!" );
	assert.ok( a.radius == 0, "Passed!" );

	a = new GLMath.Sphere( one3.clone(), 1 );
	assert.ok( a.center.equals( one3 ), "Passed!" );
	assert.ok( a.radius == 1, "Passed!" );
});

QUnit.test( "copy" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );
	var b = new GLMath.Sphere().copy( a );

	assert.ok( b.center.equals( one3 ), "Passed!" );
	assert.ok( b.radius == 1, "Passed!" );

	// ensure that it is a true copy
	a.center = zero3;
	a.radius = 0;
	assert.ok( b.center.equals( one3 ), "Passed!" );
	assert.ok( b.radius == 1, "Passed!" );
});

QUnit.test( "set" , function( assert ) {
	var a = new GLMath.Sphere();
	assert.ok( a.center.equals( zero3 ), "Passed!" );
	assert.ok( a.radius == 0, "Passed!" );

	a.set( one3, 1 );
	assert.ok( a.center.equals( one3 ), "Passed!" );
	assert.ok( a.radius == 1, "Passed!" );
});

QUnit.test( "empty" , function( assert ) {
	var a = new GLMath.Sphere();
	assert.ok( a.empty(), "Passed!" );

	a.set( one3, 1 );
	assert.ok( ! a.empty(), "Passed!" );
});

QUnit.test( "containsPoint" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );

	assert.ok( ! a.containsPoint( zero3 ), "Passed!" );
	assert.ok( a.containsPoint( one3 ), "Passed!" );
});

QUnit.test( "distanceToPoint" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );

	assert.ok( ( a.distanceToPoint( zero3 ) - 0.7320 ) < 0.001, "Passed!" );
	assert.ok( a.distanceToPoint( one3 ) === -1, "Passed!" );
});

QUnit.test( "intersectsSphere" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );
	var b = new GLMath.Sphere( zero3.clone(), 1 );
	var c = new GLMath.Sphere( zero3.clone(), 0.25 );

	assert.ok( a.intersectsSphere( b ) , "Passed!" );
	assert.ok( ! a.intersectsSphere( c ) , "Passed!" );
});

QUnit.test( "intersectsPlane" , function( assert ) {
	var a = new GLMath.Sphere( zero3.clone(), 1 );
	var b = new GLMath.Plane( new GLMath.Vector3( 0, 1, 0 ), 1 );
	var c = new GLMath.Plane( new GLMath.Vector3( 0, 1, 0 ), 1.25 );
	var d = new GLMath.Plane( new GLMath.Vector3( 0, -1, 0 ), 1.25 );

	assert.ok( a.intersectsPlane( b ) , "Passed!" );
	assert.ok( ! a.intersectsPlane( c ) , "Passed!" );
	assert.ok( ! a.intersectsPlane( d ) , "Passed!" );
});

QUnit.test( "clampPoint" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );

	assert.ok( a.clampPoint( new GLMath.Vector3( 1, 1, 3 ) ).equals( new GLMath.Vector3( 1, 1, 2 ) ), "Passed!" );
	assert.ok( a.clampPoint( new GLMath.Vector3( 1, 1, -3 ) ).equals( new GLMath.Vector3( 1, 1, 0 ) ), "Passed!" );
});

QUnit.test( "getBoundingBox" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );

	assert.ok( a.getBoundingBox().equals( new GLMath.Box3( zero3, two3 ) ), "Passed!" );

	a.set( zero3, 0 );
	assert.ok( a.getBoundingBox().equals( new GLMath.Box3( zero3, zero3 ) ), "Passed!" );
});

QUnit.test( "applyMatrix4" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );

	var m = new GLMath.Matrix4().makeTranslation( 1, -2, 1 );

	assert.ok( a.clone().applyMatrix4( m ).getBoundingBox().equals( a.getBoundingBox().applyMatrix4( m ) ), "Passed!" );
});

QUnit.test( "translate" , function( assert ) {
	var a = new GLMath.Sphere( one3.clone(), 1 );

	a.translate( one3.clone().negate() );
	assert.ok( a.center.equals( zero3 ), "Passed!" );
});

QUnit.test( "setFromPoints", function ( assert ) {

	var a = new GLMath.Sphere();
	var expectedCenter = new GLMath.Vector3( 0.9330126941204071, 0, 0 );
	var expectedRadius = 1.3676668773461689;
	var optionalCenter = new GLMath.Vector3( 1, 1, 1 );
	var points = [
		new GLMath.Vector3( 1, 1, 0 ), new GLMath.Vector3( 1, 1, 0 ),
		new GLMath.Vector3( 1, 1, 0 ), new GLMath.Vector3( 1, 1, 0 ),
		new GLMath.Vector3( 1, 1, 0 ), new GLMath.Vector3( 0.8660253882408142, 0.5, 0 ),
		new GLMath.Vector3( - 0, 0.5, 0.8660253882408142 ), new GLMath.Vector3( 1.8660253882408142, 0.5, 0 ),
		new GLMath.Vector3( 0, 0.5, - 0.8660253882408142 ), new GLMath.Vector3( 0.8660253882408142, 0.5, - 0 ),
		new GLMath.Vector3( 0.8660253882408142, - 0.5, 0 ), new GLMath.Vector3( - 0, - 0.5, 0.8660253882408142 ),
		new GLMath.Vector3( 1.8660253882408142, - 0.5, 0 ), new GLMath.Vector3( 0, - 0.5, - 0.8660253882408142 ),
		new GLMath.Vector3( 0.8660253882408142, - 0.5, - 0 ), new GLMath.Vector3( - 0, - 1, 0 ),
		new GLMath.Vector3( - 0, - 1, 0 ), new GLMath.Vector3( 0, - 1, 0 ),
		new GLMath.Vector3( 0, - 1, - 0 ), new GLMath.Vector3( - 0, - 1, - 0 ),
	];

	a.setFromPoints( points );
	assert.ok( Math.abs( a.center.x - expectedCenter.x ) <= eps, "Default center: check center.x" );
	assert.ok( Math.abs( a.center.y - expectedCenter.y ) <= eps, "Default center: check center.y" );
	assert.ok( Math.abs( a.center.z - expectedCenter.z ) <= eps, "Default center: check center.z" );
	assert.ok( Math.abs( a.radius - expectedRadius ) <= eps, "Default center: check radius" );

	expectedRadius = 2.5946195770400102;
	a.setFromPoints( points, optionalCenter );
	assert.ok( Math.abs( a.center.x - optionalCenter.x ) <= eps, "Optional center: check center.x" );
	assert.ok( Math.abs( a.center.y - optionalCenter.y ) <= eps, "Optional center: check center.y" );
	assert.ok( Math.abs( a.center.z - optionalCenter.z ) <= eps, "Optional center: check center.z" );
	assert.ok( Math.abs( a.radius - expectedRadius ) <= eps, "Optional center: check radius" );

} );

QUnit.test( "intersectsBox", function ( assert ) {

	var a = new GLMath.Sphere();
	var b = new GLMath.Sphere( new GLMath.Vector3( - 5, - 5, - 5 ) );
	var box = new GLMath.Box3( zero3, one3 );

	assert.strictEqual( a.intersectsBox( box ), true, "Check default sphere" );
	assert.strictEqual( b.intersectsBox( box ), false, "Check shifted sphere" );

} );

QUnit.test( "equals", function ( assert ) {

	var a = new GLMath.Sphere();
	var b = new GLMath.Sphere( new GLMath.Vector3( 1, 0, 0 ) );
	var c = new GLMath.Sphere( new GLMath.Vector3( 1, 0, 0 ), 1.0 );

	assert.strictEqual( a.equals( b ), false, "a does not equal b" );
	assert.strictEqual( a.equals( c ), false, "a does not equal c" );
	assert.strictEqual( b.equals( c ), false, "b does not equal c" );

	a.copy( b );
	assert.strictEqual( a.equals( b ), true, "a equals b after copy()" );

} );
