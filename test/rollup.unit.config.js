export default {
	entry: 'test/unit.js',
	indent: '\t',
	// sourceMap: true,
	targets: [
		{
			format: 'umd',
			moduleName: 'GLMath',
			dest: 'test/unit/gl-math.unit.js'
		}
	]
};
