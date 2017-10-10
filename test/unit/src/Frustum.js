/**
 * @author bhouston / http://exocortex.com
 */

QUnit.module( "Frustum" );

var unit3 = new GLMath.Vector3( 1, 0, 0 );

var planeEquals = function ( a, b, tolerance ) {

	tolerance = tolerance || 0.0001;

	if ( a.normal.distanceTo( b.normal ) > tolerance ) return false;
	if ( Math.abs( a.constant - b.constant ) > tolerance ) return false;

	return true;

};

QUnit.test( "constructor" , function( assert ) {
	var a = new GLMath.Frustum();

	assert.ok( a.planes !== undefined, "Passed!" );
	assert.ok( a.planes.length === 6, "Passed!" );

	var pDefault = new GLMath.Plane();
	for( var i = 0; i < 6; i ++ ) {
		assert.ok( a.planes[i].equals( pDefault ), "Passed!" );
	}

	var p0 = new GLMath.Plane( unit3, -1 );
	var p1 = new GLMath.Plane( unit3, 1 );
	var p2 = new GLMath.Plane( unit3, 2 );
	var p3 = new GLMath.Plane( unit3, 3 );
	var p4 = new GLMath.Plane( unit3, 4 );
	var p5 = new GLMath.Plane( unit3, 5 );

	a = new GLMath.Frustum( p0, p1, p2, p3, p4, p5 );
	assert.ok( a.planes[0].equals( p0 ), "Passed!" );
	assert.ok( a.planes[1].equals( p1 ), "Passed!" );
	assert.ok( a.planes[2].equals( p2 ), "Passed!" );
	assert.ok( a.planes[3].equals( p3 ), "Passed!" );
	assert.ok( a.planes[4].equals( p4 ), "Passed!" );
	assert.ok( a.planes[5].equals( p5 ), "Passed!" );
});

QUnit.test( "copy" , function( assert ) {

	var p0 = new GLMath.Plane( unit3, -1 );
	var p1 = new GLMath.Plane( unit3, 1 );
	var p2 = new GLMath.Plane( unit3, 2 );
	var p3 = new GLMath.Plane( unit3, 3 );
	var p4 = new GLMath.Plane( unit3, 4 );
	var p5 = new GLMath.Plane( unit3, 5 );

	var b = new GLMath.Frustum( p0, p1, p2, p3, p4, p5 );
	var a = new GLMath.Frustum().copy( b );
	assert.ok( a.planes[0].equals( p0 ), "Passed!" );
	assert.ok( a.planes[1].equals( p1 ), "Passed!" );
	assert.ok( a.planes[2].equals( p2 ), "Passed!" );
	assert.ok( a.planes[3].equals( p3 ), "Passed!" );
	assert.ok( a.planes[4].equals( p4 ), "Passed!" );
	assert.ok( a.planes[5].equals( p5 ), "Passed!" );

	// ensure it is a true copy by modifying source
	b.planes[0] = p1;
	assert.ok( a.planes[0].equals( p0 ), "Passed!" );
});

QUnit.test( "setFromMatrix/makeOrthographic/containsPoint", function( assert ) {
	var m = new GLMath.Matrix4().makeOrthographic( -1, 1, -1, 1, 1, 100 );
	var a = new GLMath.Frustum().setFromMatrix( m );

	assert.ok( ! a.containsPoint( new GLMath.Vector3( 0, 0, 0 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 0, 0, -50 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 0, 0, -1.001 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( -1, -1, -1.001 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( -1.1, -1.1, -1.001 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 1, 1, -1.001 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( 1.1, 1.1, -1.001 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 0, 0, -100 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( -1, -1, -100 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( -1.1, -1.1, -100.1 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 1, 1, -100 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( 1.1, 1.1, -100.1 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( 0, 0, -101 ) ), "Passed!" );

});

QUnit.test( "setFromMatrix/makePerspective/containsPoint", function( assert ) {
	var m = new GLMath.Matrix4().makePerspective( -1, 1, 1, -1, 1, 100 );
	var a = new GLMath.Frustum().setFromMatrix( m );

	assert.ok( ! a.containsPoint( new GLMath.Vector3( 0, 0, 0 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 0, 0, -50 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 0, 0, -1.001 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( -1, -1, -1.001 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( -1.1, -1.1, -1.001 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 1, 1, -1.001 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( 1.1, 1.1, -1.001 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 0, 0, -99.999 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( -99.999, -99.999, -99.999 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( -100.1, -100.1, -100.1 ) ), "Passed!" );
	assert.ok( a.containsPoint( new GLMath.Vector3( 99.999, 99.999, -99.999 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( 100.1, 100.1, -100.1 ) ), "Passed!" );
	assert.ok( ! a.containsPoint( new GLMath.Vector3( 0, 0, -101 ) ), "Passed!" );
});

QUnit.test( "setFromMatrix/makePerspective/intersectsSphere", function( assert ) {
	var m = new GLMath.Matrix4().makePerspective( -1, 1, 1, -1, 1, 100 );
	var a = new GLMath.Frustum().setFromMatrix( m );

	assert.ok( ! a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, 0 ), 0 ) ), "Passed!" );
	assert.ok( ! a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, 0 ), 0.9 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, 0 ), 1.1 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, -50 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, -1.001 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( -1, -1, -1.001 ), 0 ) ), "Passed!" );
	assert.ok( ! a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( -1.1, -1.1, -1.001 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( -1.1, -1.1, -1.001 ), 0.5 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 1, 1, -1.001 ), 0 ) ), "Passed!" );
	assert.ok( ! a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 1.1, 1.1, -1.001 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 1.1, 1.1, -1.001 ), 0.5 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, -99.999 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( -99.999, -99.999, -99.999 ), 0 ) ), "Passed!" );
	assert.ok( ! a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( -100.1, -100.1, -100.1 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( -100.1, -100.1, -100.1 ), 0.5 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 99.999, 99.999, -99.999 ), 0 ) ), "Passed!" );
	assert.ok( ! a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 100.1, 100.1, -100.1 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 100.1, 100.1, -100.1 ), 0.2 ) ), "Passed!" );
	assert.ok( ! a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, -101 ), 0 ) ), "Passed!" );
	assert.ok( a.intersectsSphere( new GLMath.Sphere( new GLMath.Vector3( 0, 0, -101 ), 1.1 ) ), "Passed!" );
});

QUnit.test( "clone" , function( assert ) {

	var p0 = new GLMath.Plane( unit3, -1 );
	var p1 = new GLMath.Plane( unit3, 1 );
	var p2 = new GLMath.Plane( unit3, 2 );
	var p3 = new GLMath.Plane( unit3, 3 );
	var p4 = new GLMath.Plane( unit3, 4 );
	var p5 = new GLMath.Plane( unit3, 5 );

	var b = new GLMath.Frustum( p0, p1, p2, p3, p4, p5 );
	var a = b.clone();
	assert.ok( a.planes[0].equals( p0 ), "Passed!" );
	assert.ok( a.planes[1].equals( p1 ), "Passed!" );
	assert.ok( a.planes[2].equals( p2 ), "Passed!" );
	assert.ok( a.planes[3].equals( p3 ), "Passed!" );
	assert.ok( a.planes[4].equals( p4 ), "Passed!" );
	assert.ok( a.planes[5].equals( p5 ), "Passed!" );

	// ensure it is a true copy by modifying source
	a.planes[0].copy( p1 );
	assert.ok( b.planes[0].equals( p0 ), "Passed!" );
});

QUnit.test( "set", function ( assert ) {

	var a = new GLMath.Frustum();
	var p0 = new GLMath.Plane( unit3, - 1 );
	var p1 = new GLMath.Plane( unit3, 1 );
	var p2 = new GLMath.Plane( unit3, 2 );
	var p3 = new GLMath.Plane( unit3, 3 );
	var p4 = new GLMath.Plane( unit3, 4 );
	var p5 = new GLMath.Plane( unit3, 5 );

	a.set( p0, p1, p2, p3, p4, p5 );

	assert.ok( a.planes[ 0 ].equals( p0 ), "Check plane #0" );
	assert.ok( a.planes[ 1 ].equals( p1 ), "Check plane #1" );
	assert.ok( a.planes[ 2 ].equals( p2 ), "Check plane #2" );
	assert.ok( a.planes[ 3 ].equals( p3 ), "Check plane #3" );
	assert.ok( a.planes[ 4 ].equals( p4 ), "Check plane #4" );
	assert.ok( a.planes[ 5 ].equals( p5 ), "Check plane #5" );

} );

QUnit.test( "intersectsBox", function ( assert ) {

	var m = new GLMath.Matrix4().makePerspective( - 1, 1, 1, - 1, 1, 100 );
	var a = new GLMath.Frustum().setFromMatrix( m );
	var box = new GLMath.Box3( zero3.clone(), one3.clone() );
	var intersects;

	intersects = a.intersectsBox( box );
	assert.notOk( intersects, "No intersection" );

	box.translate( - 1, - 1, - 1 );

	intersects = a.intersectsBox( box );
	assert.ok( intersects, "Successful intersection" );

} );
